// Template definitions
const templates = {
    standard: {
        name: 'Plantilla Estándar',
        description: 'Plantilla base de Applus+ Ventures con todos los campos estándar del Challenge Request',
        fields: [
            {
                id: 'challenge_headline',
                name: 'Challenge Headline',
                type: 'text',
                required: true,
                description: 'Use a short sentence, easy to remember, descriptive of the problem to solve',
                examples: 'Ejemplo: "Reducir emisiones de partículas de freno en vehículos comerciales para cumplir Euro 7"'
            },
            {
                id: 'problem',
                name: 'Problem',
                type: 'textarea',
                required: true,
                description: 'Explain briefly relevant background information, detailing the problem we are trying to solve and why',
                examples: 'Incluir: Background, Problem, Expected impact and benefits, Other business units that could benefit'
            },
            {
                id: 'potential_solutions',
                name: 'Potential Solutions',
                type: 'textarea',
                required: true,
                description: 'On your best knowledge, describe possible solutions and/or technologies that you estimate could solve the problem. Include names of known companies and startups that may have a solutions and/or you have been in contact in the past',
                examples: 'Incluir: Possible solutions/technologies, Company names (if known), Functional description, Technical specificities'
            },
            {
                id: 'discarded_solutions',
                name: 'Discarded Solutions',
                type: 'textarea',
                required: false,
                description: 'Indicate which solutions you think are not viable and why. Indicate the name of companies owing the solution if possible',
                examples: 'Incluir: Non-viable solutions, Company name (if known), Why they are not viable'
            },
            {
                id: 'number_startups',
                name: 'Number of Startups',
                type: 'number',
                required: true,
                description: 'Indicate the number of potential startups expected to review. The first deliverable will be a list of startups potentially qualified to solve the Challenge, based on public information (Long List). The team will review and select a few, to be contacted by Applus Ventures to request further information and confirm their qualification and interest in meeting Applus (Short List)',
                examples: 'Ejemplo: Long List: 20 startups, Short List: 3-5 startups'
            },
            {
                id: 'considerations',
                name: 'Considerations',
                type: 'textarea',
                required: false,
                description: 'Are there time, cost, resources or technology constraints to consider for this project? What is the level of urgency or deadlines? What are the main barriers or stoppers to consider? (availability of the team, engagement of the end users, etc.)',
                examples: 'Incluir: Time constraints, Cost limitations, Resource availability, Technology constraints, Urgency level, Main barriers'
            },
            {
                id: 'pilot_project',
                name: 'Pilot Project/Proof of Concept',
                type: 'textarea',
                required: false,
                description: 'The Pilot Project or Proof of Concept is a project of limited scope and timing to qualify the selected startup and its solution. Please confirm the interest in such project and detail preliminary particulars, if known',
                examples: 'Incluir: Scope/Use Case, Technical particulars, People Involved, Potential Start date, Estimate duration, Budget'
            },
            {
                id: 'value_proposition',
                name: 'Value Proposition/Post-Pilot Collaboration',
                type: 'textarea',
                required: false,
                description: 'What are the benefits that the startup may get if it accepts to collaborate with Applus, if the Pilot Project/Proof of Concept is successful. Please elaborate',
                examples: 'Incluir: Commercial Collaboration, Access to Applus clients, Long term Partnership, Joint R&D project, Financing'
            },
            {
                id: 'applus_team',
                name: 'Applus Team',
                type: 'textarea',
                required: true,
                description: 'Indicate the people involved, name and position',
                examples: 'Incluir: Sponsor, Owner (main contact), Coordinator, Evaluators, Pilot Project Team'
            },
            {
                id: 'documentation',
                name: 'Documentation',
                type: 'textarea',
                required: false,
                description: 'Please list and send enclosed any relevant documentation you estimate useful',
                examples: 'Incluir: Technical specifications, Market studies, Regulatory documents, Previous research, Case studies'
            }
        ]
    },
    automotive: {
        name: 'Automoción',
        description: 'Especializada en retos de automoción con campos para Euro 7, normativas UE',
        fields: [
            {
                id: 'challenge_headline',
                name: 'Challenge Headline',
                type: 'text',
                required: true,
                description: 'Use a short sentence, easy to remember, descriptive of the problem to solve',
                examples: 'Ejemplo: "Reducir emisiones de partículas de freno en vehículos comerciales para cumplir Euro 7"'
            },
            {
                id: 'problem',
                name: 'Problem',
                type: 'textarea',
                required: true,
                description: 'Explain briefly relevant background information, detailing the problem we are trying to solve and why',
                examples: 'Incluir: Background, Problem, Expected impact and benefits, Other business units that could benefit'
            },
            {
                id: 'euro7_compliance',
                name: 'Euro 7 Compliance',
                type: 'select',
                required: true,
                description: 'Does the solution need to comply with Euro 7 regulations?',
                options: ['Yes', 'No', 'Partially', 'Not applicable'],
                examples: 'Seleccionar si la solución debe cumplir con la normativa Euro 7'
            },
            {
                id: 'trl_minimum',
                name: 'Minimum TRL',
                type: 'select',
                required: true,
                description: 'Minimum Technology Readiness Level required',
                options: ['TRL 1-2', 'TRL 3-4', 'TRL 5-6', 'TRL 7-8', 'TRL 9'],
                examples: 'TRL 5-6 para piloto de integración, TRL 7-8 para implementación comercial'
            },
            {
                id: 'emission_focus',
                name: 'Emission Focus',
                type: 'select',
                required: true,
                description: 'Type of emissions the solution addresses',
                options: ['Tailpipe emissions', 'Non-tailpipe emissions', 'Brake particles', 'Tire wear', 'All emissions'],
                examples: 'Euro 7 incluye por primera vez partículas de freno y desgaste de neumáticos'
            },
            {
                id: 'vehicle_categories',
                name: 'Vehicle Categories',
                type: 'checkbox',
                required: true,
                description: 'Vehicle categories the solution targets',
                options: ['M1 (passenger cars)', 'N1 (light commercial vehicles)', 'M2 (buses)', 'N2/N3 (trucks)'],
                examples: 'M1 y N1 son las categorías más afectadas por Euro 7'
            },
            {
                id: 'potential_solutions',
                name: 'Potential Solutions',
                type: 'textarea',
                required: true,
                description: 'On your best knowledge, describe possible solutions and/or technologies that you estimate could solve the problem',
                examples: 'Incluir: Materiales de freno, Sistemas de captura, Monitorización, Recubrimientos'
            },
            {
                id: 'regulatory_requirements',
                name: 'Regulatory Requirements',
                type: 'textarea',
                required: true,
                description: 'Specific regulatory requirements and certifications needed',
                examples: 'Incluir: Euro 7 compliance, Durabilidad, Protocolos de ensayo, Certificaciones'
            },
            {
                id: 'pilot_timeline',
                name: 'Pilot Timeline',
                type: 'select',
                required: true,
                description: 'Expected timeline for pilot project',
                options: ['3-6 months', '6-12 months', '12-18 months', '18+ months'],
                examples: '6-12 meses es típico para pilotos de automoción'
            },
            {
                id: 'applus_team',
                name: 'Applus Team',
                type: 'textarea',
                required: true,
                description: 'Indicate the people involved, name and position',
                examples: 'Incluir: Sponsor, Owner (main contact), Coordinator, Evaluators, Pilot Project Team'
            }
        ]
    },
    drones: {
        name: 'Drones/UAS',
        description: 'Para retos de drones con campos específicos para EASA, SORA, BVLOS',
        fields: [
            {
                id: 'challenge_headline',
                name: 'Challenge Headline',
                type: 'text',
                required: true,
                description: 'Use a short sentence, easy to remember, descriptive of the problem to solve',
                examples: 'Ejemplo: "Operaciones BVLOS para inspección de líneas eléctricas en zonas rurales"'
            },
            {
                id: 'problem',
                name: 'Problem',
                type: 'textarea',
                required: true,
                description: 'Explain briefly relevant background information, detailing the problem we are trying to solve and why',
                examples: 'Incluir: Background, Problem, Expected impact and benefits, Other business units that could benefit'
            },
            {
                id: 'operation_type',
                name: 'Operation Type',
                type: 'select',
                required: true,
                description: 'Type of drone operation',
                options: ['VLOS (Visual Line of Sight)', 'BVLOS (Beyond Visual Line of Sight)', 'Autonomous', 'Mixed'],
                examples: 'BVLOS permite operaciones más eficientes en infraestructuras'
            },
            {
                id: 'easa_category',
                name: 'EASA Category',
                type: 'select',
                required: true,
                description: 'EASA operation category',
                options: ['Open', 'Specific', 'Certified'],
                examples: 'Categoría Specific requiere SORA para operaciones BVLOS'
            },
            {
                id: 'sora_required',
                name: 'SORA Required',
                type: 'select',
                required: true,
                description: 'Is SORA (Specific Operations Risk Assessment) required?',
                options: ['Yes', 'No', 'To be determined'],
                examples: 'SORA es obligatorio para operaciones BVLOS en categoría Specific'
            },
            {
                id: 'payload_requirements',
                name: 'Payload Requirements',
                type: 'textarea',
                required: true,
                description: 'Specific payload requirements (cameras, sensors, weight, etc.)',
                examples: 'Incluir: Tipo de cámara, Sensores específicos, Peso máximo, Autonomía requerida'
            },
            {
                id: 'flight_altitude',
                name: 'Flight Altitude',
                type: 'select',
                required: true,
                description: 'Expected flight altitude range',
                options: ['0-120m', '120-500m', '500-1000m', '1000m+'],
                examples: '0-120m es el rango más común para inspecciones industriales'
            },
            {
                id: 'weather_conditions',
                name: 'Weather Conditions',
                type: 'checkbox',
                required: true,
                description: 'Weather conditions the solution must handle',
                options: ['Clear weather only', 'Light wind', 'Moderate wind', 'Rain', 'Snow', 'All weather'],
                examples: 'Light wind y Moderate wind son típicos para operaciones industriales'
            },
            {
                id: 'potential_solutions',
                name: 'Potential Solutions',
                type: 'textarea',
                required: true,
                description: 'On your best knowledge, describe possible solutions and/or technologies that you estimate could solve the problem',
                examples: 'Incluir: Fabricantes de UAS, Proveedores de DAA, Sistemas de navegación, Payloads específicos'
            },
            {
                id: 'applus_team',
                name: 'Applus Team',
                type: 'textarea',
                required: true,
                description: 'Indicate the people involved, name and position',
                examples: 'Incluir: Sponsor, Owner (main contact), Coordinator, Evaluators, Pilot Project Team'
            }
        ]
    },
    energy: {
        name: 'Energía',
        description: 'Para retos energéticos con campos para eficiencia, renovables, smart grid',
        fields: [
            {
                id: 'challenge_headline',
                name: 'Challenge Headline',
                type: 'text',
                required: true,
                description: 'Use a short sentence, easy to remember, descriptive of the problem to solve',
                examples: 'Ejemplo: "Optimizar el almacenamiento de energía renovable en redes inteligentes"'
            },
            {
                id: 'problem',
                name: 'Problem',
                type: 'textarea',
                required: true,
                description: 'Explain briefly relevant background information, detailing the problem we are trying to solve and why',
                examples: 'Incluir: Background, Problem, Expected impact and benefits, Other business units that could benefit'
            },
            {
                id: 'energy_type',
                name: 'Energy Type',
                type: 'select',
                required: true,
                description: 'Type of energy the solution addresses',
                options: ['Renewable', 'Fossil fuels', 'Nuclear', 'Energy efficiency', 'Energy storage', 'Grid management'],
                examples: 'Energy storage y Grid management son áreas clave para la transición energética'
            },
            {
                id: 'efficiency_target',
                name: 'Efficiency Target',
                type: 'number',
                required: false,
                description: 'Target efficiency improvement percentage',
                examples: 'Ejemplo: 15-25% de mejora en eficiencia energética'
            },
            {
                id: 'scale_application',
                name: 'Scale of Application',
                type: 'select',
                required: true,
                description: 'Scale of energy application',
                options: ['Residential', 'Commercial', 'Industrial', 'Utility scale', 'Grid level'],
                examples: 'Utility scale y Grid level son los más relevantes para Applus+'
            },
            {
                id: 'renewable_focus',
                name: 'Renewable Energy Focus',
                type: 'checkbox',
                required: false,
                description: 'Types of renewable energy the solution addresses',
                options: ['Solar', 'Wind', 'Hydro', 'Geothermal', 'Biomass', 'All renewables'],
                examples: 'Solar y Wind son las más comunes en el mercado actual'
            },
            {
                id: 'grid_integration',
                name: 'Grid Integration',
                type: 'select',
                required: false,
                description: 'Grid integration requirements',
                options: ['On-grid', 'Off-grid', 'Hybrid', 'Microgrid', 'Not applicable'],
                examples: 'Hybrid y Microgrid son tendencias emergentes'
            },
            {
                id: 'potential_solutions',
                name: 'Potential Solutions',
                type: 'textarea',
                required: true,
                description: 'On your best knowledge, describe possible solutions and/or technologies that you estimate could solve the problem',
                examples: 'Incluir: BESS, Smart inverters, Grid management systems, Energy management software'
            },
            {
                id: 'regulatory_requirements',
                name: 'Regulatory Requirements',
                type: 'textarea',
                required: false,
                description: 'Specific regulatory requirements and certifications needed',
                examples: 'Incluir: Normativas de conexión, Certificaciones de seguridad, Estándares de calidad'
            },
            {
                id: 'applus_team',
                name: 'Applus Team',
                type: 'textarea',
                required: true,
                description: 'Indicate the people involved, name and position',
                examples: 'Incluir: Sponsor, Owner (main contact), Coordinator, Evaluators, Pilot Project Team'
            }
        ]
    }
};

