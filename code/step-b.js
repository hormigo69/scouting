// Paso B: Funcionalidad para manejar respuestas del Challenge Request

// Variables globales para el Paso B
let challengeResponses = null;
let currentSelectedQuestion = null;

// Función para cargar las respuestas del JSON
async function loadChallengeResponses() {
    try {
        const response = await fetch('files/Challenge request con ejemplo BVLOS.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        challengeResponses = await response.json();
        console.log('Challenge responses loaded:', challengeResponses);
        return challengeResponses;
    } catch (error) {
        console.error('Error loading challenge responses:', error);
        return null;
    }
}

// Función para mostrar el Paso B
function showStepB() {
    // Mostrar el Paso B
    const stepB = document.getElementById('step-b');
    if (stepB) {
        stepB.style.display = 'block';
    }
    
    // Update step indicator directly
    const stepIndicator = document.getElementById('current-step-indicator');
    if (stepIndicator) {
        stepIndicator.textContent = 'Paso B: Respuesta UN';
    }
    
    // Cargar las preguntas
    loadQuestionsList();
    
    // Scroll suave al Paso B
    stepB.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Función para actualizar el indicador de paso
function updateStepIndicator(step) {
    const stepBadge = document.querySelector('.step-badge');
    if (stepBadge) {
        stepBadge.textContent = `Paso ${step}: ${step === 'A' ? 'Personalización' : step === 'B' ? 'Respuesta UN' : step === 'C' ? 'Revisión IA' : 'Entrevista'}`;
    }
    
    // Actualizar los pasos activos
    document.querySelectorAll('.step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    const activeStep = document.querySelector(`.step:nth-child(${step === 'A' ? '1' : step === 'B' ? '2' : step === 'C' ? '3' : '4'})`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
}

// Función para cargar la lista de preguntas
function loadQuestionsList() {
    if (!challengeResponses || !challengeResponses.fields) {
        console.error('No challenge responses loaded');
        return;
    }
    
    const questionsList = document.getElementById('questions-list');
    if (!questionsList) return;
    
    questionsList.innerHTML = '';
    
    // Mostrar todas las preguntas del JSON
    challengeResponses.fields.forEach((field, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'list-item mb-3';
        questionItem.dataset.fieldId = field.id;
        
        // Marcar si tiene respuesta
        if (field.response && field.response.trim()) {
            questionItem.classList.add('has-response');
        }
        
        questionItem.innerHTML = `
            <h4 class="font-semibold text-applus-gray-700 mb-2">${field.name}</h4>
            <p class="text-sm text-applus-gray-500 leading-relaxed">${field.description.substring(0, 100)}${field.description.length > 100 ? '...' : ''}</p>
        `;
        
        questionItem.addEventListener('click', () => selectQuestion(field));
        questionsList.appendChild(questionItem);
    });
    
    // Auto-seleccionar la primera pregunta (PROBLEM si existe, sino la primera)
    const problemField = challengeResponses.fields.find(field => 
        field.id === 'problem_definition' || 
        field.name.toLowerCase().includes('problem') ||
        field.name === 'PROBLEM'
    );
    
    const firstField = problemField || challengeResponses.fields[0];
    if (firstField) {
        selectQuestion(firstField);
    }
}

// Función para seleccionar una pregunta
function selectQuestion(field) {
    // Remover selección anterior
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Marcar como activa
    const questionItem = document.querySelector(`[data-field-id="${field.id}"]`);
    if (questionItem) {
        questionItem.classList.add('active');
    }
    
    currentSelectedQuestion = field;
    
    // Mostrar la respuesta
    showQuestionResponse(field);
}

// Función para mostrar la respuesta de una pregunta
function showQuestionResponse(field) {
    const responseHeader = document.getElementById('response-header');
    const responseContent = document.getElementById('response-content');
    const noSelection = document.getElementById('no-selection');
    
    if (responseHeader && responseContent && noSelection) {
        // Ocultar mensaje de no selección
        noSelection.style.display = 'none';
        
        // Mostrar header y contenido
        responseHeader.style.display = 'block';
        responseContent.style.display = 'block';
        
        // Actualizar header
        document.getElementById('selected-question-title').textContent = field.name;
        document.getElementById('selected-question-description').textContent = field.description;
        
        // Crear cajas individuales para cada línea de la respuesta
        createIndividualResponseBoxes(field);
    }
}

function createIndividualResponseBoxes(field) {
    const responseContent = document.getElementById('response-content');
    if (!responseContent) return;
    
    // Limpiar contenido anterior
    responseContent.innerHTML = '';
    
    // Crear contenedor para la respuesta
    const responseEditor = document.createElement('div');
    responseEditor.className = 'response-editor flex-1 flex flex-col';
    
    // Crear una sola caja de respuesta
    responseEditor.innerHTML = `
        <label class="font-semibold mb-2 text-applus-gray-600">Respuesta:</label>
        <textarea 
            id="response-textarea"
            class="w-full p-4 border border-applus-gray-300 rounded-md font-inherit text-sm leading-relaxed resize-y min-h-[300px] focus:outline-none focus:border-applus-orange focus:ring-2 focus:ring-applus-orange focus:ring-opacity-20"
            placeholder="Escribe tu respuesta aquí..."
        >${field.response || ''}</textarea>
        <div class="flex gap-2 mt-4">
            <button id="save-response-btn" class="btn-applus-primary">
                <i class="fas fa-save"></i> Guardar Cambios
            </button>
            <button id="clear-response-btn" class="btn-applus-secondary">
                <i class="fas fa-eraser"></i> Limpiar
            </button>
        </div>
    `;
    
    responseContent.appendChild(responseEditor);
    
    // Agregar event listeners a los botones
    setupResponseButtons();
}

// Función para configurar los botones de respuesta
function setupResponseButtons() {
    const saveBtn = document.getElementById('save-response-btn');
    const clearBtn = document.getElementById('clear-response-btn');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveResponse);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearResponse);
    }
}

