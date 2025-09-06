// Paso D: Entrevista con Unidad de Negocio
// Este archivo maneja la funcionalidad del Paso D donde el investigador completa
// el Challenge Request con la información faltante identificada por la IA

let challengeResponses = null;
let aiReviewData = null;
let fieldsToComplete = [];
let currentField = null;
let interviewProgress = {};

// Inicialización del Paso D
function initializeStepD() {
    console.log('Initializing Step D: Interview with Business Unit');
    
    // Cargar datos necesarios
    loadChallengeResponses().then(() => {
        loadAIReview().then(() => {
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
        const response = await fetch('files/Challenge%20request%20con%20ejemplo%20BVLOS.json');
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
        const response = await fetch('files/ai-review-bvlos.json');
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
            const fieldData = {
                id: field.id,
                name: field.name,
                description: field.description,
                currentResponse: field.response || '',
                aiAnalysis: aiReview.analysis || '',
                suggestedQuestions: aiReview.interview_questions || [],
                score: aiReview.score || 0,
                feedback: aiReview.feedback || '',
                status: determineFieldStatus(field.response, aiReview.score),
                priority: determineFieldPriority(aiReview.score, aiReview.feedback),
                isComplete: false
            };
            
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
    if (score < 4 || feedback.includes('crítico') || feedback.includes('faltante')) {
        return 'high';
    } else if (score < 7 || feedback.includes('mejorar') || feedback.includes('ampliar')) {
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
    aiAnalysis.innerHTML = `
        <div class="mb-2">
            <strong>Puntuación:</strong> ${field.score}/10
        </div>
        <div class="mb-2">
            <strong>Feedback:</strong> ${field.feedback}
        </div>
        <div>
            <strong>Análisis:</strong> ${field.aiAnalysis}
        </div>
    `;
    
    // Preguntas sugeridas
    const suggestedQuestions = document.getElementById('suggested-questions');
    if (field.suggestedQuestions && field.suggestedQuestions.length > 0) {
        const questionsList = field.suggestedQuestions.map(q => `<li class="mb-1">• ${q}</li>`).join('');
        suggestedQuestions.innerHTML = `<ul class="list-disc list-inside space-y-1">${questionsList}</ul>`;
    } else {
        suggestedQuestions.innerHTML = '<p class="text-applus-gray-400 italic">No hay preguntas sugeridas</p>';
    }
    
    // Editor de respuesta
    const responseEditor = document.getElementById('field-response-editor');
    responseEditor.value = field.currentResponse;
    
    // Configurar botones
    setupFieldEditorButtons(field);
}

// Configurar botones del editor
function setupFieldEditorButtons(field) {
    const saveBtn = document.getElementById('save-field-response-btn');
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    
    if (saveBtn) {
        saveBtn.onclick = () => saveFieldResponse(field);
    }
    
    if (markCompleteBtn) {
        markCompleteBtn.onclick = () => markFieldComplete(field);
    }
}

// Guardar respuesta del campo
function saveFieldResponse(field) {
    const responseEditor = document.getElementById('field-response-editor');
    if (!responseEditor) return;
    
    const newResponse = responseEditor.value.trim();
    
    // Actualizar campo
    field.currentResponse = newResponse;
    field.status = determineFieldStatus(newResponse, field.score);
    
    // Actualizar en el Challenge Request original
    const originalField = challengeResponses.fields.find(f => f.id === field.id);
    if (originalField) {
        originalField.response = newResponse;
    }
    
    // Guardar progreso
    interviewProgress[field.id] = {
        response: newResponse,
        timestamp: new Date().toISOString(),
        status: field.status
    };
    
    // Actualizar visualización
    loadFieldsList();
    showFieldEditor(field);
    updateProgressDisplay();
    
    showNotification('Respuesta guardada correctamente', 'success');
}

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
    
    // Habilitar/deshabilitar botón de finalizar
    const completeBtn = document.getElementById('complete-interview-btn');
    if (completeBtn) {
        completeBtn.disabled = completedCount < totalCount;
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
    if (!validateAllFieldsComplete()) {
        showNotification('Debes completar todos los campos antes de finalizar', 'error');
        return;
    }
    
    // Marcar todos los campos como completos
    fieldsToComplete.forEach(field => {
        field.isComplete = true;
        field.status = 'complete';
    });
    
    // Actualizar Challenge Request final
    const finalDocument = generateFinalDocument();
    
    showNotification('Entrevista completada exitosamente', 'success');
    
    // Aquí se podría proceder al siguiente paso (Procedimiento de Extracción E-N)
    console.log('Interview completed. Final document:', finalDocument);
}

// Validar que todos los campos estén completos
function validateAllFieldsComplete() {
    return fieldsToComplete.every(field => field.isComplete);
}

// Generar documento final
function generateFinalDocument() {
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
        status: 'ready_for_extraction'
    };
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