// Global state
let currentTemplate = null;
let selectedFields = [];
let currentField = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplateSelection();
    initializeCustomizationPanel();
    initializeModal();
    initializeActions();
});

// Template Selection
function initializeTemplateSelection() {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            templateCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Get template type
            const templateType = this.dataset.template;
            currentTemplate = templates[templateType];
            
            // Show customization panel
            showCustomizationPanel();
            
            // Populate fields
            populateFields();
            
            // Enable continue button
            document.getElementById('continueBtn').disabled = false;
        });
    });
}

function showCustomizationPanel() {
    const panel = document.getElementById('customizationPanel');
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth' });
}

// Customization Panel
function initializeCustomizationPanel() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabName + 'Tab') {
                    content.classList.add('active');
                }
            });
            
            // Update content based on tab
            if (tabName === 'preview') {
                updatePreview();
            } else if (tabName === 'validation') {
                updateValidation();
            }
        });
    });
}

function populateFields() {
    if (!currentTemplate) return;
    
    const fieldList = document.getElementById('fieldList');
    fieldList.innerHTML = '';
    
    currentTemplate.fields.forEach(field => {
        const fieldElement = createFieldElement(field);
        fieldList.appendChild(fieldElement);
    });
    
    selectedFields = [...currentTemplate.fields];
}

