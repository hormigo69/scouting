// Paso D: Entrevista con Unidad de Negocio
// Este archivo maneja la funcionalidad del Paso D donde el investigador completa
// el Challenge Request con la información faltante identificada por la IA
(function() {
let challengeResponses = null;
let aiReviewData = null;
let fieldsToComplete = [];
let currentField = null;
let interviewProgress = {};

// Formatear análisis de IA en una cadena legible
function formatAIAnalysis(analysis) {
    try {
        if (!analysis || typeof analysis !== 'object') return '';
        const summaryParts = [];
        if (analysis.completeness) summaryParts.push(`Completitud: ${analysis.completeness}`);
        if (analysis.clarity) summaryParts.push(`Claridad: ${analysis.clarity}`);
        if (analysis.specificity) summaryParts.push(`Especificidad: ${analysis.specificity}`);

        const summary = summaryParts.length > 0 ? summaryParts.join(' · ') : '';

        const detailsParts = [];
        if (Array.isArray(analysis.strengths) && analysis.strengths.length > 0) {
            detailsParts.push(`Fortalezas: ${analysis.strengths.join('; ')}`);
        }
        if (Array.isArray(analysis.improvements) && analysis.improvements.length > 0) {
            detailsParts.push(`Mejoras: ${analysis.improvements.join('; ')}`);
        }
        const details = detailsParts.join(' | ');

        return [summary, details].filter(Boolean).join('. ');
    } catch (e) {
        console.warn('Error formatting AI analysis:', e);
        return '';
    }
}

// Obtener análisis formateado a partir de aiReviewData si el campo no lo tiene
function getFormattedAIAnalysisForField(field) {
    if (!aiReviewData || !aiReviewData.field_reviews) return '';
    const review = aiReviewData.field_reviews.find(r => r.field_id === field.id || r.field_name === field.name);
    if (!review || !review.ai_analysis) return '';
    return formatAIAnalysis(review.ai_analysis);
}

// Cargar progreso persistido desde localStorage (si existe)
function loadPersistedInterviewProgress() {
    try {
        const raw = localStorage.getItem('interviewProgress');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && parsed.progress && typeof parsed.progress === 'object') {
            interviewProgress = parsed.progress;
        }
    } catch (e) {
        console.warn('No se pudo cargar progreso de entrevista persistido:', e);
    }
}

// Obtener respuestas guardadas por pregunta para un campo
function getFieldQuestionAnswers(field) {
    const progress = interviewProgress[field.id];
    if (progress && Array.isArray(progress.answers)) {
        return progress.answers;
    }
    return [];
}

// Calcular si un campo está completo en base a respuestas de entrevista
function isFieldCompletedByAnswers(field) {
    const totalQuestions = Array.isArray(field.suggestedQuestions) ? field.suggestedQuestions.length : 0;
    if (totalQuestions === 0) return false;
    const answers = getFieldQuestionAnswers(field);
    const answeredCount = answers.filter(a => a && a.trim() !== '').length;
    return answeredCount >= totalQuestions;
}

// Guardar respuesta para una pregunta específica
function saveQuestionAnswer(field, questionIndex) {
    const textarea = document.getElementById(`question-answer-${field.id}-${questionIndex}`);
    if (!textarea) return;
    const answerText = textarea.value;
    const existing = interviewProgress[field.id] || {};
    const answers = Array.isArray(existing.answers) ? existing.answers : [];
    answers[questionIndex] = answerText;
    interviewProgress[field.id] = {
        ...existing,
        answers: answers,
        lastUpdated: new Date().toISOString()
    };
    // Feedback visual simple
    const btn = document.querySelector(`[data-save-answer="true"][data-field-id="${field.id}"][data-index="${questionIndex}"]`);
    if (btn) {
        btn.classList.add('saved');
        setTimeout(() => btn.classList.remove('saved'), 800);
    }

    // Actualizar estado de completitud del campo en función de respuestas
    const totalQuestions = Array.isArray(field.suggestedQuestions) ? field.suggestedQuestions.length : 0;
    const answeredCount = answers.filter(a => a && a.trim() !== '').length;
    if (totalQuestions > 0 && answeredCount >= totalQuestions) {
        field.isComplete = true;
        field.status = 'complete';
    } else {
        field.isComplete = false;
        // mantener estado según respuesta original y score
        field.status = determineFieldStatus(field.currentResponse, field.score);
    }

    // Refrescar UI de lista y progreso
    loadFieldsList();
    updateProgressDisplay();
    // Actualizar el panel derecho para reflejar el nuevo estado
    showFieldEditor(field);
}

// Inicialización del Paso D
function initializeStepD() {
    console.log('Initializing Step D: Interview with Business Unit');
    
    // Cargar datos necesarios
    loadChallengeResponses().then(() => {
        loadAIReview().then(() => {
            loadPersistedInterviewProgress();
            processFieldsForCompletion();
            setupEventListeners();
            updateProgressDisplay();
            console.log('Step D initialized successfully');
        }).catch(error => {
            console.error('Error loading AI review:', error);
            showNotification('Error al cargar la revisión de IA', 'error');
        });
    }).catch(error => {
        console.error('Error loading challenge responses:', error);
        showNotification('Error al cargar las respuestas del Challenge Request', 'error');
    });
}

// Cargar respuestas del Challenge Request
async function loadChallengeResponses() {
    try {
        console.log('Loading challenge responses for Step D...');
        const response = await fetch('Challenge%20request%20economia%20circular.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        challengeResponses = await response.json();
        console.log('Challenge responses loaded:', challengeResponses);
    } catch (error) {
        console.error('Error loading challenge responses:', error);
        showNotification('Error al cargar las respuestas del Challenge Request', 'error');
    }
}

// Cargar datos de revisión de IA
async function loadAIReview() {
    try {
        console.log('Loading AI review data for Step D...');
        const response = await fetch('ai-review-economia-circular.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        aiReviewData = await response.json();
        console.log('AI review data loaded:', aiReviewData);
    } catch (error) {
        console.error('Error loading AI review:', error);
        showNotification('Error al cargar la revisión de IA', 'error');
    }
}

// Procesar campos que necesitan completarse
function processFieldsForCompletion() {
    if (!challengeResponses || !aiReviewData) {
        console.error('Missing data for processing fields');
        return;
    }

    fieldsToComplete = [];
    
    // Combinar datos del Challenge Request con el análisis de IA
    challengeResponses.fields.forEach(field => {
        const aiReview = aiReviewData.field_reviews.find(review => 
            review.field_id === field.id || review.field_name === field.name
        );
        
        if (aiReview) {
            const aiAnalysisObj = aiReview.ai_analysis || null;
            const fieldData = {
                id: field.id,
                name: field.name,
                description: field.description,
                currentResponse: field.response || '',
                aiAnalysis: aiAnalysisObj ? formatAIAnalysis(aiAnalysisObj) : '',
                suggestedQuestions: aiReview.interview_questions || [],
                score: (aiReview.ai_analysis && aiReview.ai_analysis.score) || 0,
                feedback: (aiReview.ai_analysis && aiReview.ai_analysis.feedback) || '',
                status: determineFieldStatus(field.response, (aiReview.ai_analysis && aiReview.ai_analysis.score) || 0),
                priority: determineFieldPriority((aiReview.ai_analysis && aiReview.ai_analysis.score) || 0, (aiReview.ai_analysis && aiReview.ai_analysis.feedback) || ''),
                isComplete: false
            };
            // Estado inicial: si ya es 'complete' por respuesta/score, contar como completo
            fieldData.isComplete = (fieldData.status === 'complete');

            // Si hay progreso persistido marcando como completo, respetarlo
            if (interviewProgress[fieldData.id] && interviewProgress[fieldData.id].isComplete === true) {
                fieldData.isComplete = true;
                fieldData.status = 'complete';
            } else {
                // Ajustar estado inicial según respuestas guardadas
                if (isFieldCompletedByAnswers(fieldData)) {
                    fieldData.isComplete = true;
                    fieldData.status = 'complete';
                } else {
                    const answers = getFieldQuestionAnswers(fieldData);
                    const hasAnyAnswer = answers.some(a => a && a.trim() !== '');
                    if (hasAnyAnswer && fieldData.status !== 'complete') {
                        fieldData.status = 'incomplete';
                        fieldData.isComplete = false;
                    }
                }
            }
            
            fieldsToComplete.push(fieldData);
        }
    });
    
    // Ordenar por prioridad (alta -> media -> baja)
    fieldsToComplete.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    console.log('Fields to complete processed:', fieldsToComplete);
    loadFieldsList();
}

// Determinar el estado del campo
function determineFieldStatus(response, score) {
    if (!response || response.trim() === '') {
        return 'pending';
    } else if (score < 6) {
        return 'incomplete';
    } else {
        return 'complete';
    }
}

// Determinar la prioridad del campo
function determineFieldPriority(score, feedback) {
    // Verificar que feedback sea una cadena válida
    const feedbackStr = typeof feedback === 'string' ? feedback.toLowerCase() : '';

    if (score < 4 || feedbackStr.includes('crítico') || feedbackStr.includes('faltante')) {
        return 'high';
    } else if (score < 7 || feedbackStr.includes('mejorar') || feedbackStr.includes('ampliar')) {
        return 'medium';
    } else {
        return 'low';
    }
}

// Cargar lista de campos a completar
function loadFieldsList() {
    const fieldsList = document.getElementById('fields-to-complete-list');
    if (!fieldsList) return;
    
    fieldsList.innerHTML = '';
    
    fieldsToComplete.forEach(field => {
        const fieldItem = document.createElement('div');
        fieldItem.className = 'list-item mb-3 cursor-pointer';
        fieldItem.dataset.fieldId = field.id;
        
        const statusClass = `field-status-${field.status}`;
        const priorityClass = `field-priority-${field.priority}`;

        fieldItem.innerHTML = `
            <div class="p-3 border border-applus-gray-200 rounded-lg hover:border-applus-orange transition-colors">
                <div class="flex items-start justify-between mb-2">
                    <h4 class="font-semibold text-applus-gray-700 text-sm">${field.name}</h4>
                    <div class="flex gap-1">
                        <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${getStatusText(field.status)}</span>
                        <span class="px-2 py-1 rounded-full text-xs ${priorityClass}">${getPriorityText(field.priority)}</span>
                    </div>
                </div>
                <p class="text-xs text-applus-gray-500 mb-2">${field.description.substring(0, 80)}${field.description.length > 80 ? '...' : ''}</p>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-applus-gray-400">Puntuación: ${field.score}/10</span>
                    ${field.isComplete ? '<i class="fas fa-check-circle text-green-500"></i>' : '<i class="fas fa-clock text-yellow-500"></i>'}
                </div>
            </div>
        `;
        
        fieldItem.addEventListener('click', () => selectField(field));
        fieldsList.appendChild(fieldItem);
    });
}

// Obtener texto del estado
function getStatusText(status) {
    const statusTexts = {
        'pending': 'Pendiente',
        'incomplete': 'Incompleto',
        'complete': 'Completo'
    };
    return statusTexts[status] || status;
}

// Obtener texto de la prioridad
function getPriorityText(priority) {
    const priorityTexts = {
        'high': 'Alta',
        'medium': 'Media',
        'low': 'Baja'
    };
    return priorityTexts[priority] || priority;
}

// Seleccionar campo para editar
function selectField(field) {
    currentField = field;
    
    // Actualizar selección visual
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-field-id="${field.id}"]`).classList.add('active');
    
    // Mostrar editor
    showFieldEditor(field);
}

// Mostrar editor de campo
function showFieldEditor(field) {
    const noFieldSelected = document.getElementById('no-field-selected');
    const fieldEditor = document.getElementById('field-editor');
    
    if (noFieldSelected) noFieldSelected.classList.add('hidden');
    if (fieldEditor) fieldEditor.classList.remove('hidden');
    
    // Llenar información del campo
    document.getElementById('field-name').textContent = field.name;
    document.getElementById('field-description').textContent = field.description;
    
    // Estado y prioridad
    const statusElement = document.getElementById('field-status');
    const priorityElement = document.getElementById('field-priority');
    
    statusElement.className = `px-2 py-1 rounded-full text-xs field-status-${field.status}`;
    statusElement.textContent = getStatusText(field.status);
    
    priorityElement.className = `px-2 py-1 rounded-full text-xs field-priority-${field.priority}`;
    priorityElement.textContent = getPriorityText(field.priority);
    
    // Respuesta actual
    const currentResponse = document.getElementById('current-response');
    if (field.currentResponse) {
        currentResponse.innerHTML = `<p class="mb-2">${field.currentResponse}</p>`;
    } else {
        currentResponse.innerHTML = '<p class="text-applus-gray-400 italic">No hay respuesta actual</p>';
    }
    
    // Análisis de IA
    const aiAnalysis = document.getElementById('ai-analysis');
    const reviewForField = aiReviewData && aiReviewData.field_reviews 
        ? aiReviewData.field_reviews.find(r => r.field_id === field.id || r.field_name === field.name) 
        : null;
    const analysisObj = reviewForField && reviewForField.ai_analysis ? reviewForField.ai_analysis : null;
    const analysisSummary = field.aiAnalysis && field.aiAnalysis.trim() !== ''
        ? field.aiAnalysis
        : (analysisObj ? formatAIAnalysis(analysisObj) : '');
    // debug removed
    const htmlWhenObj = analysisObj ? `
        <div class="mb-2">
            <strong>Puntuación:</strong> ${field.score}/10
        </div>
        <div class="mb-2">
            <strong>Feedback:</strong> ${field.feedback}
        </div>
        <div class="mb-2">
            <strong>Análisis:</strong>
            <div class="mt-2 text-sm text-applus-gray-600">
                ${analysisObj.completeness || analysisObj.clarity || analysisObj.specificity ? `
                <div class="mb-2 p-2 bg-applus-gray-50 rounded">
                    ${analysisObj.completeness ? `<div>Completitud: ${analysisObj.completeness}</div>` : ''}
                    ${analysisObj.clarity ? `<div>Claridad: ${analysisObj.clarity}</div>` : ''}
                    ${analysisObj.specificity ? `<div>Especificidad: ${analysisObj.specificity}</div>` : ''}
                </div>` : ''}
                ${Array.isArray(analysisObj.strengths) && analysisObj.strengths.length ? `
                <div class="mb-2">
                    <div class="font-medium text-green-700 mb-1">Fortalezas</div>
                    <ul class="list-disc list-inside space-y-1">
                        ${analysisObj.strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>` : ''}
                ${Array.isArray(analysisObj.improvements) && analysisObj.improvements.length ? `
                <div>
                    <div class="font-medium text-orange-700 mb-1">Mejoras sugeridas</div>
                    <ul class="list-disc list-inside space-y-1">
                        ${analysisObj.improvements.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>` : ''}
            </div>
        </div>
    ` : '';
    const htmlFallback = `
        <div class="mb-2">
            <strong>Puntuación:</strong> ${field.score}/10
        </div>
        <div class="mb-2">
            <strong>Feedback:</strong> ${field.feedback}
        </div>
        <div>
            <strong>Análisis:</strong> ${analysisSummary || '<span class="text-applus-gray-400 italic">No hay análisis disponible</span>'}
        </div>`;
    const finalHTML = htmlWhenObj || htmlFallback || `<pre class="whitespace-pre-wrap text-xs">${analysisObj ? JSON.stringify(analysisObj, null, 2) : ''}</pre>`;
    aiAnalysis.innerHTML = finalHTML;
    // debug removed
    
    // Preguntas sugeridas
    const suggestedQuestions = document.getElementById('suggested-questions');
    if (field.suggestedQuestions && field.suggestedQuestions.length > 0) {
        const storedAnswers = getFieldQuestionAnswers(field);
        const questionsList = field.suggestedQuestions.map((q, index) => `
            <div class="mb-4 p-3 bg-applus-gray-50 rounded-lg border border-applus-gray-200">
                <div class="text-sm font-medium text-applus-gray-700 mb-2">${index + 1}. ${q}</div>
                <textarea 
                    id="question-answer-${field.id}-${index}"
                    class="w-full p-3 border border-applus-gray-300 rounded-md font-inherit text-sm leading-relaxed resize-y min-h-[80px] focus:outline-none focus:border-applus-orange focus:ring-2 focus:ring-applus-orange focus:ring-opacity-20"
                    placeholder="Anota aquí la respuesta del entrevistado..."
                >${storedAnswers[index] ? storedAnswers[index] : ''}</textarea>
                <div class="flex gap-2 mt-2">
                    <button class="btn-applus-secondary text-xs" data-save-answer="true" data-field-id="${field.id}" data-index="${index}">
                        <i class="fas fa-save"></i> Guardar
                    </button>
                </div>
            </div>
        `).join('');
        suggestedQuestions.innerHTML = `
            <div>
                ${questionsList}
            </div>
        `;
        // Asignar listeners de guardado por pregunta
        suggestedQuestions.querySelectorAll('[data-save-answer="true"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.dataset.index, 10);
                saveQuestionAnswer(field, idx);
            });
        });
    } else {
        suggestedQuestions.innerHTML = '<p class="text-applus-gray-400 italic">No hay preguntas sugeridas</p>';
    }
    
    // Editor de respuesta eliminado (se mantiene progreso por preguntas)
}

// Configurar botones del editor
function setupFieldEditorButtons(field) {
    // Solo mantener marcado como completo
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    if (markCompleteBtn) {
        markCompleteBtn.onclick = () => markFieldComplete(field);
    }
}

// Guardar respuesta del campo
// saveFieldResponse eliminado: ahora se guardan respuestas por pregunta

// Marcar campo como completo
function markFieldComplete(field) {
    field.isComplete = true;
    field.status = 'complete';
    
    // Actualizar progreso
    interviewProgress[field.id] = {
        ...interviewProgress[field.id],
        isComplete: true,
        completedAt: new Date().toISOString()
    };
    
    // Actualizar visualización
    loadFieldsList();
    updateProgressDisplay();
    
    showNotification(`Campo "${field.name}" marcado como completo`, 'success');
}

// Actualizar display de progreso
function updateProgressDisplay() {
    const completedCount = fieldsToComplete.filter(f => f.isComplete).length;
    const totalCount = fieldsToComplete.length;
    
    document.getElementById('completed-fields-count').textContent = completedCount;
    document.getElementById('total-fields-count').textContent = totalCount;
    
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    
    // Botón de finalizar siempre habilitado; la validación se maneja al hacer clic
    const completeBtn = document.getElementById('complete-interview-btn');
    if (completeBtn) {
        completeBtn.disabled = false;
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Botón de volver al Paso C
    const backBtn = document.getElementById('back-to-step-c-btn');
    if (backBtn) {
        backBtn.addEventListener('click', backToStepC);
    }
    
    // Botón de guardar progreso
    const saveProgressBtn = document.getElementById('save-interview-progress-btn');
    if (saveProgressBtn) {
        saveProgressBtn.addEventListener('click', saveInterviewProgress);
    }
    
    // Botón de finalizar entrevista
    const completeBtn = document.getElementById('complete-interview-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', completeInterview);
        // Asegurar que esté habilitado independientemente del estado inicial del DOM
        completeBtn.disabled = false;
    }
    
    // Botón de exportar documento final
    const exportBtn = document.getElementById('export-complete-document-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportCompleteDocument);
    }
}

// Volver al Paso C
function backToStepC() {
    const stepD = document.getElementById('step-d');
    const stepC = document.getElementById('step-c');
    
    if (stepD) stepD.style.display = 'none';
    if (stepC) stepC.style.display = 'block';
    
    updateStepIndicators('C');
    updateHeaderPhase('C');
    
    // Reinicializar el Paso C si es necesario
    if (typeof initializeStepC === 'function') {
        initializeStepC();
    }
    
    console.log('Returned to Step C');
}

// Guardar progreso de la entrevista
function saveInterviewProgress() {
    const progressData = {
        timestamp: new Date().toISOString(),
        fields: fieldsToComplete,
        progress: interviewProgress,
        challengeResponses: challengeResponses
    };
    
    // En una implementación real, esto se enviaría al servidor
    localStorage.setItem('interviewProgress', JSON.stringify(progressData));
    
    showNotification('Progreso de la entrevista guardado', 'success');
}

// Completar entrevista
function completeInterview() {
    // Marcar todos los campos como completos
    fieldsToComplete.forEach(field => {
        field.isComplete = true;
        field.status = 'complete';
    });
    
    // Actualizar Challenge Request final
    const finalDocument = generateFinalDocument('ready_for_extraction');

    // Guardar en servidor (code/files/) mediante endpoint local
    saveInterviewResults(finalDocument)
        .then((res) => {
            if (res && res.ok) {
                showNotification(`Entrevista finalizada y guardada en ${res.relative_path}`, 'success');
            } else {
                showNotification('Entrevista finalizada, pero no se pudo guardar el archivo', 'error');
            }
        })
        .catch(() => {
            showNotification('Entrevista finalizada, pero ocurrió un error al guardar', 'error');
        });
    
    // Proceder al siguiente paso (Procedimiento de Extracción E–K) en la demo
    const stepC = document.getElementById('step-c');
    const stepD = document.getElementById('step-d');
    if (stepC) stepC.style.display = 'none';
    if (stepD) stepD.style.display = 'none';
    if (typeof window.initializeStepE === 'function') {
        window.initializeStepE();
    } else {
        console.log('initializeStepE no disponible todavía');
    }
    console.log('Interview completed. Final document:', finalDocument);
}

// Validar que todos los campos estén completos
function validateAllFieldsComplete() {
    return fieldsToComplete.every(field => field.isComplete);
}

// Generar documento final
function generateFinalDocument(statusOverride) {
    return {
        metadata: {
            title: 'Challenge Request Finalizado',
            timestamp: new Date().toISOString(),
            phase: 'Fase 1 - Definición Completada',
            nextPhase: 'Procedimiento de Extracción (Pasos E-N)'
        },
        challengeRequest: challengeResponses,
        aiReview: aiReviewData,
        interviewResults: {
            completedFields: fieldsToComplete.filter(f => f.isComplete),
            progress: interviewProgress
        },
        status: statusOverride || 'ready_for_extraction'
    };
}

// Guardar resultados de entrevista en servidor
async function saveInterviewResults(finalDocument) {
    try {
        const filename = `challenge-request-final-${new Date().toISOString().split('T')[0]}.json`;
        const response = await fetch('/api/save-interview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename, data: finalDocument })
        });
        if (!response.ok) {
            return { ok: false };
        }
        return await response.json();
    } catch (e) {
        console.error('Error saving interview results:', e);
        return { ok: false };
    }
}

// Exportar documento final
function exportCompleteDocument() {
    const finalDocument = generateFinalDocument();
    
    // Crear y descargar archivo JSON
    const dataStr = JSON.stringify(finalDocument, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `challenge-request-final-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Documento final exportado correctamente', 'success');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Implementación simple de notificación
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Funciones auxiliares para actualizar indicadores (copiadas de otros archivos)
function updateStepIndicators(activeStep) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
        step.classList.add('opacity-40');
        const stepLabel = step.querySelector('.step-label');
        if (stepLabel) {
            stepLabel.classList.remove('text-applus-orange', 'font-semibold');
            stepLabel.classList.add('text-applus-gray-400', 'font-medium');
        }
    });
    
    // Buscar el botón correcto por el texto del paso
    const stepTexts = {
        'A': 'Personalización',
        'B': 'Respuesta UN', 
        'C': 'Revisión IA',
        'D': 'Entrevista'
    };
    
    const activeStepText = stepTexts[activeStep];
    if (activeStepText) {
        const activeStepElement = Array.from(steps).find(step => {
            const stepLabel = step.querySelector('.step-label');
            return stepLabel && stepLabel.textContent.includes(activeStepText);
        });
        
        if (activeStepElement) {
            activeStepElement.classList.add('active');
            activeStepElement.classList.remove('opacity-40');
            activeStepElement.classList.add('opacity-100');
            const activeStepLabel = activeStepElement.querySelector('.step-label');
            if (activeStepLabel) {
                activeStepLabel.classList.add('text-applus-orange', 'font-semibold');
                activeStepLabel.classList.remove('text-applus-gray-400', 'font-medium');
            }
        }
    }
}

function updateHeaderPhase(step) {
    const phaseIndicator = document.querySelector('.bg-applus-orange');
    if (phaseIndicator) {
        const phaseTexts = {
            'A': 'Fase 1: Definición - Paso A',
            'B': 'Fase 1: Definición - Paso B', 
            'C': 'Fase 1: Definición - Paso C',
            'D': 'Fase 1: Definición - Paso D'
        };
        phaseIndicator.textContent = phaseTexts[step] || 'Fase 1: Definición';
    }
}

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Step D script loaded');
});

// Exponer API pública requerida por Step C sin contaminar el ámbito global
window.initializeStepD = initializeStepD;
})();
