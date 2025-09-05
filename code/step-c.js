// Paso C: Funcionalidad para la revisión de IA

// Variables globales para el Paso C
let aiReviewData = null;
let currentSelectedField = null;

// Función para cargar la revisión de IA
async function loadAIReview() {
    try {
        const response = await fetch('files/ai-review-bvlos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        aiReviewData = await response.json();
        console.log('AI Review loaded:', aiReviewData);
        return aiReviewData;
    } catch (error) {
        console.error('Error loading AI review:', error);
        return null;
    }
}

// Función para mostrar el Paso C
function showStepC() {
    // Ocultar el Paso B
    const stepB = document.getElementById('step-b');
    if (stepB) {
        stepB.style.display = 'none';
    }
    
    // Mostrar el Paso C
    const stepC = document.getElementById('step-c');
    if (stepC) {
        stepC.style.display = 'block';
    }
    
    // Actualizar el indicador de paso
    updateStepIndicator('C');
    
    // Cargar la revisión de IA
    loadAIReviewData();
    
    // Scroll suave al Paso C
    stepC.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Función para cargar los datos de la revisión de IA
async function loadAIReviewData() {
    if (!aiReviewData) {
        console.error('No AI review data loaded');
        return;
    }
    
    // Cargar también los datos del challenge para mostrar las respuestas originales
    try {
        const response = await fetch('files/Challenge request con ejemplo BVLOS.json');
        if (response.ok) {
            challengeResponses = await response.json();
            console.log('Challenge responses loaded for Step C:', challengeResponses);
        }
    } catch (error) {
        console.error('Error loading challenge responses for Step C:', error);
    }
    
    // Actualizar resumen general
    updateSummaryCards();
    
    // Cargar lista de campos revisados
    loadReviewList();
    
    // Cargar recomendaciones generales
    loadGeneralRecommendations();
}

// Función para actualizar las tarjetas de resumen
function updateSummaryCards() {
    const overallScore = document.getElementById('overall-score');
    const recommendationsCount = document.getElementById('recommendations-count');
    const questionsCount = document.getElementById('questions-count');
    
    if (overallScore) {
        overallScore.textContent = aiReviewData.metadata.overall_score;
    }
    
    if (recommendationsCount) {
        recommendationsCount.textContent = aiReviewData.metadata.recommendations_count;
    }
    
    if (questionsCount) {
        questionsCount.textContent = aiReviewData.interview_questions_summary.total_questions;
    }
}

// Función para cargar la lista de campos revisados
function loadReviewList() {
    const reviewList = document.getElementById('review-list');
    if (!reviewList) {
        console.error('Review list element not found');
        return;
    }
    
    if (!aiReviewData || !aiReviewData.field_reviews) {
        console.error('No AI review data available:', aiReviewData);
        return;
    }
    
    console.log('Loading review list with', aiReviewData.field_reviews.length, 'fields');
    
    reviewList.innerHTML = '';
    
    aiReviewData.field_reviews.forEach((fieldReview, index) => {
        console.log('Processing field review:', fieldReview.field_name, fieldReview);
        
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.dataset.fieldId = fieldReview.field_id;
        
        const feedback = fieldReview.ai_analysis && fieldReview.ai_analysis.feedback ? 
            fieldReview.ai_analysis.feedback : 'No hay feedback disponible';
        const score = fieldReview.ai_analysis && fieldReview.ai_analysis.score ? 
            fieldReview.ai_analysis.score : 'N/A';
        
        reviewItem.innerHTML = `
            <h4>${fieldReview.field_name}</h4>
            <p>${feedback.substring(0, 80)}${feedback.length > 80 ? '...' : ''}</p>
            <div class="review-score">${score}/10</div>
        `;
        
        reviewItem.addEventListener('click', () => selectReviewField(fieldReview));
        reviewList.appendChild(reviewItem);
    });
}

// Función para seleccionar un campo de revisión
function selectReviewField(fieldReview) {
    // Remover selección anterior
    document.querySelectorAll('.review-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Marcar como activa
    const reviewItem = document.querySelector(`[data-field-id="${fieldReview.field_id}"]`);
    if (reviewItem) {
        reviewItem.classList.add('active');
    }
    
    currentSelectedField = fieldReview;
    
    // Mostrar el detalle de la revisión
    showFieldReview(fieldReview);
}

// Función para mostrar el detalle de la revisión de un campo
function showFieldReview(fieldReview) {
    // Verificar que el objeto fieldReview y ai_analysis existan
    if (!fieldReview || !fieldReview.ai_analysis) {
        console.error('Invalid fieldReview object:', fieldReview);
        return;
    }
    
    const reviewHeader = document.getElementById('review-header');
    const reviewContent = document.getElementById('review-content');
    const noReviewSelection = document.getElementById('no-review-selection');
    
    if (reviewHeader && reviewContent && noReviewSelection) {
        // Ocultar mensaje de no selección
        noReviewSelection.style.display = 'none';
        
        // Mostrar header y contenido
        reviewHeader.style.display = 'flex';
        reviewContent.style.display = 'block';
        
        // Actualizar header
        document.getElementById('selected-field-title').textContent = fieldReview.field_name;
        document.getElementById('field-score').textContent = `${fieldReview.ai_analysis.score}/10`;
        
        // Actualizar información del campo (pregunta y respuesta)
        updateFieldInfo(fieldReview);
        
        // Actualizar contenido del análisis
        updateAnalysisContent(fieldReview);
        
        // Actualizar preguntas de entrevista
        updateInterviewQuestions(fieldReview);
        
        // Asegurar que la pestaña de análisis esté activa
        handleTabChange('analysis');
    }
}

// Función para actualizar la información del campo (pregunta y respuesta)
function updateFieldInfo(fieldReview) {
    const originalQuestion = document.getElementById('original-question');
    const userResponse = document.getElementById('user-response');
    
    if (originalQuestion) {
        originalQuestion.textContent = fieldReview.field_name;
    }
    
    if (userResponse) {
        // Buscar la respuesta original en los datos del challenge
        const challengeData = challengeResponses;
        if (challengeData && challengeData.fields) {
            const originalField = challengeData.fields.find(field => field.id === fieldReview.field_id);
            if (originalField && originalField.response) {
                userResponse.textContent = originalField.response;
            } else {
                userResponse.textContent = 'No hay respuesta disponible';
            }
        } else {
            userResponse.textContent = 'No hay respuesta disponible';
        }
    }
}

// Función para actualizar el contenido del análisis
function updateAnalysisContent(fieldReview) {
    console.log('updateAnalysisContent called with:', fieldReview);
    
    if (!fieldReview || !fieldReview.ai_analysis) {
        console.error('Invalid fieldReview object in updateAnalysisContent:', fieldReview);
        return;
    }
    
    const aiFeedback = document.getElementById('ai-feedback');
    const strengthsList = document.getElementById('strengths-list');
    const improvementsList = document.getElementById('improvements-list');
    
    console.log('Analysis elements found:', {
        aiFeedback: !!aiFeedback,
        strengthsList: !!strengthsList,
        improvementsList: !!improvementsList
    });
    
    if (aiFeedback) {
        aiFeedback.textContent = fieldReview.ai_analysis.feedback || 'No hay feedback disponible';
        console.log('Updated ai-feedback with:', fieldReview.ai_analysis.feedback);
    }
    
    if (strengthsList) {
        strengthsList.innerHTML = '';
        if (fieldReview.ai_analysis.strengths && Array.isArray(fieldReview.ai_analysis.strengths)) {
            fieldReview.ai_analysis.strengths.forEach(strength => {
                const li = document.createElement('li');
                li.textContent = strength;
                strengthsList.appendChild(li);
            });
            console.log('Updated strengths list with', fieldReview.ai_analysis.strengths.length, 'items');
        }
    }
    
    if (improvementsList) {
        improvementsList.innerHTML = '';
        if (fieldReview.ai_analysis.improvements && Array.isArray(fieldReview.ai_analysis.improvements)) {
            fieldReview.ai_analysis.improvements.forEach(improvement => {
                const li = document.createElement('li');
                li.textContent = improvement;
                improvementsList.appendChild(li);
            });
            console.log('Updated improvements list with', fieldReview.ai_analysis.improvements.length, 'items');
        }
    }
}

// Función para actualizar las preguntas de entrevista
function updateInterviewQuestions(fieldReview) {
    console.log('updateInterviewQuestions called with:', fieldReview);
    
    if (!fieldReview) {
        console.error('Invalid fieldReview object in updateInterviewQuestions:', fieldReview);
        return;
    }
    
    const questionsList = document.getElementById('interview-questions-list');
    console.log('Questions list element found:', !!questionsList);
    
    if (!questionsList) return;
    
    questionsList.innerHTML = '';
    if (fieldReview.interview_questions && Array.isArray(fieldReview.interview_questions)) {
        fieldReview.interview_questions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = question;
            questionsList.appendChild(li);
        });
        console.log('Updated questions list with', fieldReview.interview_questions.length, 'questions');
    } else {
        const li = document.createElement('li');
        li.textContent = 'No hay preguntas disponibles';
        questionsList.appendChild(li);
        console.log('No questions available for this field');
    }
}

// Función para cargar las recomendaciones generales
function loadGeneralRecommendations() {
    const recommendationsList = document.getElementById('recommendations-list');
    if (!recommendationsList) return;
    
    recommendationsList.innerHTML = '';
    
    aiReviewData.overall_recommendations.forEach(recommendation => {
        const recommendationItem = document.createElement('div');
        recommendationItem.className = `recommendation-item ${recommendation.priority}`;
        
        recommendationItem.innerHTML = `
            <div class="recommendation-header">
                <span class="recommendation-category">${recommendation.category.replace('_', ' ').toUpperCase()}</span>
                <span class="recommendation-priority ${recommendation.priority}">${recommendation.priority}</span>
            </div>
            <p class="recommendation-text">${recommendation.recommendation}</p>
            <p class="recommendation-impact">Impacto: ${recommendation.impact}</p>
        `;
        
        recommendationsList.appendChild(recommendationItem);
    });
}

// Función para volver al Paso B
function backToStepB() {
    // Ocultar el Paso C
    const stepC = document.getElementById('step-c');
    if (stepC) {
        stepC.style.display = 'none';
    }
    
    // Mostrar el Paso B
    const stepB = document.getElementById('step-b');
    if (stepB) {
        stepB.style.display = 'block';
    }
    
    // Actualizar el indicador de paso
    updateStepIndicator('B');
    
    // Scroll suave al Paso B
    stepB.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Función para descargar la revisión de IA
function downloadAIReview() {
    if (!aiReviewData) {
        showNotification('No hay datos de revisión para descargar', 'error');
        return;
    }
    
    // Crear un objeto con la revisión completa
    const downloadData = {
        ...aiReviewData,
        download_date: new Date().toISOString(),
        download_source: 'Applus+ Ventures Challenge Request Tool'
    };
    
    // Crear y descargar el archivo
    const blob = new Blob([JSON.stringify(downloadData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_review_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Revisión de IA descargada correctamente', 'success');
}

// Función para continuar al Paso D
function continueToStepD() {
    // Aquí se implementaría la lógica para pasar al Paso D
    showNotification('Funcionalidad del Paso D en desarrollo', 'info');
}

// Función para manejar el cambio de pestañas
function handleTabChange(tabName) {
    console.log('Changing to tab:', tabName);
    console.log('Current selected field:', currentSelectedField);
    
    // Remover clase active de todas las pestañas
    document.querySelectorAll('.review-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activar la pestaña seleccionada
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}-tab`);
    
    console.log('Active tab element:', activeTab);
    console.log('Active content element:', activeContent);
    
    if (activeTab) {
        activeTab.classList.add('active');
        console.log('Tab activated:', tabName);
    } else {
        console.error('Tab element not found for:', tabName);
    }
    
    if (activeContent) {
        activeContent.classList.add('active');
        console.log('Content activated:', `${tabName}-tab`);
    } else {
        console.error('Content element not found for:', `${tabName}-tab`);
    }
    
    // Si cambiamos a la pestaña de preguntas, asegurar que las preguntas estén cargadas
    if (tabName === 'questions' && currentSelectedField) {
        console.log('Updating interview questions for field:', currentSelectedField.field_name);
        updateInterviewQuestions(currentSelectedField);
    }
    
    // Si cambiamos a la pestaña de análisis, asegurar que el análisis esté cargado
    if (tabName === 'analysis' && currentSelectedField) {
        console.log('Updating analysis content for field:', currentSelectedField.field_name);
        updateAnalysisContent(currentSelectedField);
    }
}

// Event listeners para el Paso C
document.addEventListener('DOMContentLoaded', function() {
    // Cargar revisión de IA al inicializar
    loadAIReview();
    
    // Event listener para el botón de continuar al Paso C
    const nextStepCBtn = document.getElementById('next-step-c-btn');
    if (nextStepCBtn) {
        nextStepCBtn.addEventListener('click', showStepC);
    }
    
    // Event listeners para los botones del Paso C
    const backToStepBBtn = document.getElementById('back-to-step-b-btn');
    if (backToStepBBtn) {
        backToStepBBtn.addEventListener('click', backToStepB);
    }
    
    const downloadAIReviewBtn = document.getElementById('download-ai-review-btn');
    if (downloadAIReviewBtn) {
        downloadAIReviewBtn.addEventListener('click', downloadAIReview);
    }
    
    const nextStepDBtn = document.getElementById('next-step-d-btn');
    if (nextStepDBtn) {
        nextStepDBtn.addEventListener('click', continueToStepD);
    }
    
    // Event listeners para las pestañas
    document.querySelectorAll('.review-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            handleTabChange(tabName);
        });
    });
});