function createFieldElement(field) {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'field-item';
    fieldDiv.dataset.fieldId = field.id;
    
    fieldDiv.innerHTML = `
        <div class="field-info">
            <div class="field-name">${field.name}</div>
            <div class="field-type">${getFieldTypeLabel(field.type)} ${field.required ? '(Obligatorio)' : '(Opcional)'}</div>
            ${field.examples ? `<div class="field-examples">💡 ${field.examples}</div>` : ''}
        </div>
        <div class="field-actions">
            <button class="field-action-btn" onclick="editField('${field.id}')" title="Editar">
                <i class="fas fa-edit"></i>
            </button>
            <button class="field-action-btn" onclick="deleteField('${field.id}')" title="Eliminar">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    fieldDiv.addEventListener('click', function(e) {
        if (!e.target.closest('.field-action-btn')) {
            selectField(field.id);
        }
    });
    
    return fieldDiv;
}

function getFieldTypeLabel(type) {
    const labels = {
        'text': 'Texto',
        'textarea': 'Área de texto',
        'select': 'Lista desplegable',
        'checkbox': 'Casillas',
        'number': 'Número',
        'date': 'Fecha'
    };
    return labels[type] || type;
}

function selectField(fieldId) {
    // Remove previous selection
    document.querySelectorAll('.field-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selection to clicked field
    const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`);
    fieldElement.classList.add('selected');
    
    // Set current field and show configuration
    currentField = selectedFields.find(f => f.id === fieldId);
    showFieldConfiguration();
}