// Función para guardar cambios en una respuesta
function saveResponse() {
    if (!currentSelectedQuestion) return;
    
    // Obtener el valor del textarea único
    const textarea = document.getElementById('response-textarea');
    if (!textarea) return;
    
    // Actualizar la respuesta en el objeto
    currentSelectedQuestion.response = textarea.value;
    
    // Actualizar el indicador visual
    const questionItem = document.querySelector(`[data-field-id="${currentSelectedQuestion.id}"]`);
    if (questionItem) {
        if (currentSelectedQuestion.response.trim()) {
            questionItem.classList.add('has-response');
        } else {
            questionItem.classList.remove('has-response');
        }
    }
    
    // Mostrar confirmación
    showNotification('Respuesta guardada correctamente', 'success');
}

// Función para limpiar una respuesta
function clearResponse() {
    const textarea = document.getElementById('response-textarea');
    if (textarea) {
        textarea.value = '';
    }
}


// Función para descargar las respuestas
function downloadResponses() {
    if (!challengeResponses) {
        showNotification('No hay respuestas para descargar', 'error');
        return;
    }
    
    // Crear un objeto con las respuestas actualizadas
    const downloadData = {
        metadata: challengeResponses.metadata,
        fields: challengeResponses.fields.map(field => ({
            id: field.id,
            name: field.name,
            description: field.description,
            response: field.response || ''
        }))
    };
    
    // Crear y descargar el archivo
    const blob = new Blob([JSON.stringify(downloadData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `challenge_responses_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Respuestas descargadas correctamente', 'success');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Colores según el tipo
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ff9800';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para volver al Paso A
function backToStepA() {
    // Ocultar el Paso B
    const stepB = document.getElementById('step-b');
    if (stepB) {
        stepB.style.display = 'none';
    }
    
    // Update step indicator directly
    const stepIndicator = document.getElementById('current-step-indicator');
    if (stepIndicator) {
        stepIndicator.textContent = 'Paso A: Personalización';
    }
    
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para continuar al Paso C
function continueToStepC() {
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
    
    // Update step indicator directly
    const stepIndicator = document.getElementById('current-step-indicator');
    if (stepIndicator) {
        stepIndicator.textContent = 'Paso C: Revisión IA';
    }
    
    // Actualizar header phase indicator
    updateHeaderPhase('C');
    
    // Inicializar funcionalidad del Paso C
    initializeStepC();
    
    console.log('Navigated to Step C');
}

// Event listeners para el Paso B
document.addEventListener('DOMContentLoaded', function() {
    // Cargar respuestas al inicializar
    loadChallengeResponses();
    
    // Event listener para el botón de continuar al Paso B
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', showStepB);
    }
    
    // Event listeners para los botones del Paso B
    // Los botones de respuesta se configuran dinámicamente en setupResponseButtons()
    
    const downloadResponsesBtn = document.getElementById('download-responses-btn');
    if (downloadResponsesBtn) {
        downloadResponsesBtn.addEventListener('click', downloadResponses);
    }
    
    const nextStepCBtn = document.getElementById('next-step-c-btn');
    if (nextStepCBtn) {
        nextStepCBtn.addEventListener('click', continueToStepC);
    }
    
    const backToStepABtn = document.getElementById('back-to-step-a-btn');
    if (backToStepABtn) {
        backToStepABtn.addEventListener('click', backToStepA);
    }
});

// Función para inicializar el contenido del Paso B
function initializeStepBContent() {
    // Cargar las respuestas del challenge
    loadChallengeResponses().then(() => {
        // Una vez cargadas, mostrar la lista de preguntas (solo PROBLEM)
        loadQuestionsList();
    });
}

// Función para actualizar indicadores de paso (copiada de script.js)
function updateStepIndicators(activeStep) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const stepNumber = step.querySelector('.step-number');
        const stepLabel = step.querySelector('.step-label, div:last-child');
        
        // Reset all steps
        step.classList.remove('active');
        step.style.opacity = '0.4';
        
        if (stepNumber) {
            stepNumber.style.backgroundColor = '#e5e7eb';
            stepNumber.style.color = '#6b7280';
            stepNumber.style.borderColor = '#e5e7eb';
        }
        
        if (stepLabel) {
            stepLabel.style.color = '#6b7280';
            stepLabel.style.fontWeight = '500';
        }
        
        // Set active step
        if (index === 0 && activeStep === 'A') {
            step.classList.add('active');
            step.style.opacity = '1';
            if (stepNumber) {
                stepNumber.style.backgroundColor = '#FF8C00';
                stepNumber.style.color = 'white';
                stepNumber.style.borderColor = '#FF8C00';
            }
            if (stepLabel) {
                stepLabel.style.color = '#FF8C00';
                stepLabel.style.fontWeight = '600';
            }
        } else if (index === 1 && activeStep === 'B') {
            step.classList.add('active');
            step.style.opacity = '1';
            if (stepNumber) {
                stepNumber.style.backgroundColor = '#FF8C00';
                stepNumber.style.color = 'white';
                stepNumber.style.borderColor = '#FF8C00';
            }
            if (stepLabel) {
                stepLabel.style.color = '#FF8C00';
                stepLabel.style.fontWeight = '600';
            }
        } else if (index === 2 && activeStep === 'C') {
            step.classList.add('active');
            step.style.opacity = '1';
            if (stepNumber) {
                stepNumber.style.backgroundColor = '#FF8C00';
                stepNumber.style.color = 'white';
                stepNumber.style.borderColor = '#FF8C00';
            }
            if (stepLabel) {
                stepLabel.style.color = '#FF8C00';
                stepLabel.style.fontWeight = '600';
            }
        }
    });
}

// Función para actualizar header phase indicator (copiada de script.js)
function updateHeaderPhase(step) {
    const phaseBadge = document.querySelector('.phase-badge');
    const stepBadge = document.querySelector('.step-badge');
    
    if (step === 'B' && phaseBadge && stepBadge) {
        stepBadge.textContent = 'Paso B: Respuestas';
    } else if (step === 'C' && phaseBadge && stepBadge) {
        stepBadge.textContent = 'Paso C: Revisión IA';
    }
}