function showFieldConfiguration() {
    const configDiv = document.getElementById('fieldConfig');
    
    if (!currentField) {
        configDiv.innerHTML = '<p class="placeholder">Selecciona un campo para configurarlo</p>';
        return;
    }
    
    configDiv.innerHTML = `
        <form class="config-form" id="fieldConfigForm">
            <div class="form-group">
                <label for="configName">Nombre del Campo</label>
                <input type="text" id="configName" value="${currentField.name}" required>
            </div>
            <div class="form-group">
                <label for="configType">Tipo de Campo</label>
                <select id="configType" required>
                    <option value="text" ${currentField.type === 'text' ? 'selected' : ''}>Texto</option>
                    <option value="textarea" ${currentField.type === 'textarea' ? 'selected' : ''}>Área de Texto</option>
                    <option value="select" ${currentField.type === 'select' ? 'selected' : ''}>Lista Desplegable</option>
                    <option value="checkbox" ${currentField.type === 'checkbox' ? 'selected' : ''}>Casillas de Verificación</option>
                    <option value="number" ${currentField.type === 'number' ? 'selected' : ''}>Número</option>
                    <option value="date" ${currentField.type === 'date' ? 'selected' : ''}>Fecha</option>
                </select>
            </div>
            <div class="form-group">
                <label for="configDescription">Descripción</label>
                <textarea id="configDescription" rows="3">${currentField.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="configExamples">Ejemplos/Pistas</label>
                <textarea id="configExamples" rows="2">${currentField.examples || ''}</textarea>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="configRequired" ${currentField.required ? 'checked' : ''}> Campo obligatorio
                </label>
            </div>
            ${currentField.options ? `
            <div class="form-group">
                <label for="configOptions">Opciones (una por línea)</label>
                <textarea id="configOptions" rows="4">${currentField.options.join('\n')}</textarea>
            </div>
            ` : ''}
            <div class="form-group">
                <button type="button" class="btn btn-primary" onclick="saveFieldConfiguration()">Guardar Cambios</button>
            </div>
        </form>
    `;
}

function saveFieldConfiguration() {
    if (!currentField) return;
    
    const name = document.getElementById('configName').value;
    const type = document.getElementById('configType').value;
    const description = document.getElementById('configDescription').value;
    const examples = document.getElementById('configExamples').value;
    const required = document.getElementById('configRequired').checked;
    const options = document.getElementById('configOptions') ? 
        document.getElementById('configOptions').value.split('\n').filter(o => o.trim()) : 
        undefined;
    
    // Update field
    currentField.name = name;
    currentField.type = type;
    currentField.description = description;
    currentField.examples = examples;
    currentField.required = required;
    if (options) currentField.options = options;
    
    // Update field in selectedFields
    const fieldIndex = selectedFields.findIndex(f => f.id === currentField.id);
    if (fieldIndex !== -1) {
        selectedFields[fieldIndex] = { ...currentField };
    }
    
    // Refresh field list
    populateFields();
    
    // Re-select the field
    selectField(currentField.id);
    
    // Enable save button
    document.getElementById('saveTemplateBtn').disabled = false;
}

function editField(fieldId) {
    selectField(fieldId);
}

function deleteField(fieldId) {
    if (confirm('¿Estás seguro de que quieres eliminar este campo?')) {
        selectedFields = selectedFields.filter(f => f.id !== fieldId);
        populateFields();
        document.getElementById('fieldConfig').innerHTML = '<p class="placeholder">Selecciona un campo para configurarlo</p>';
        currentField = null;
        document.getElementById('saveTemplateBtn').disabled = false;
    }
}

// Modal for adding new fields
function initializeModal() {
    const modal = document.getElementById('addFieldModal');
    const addFieldBtn = document.getElementById('addFieldBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelAddFieldBtn');
    const confirmBtn = document.getElementById('confirmAddFieldBtn');
    
    addFieldBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });
    
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    confirmBtn.addEventListener('click', addNewField);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('addFieldModal');
    modal.classList.remove('show');
    document.getElementById('addFieldForm').reset();
}

function addNewField() {
    const name = document.getElementById('fieldName').value;
    const type = document.getElementById('fieldType').value;
    const description = document.getElementById('fieldDescription').value;
    const required = document.getElementById('fieldRequired').checked;
    
    if (!name.trim()) {
        alert('Por favor, introduce un nombre para el campo');
        return;
    }
    
    const newField = {
        id: 'custom_' + Date.now(),
        name: name,
        type: type,
        description: description,
        required: required
    };
    
    if (type === 'select' || type === 'checkbox') {
        newField.options = ['Opción 1', 'Opción 2', 'Opción 3'];
    }
    
    selectedFields.push(newField);
    populateFields();
    closeModal();
    document.getElementById('saveTemplateBtn').disabled = false;
}

// Preview functionality
function updatePreview() {
    const previewDiv = document.getElementById('formPreview');
    
    let previewHTML = '<form class="preview-form">';
    
    selectedFields.forEach(field => {
        previewHTML += `
            <div class="preview-field">
                <label for="preview_${field.id}">${field.name} ${field.required ? '*' : ''}</label>
                ${field.examples ? `<div class="preview-examples">💡 ${field.examples}</div>` : ''}
                ${generateFieldHTML(field)}
            </div>
        `;
    });
    
    previewHTML += '</form>';
    
    previewDiv.innerHTML = previewHTML;
}

function generateFieldHTML(field) {
    const fieldId = `preview_${field.id}`;
    
    switch (field.type) {
        case 'text':
            return `<input type="text" id="${fieldId}" placeholder="${field.description}">`;
        case 'textarea':
            return `<textarea id="${fieldId}" rows="3" placeholder="${field.description}"></textarea>`;
        case 'select':
            let selectHTML = `<select id="${fieldId}">`;
            if (field.options) {
                field.options.forEach(option => {
                    selectHTML += `<option value="${option}">${option}</option>`;
                });
            }
            selectHTML += '</select>';
            return selectHTML;
        case 'checkbox':
            let checkboxHTML = '';
            if (field.options) {
                field.options.forEach((option, index) => {
                    checkboxHTML += `
                        <label>
                            <input type="checkbox" name="${fieldId}" value="${option}">
                            ${option}
                        </label>
                    `;
                });
            }
            return checkboxHTML;
        case 'number':
            return `<input type="number" id="${fieldId}" placeholder="${field.description}">`;
        case 'date':
            return `<input type="date" id="${fieldId}">`;
        default:
            return `<input type="text" id="${fieldId}" placeholder="${field.description}">`;
    }
}

// Validation functionality
function updateValidation() {
    const requiredFieldsDiv = document.getElementById('requiredFields');
    const specificValidationsDiv = document.getElementById('specificValidations');
    
    // Required fields
    const requiredFields = selectedFields.filter(f => f.required);
    requiredFieldsDiv.innerHTML = requiredFields.map(field => 
        `<div class="validation-item">✓ ${field.name}</div>`
    ).join('');
    
    // Specific validations
    const validations = [];
    selectedFields.forEach(field => {
        if (field.type === 'number') {
            validations.push(`• ${field.name}: Debe ser un número válido`);
        }
        if (field.type === 'date') {
            validations.push(`• ${field.name}: Debe ser una fecha válida`);
        }
        if (field.options && field.options.length > 0) {
            validations.push(`• ${field.name}: Debe seleccionar una opción válida`);
        }
    });
    
    specificValidationsDiv.innerHTML = validations.map(v => 
        `<div class="validation-item">${v}</div>`
    ).join('');
}

// Actions
function initializeActions() {
    document.getElementById('resetBtn').addEventListener('click', resetForm);
    document.getElementById('saveTemplateBtn').addEventListener('click', saveTemplate);
    document.getElementById('continueBtn').addEventListener('click', continueToNextStep);
}

function resetForm() {
    if (confirm('¿Estás seguro de que quieres reiniciar? Se perderán todos los cambios.')) {
        // Reset template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Hide customization panel
        document.getElementById('customizationPanel').style.display = 'none';
        
        // Reset state
        currentTemplate = null;
        selectedFields = [];
        currentField = null;
        
        // Disable buttons
        document.getElementById('saveTemplateBtn').disabled = true;
        document.getElementById('continueBtn').disabled = true;
    }
}

function saveTemplate() {
    const templateData = {
        name: currentTemplate.name,
        description: currentTemplate.description,
        fields: selectedFields,
        timestamp: new Date().toISOString()
    };
    
    // In a real application, this would save to a backend
    console.log('Saving template:', templateData);
    
    // For demo purposes, download as JSON
    const dataStr = JSON.stringify(templateData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `template_${currentTemplate.name.toLowerCase().replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Plantilla guardada exitosamente');
}

function continueToNextStep() {
    // In a real application, this would navigate to the next step
    alert('Continuando al Paso B: Respuesta por Parte de la Unidad de Negocio');
    
    // For demo purposes, show the generated form
    const formData = {
        template: currentTemplate.name,
        fields: selectedFields,
        timestamp: new Date().toISOString()
    };
    
    console.log('Generated form data for next step:', formData);
}
