// Function to parse JSON template and extract fields
async function parseJsonTemplate() {
    try {
        console.log('Attempting to fetch JSON file...');
        const response = await fetch('A+ Template_CHALLENGE REQUEST 3.json');
        
        if (!response.ok) {
            console.error('Failed to fetch JSON file:', response.status, response.statusText);
            return [];
        }
        
        const jsonData = await response.json();
        console.log('JSON file loaded successfully');
        console.log('Template metadata:', jsonData.metadata);
        console.log('Number of fields:', jsonData.fields.length);
        
        // Convert JSON fields to the format expected by the UI
        const fields = jsonData.fields.map(field => ({
            id: field.id,
            name: field.name,
            type: field.type,
            required: field.required,
            description: field.description,
            examples: field.examples.join('\n')
        }));
        
        console.log('Converted fields:', fields);
        return fields;
    } catch (error) {
        console.error('Error parsing JSON template:', error);
        return [];
    }
}

// Generic JSON parser for template files
async function parseJsonFile(filePath) {
    try {
        console.log(`Attempting to fetch JSON file: ${filePath}`);
        const response = await fetch(filePath);
        
        if (!response.ok) {
            console.error('Failed to fetch JSON file:', response.status, response.statusText);
            return [];
        }
        
        const jsonData = await response.json();
        console.log('JSON file loaded successfully');
        if (jsonData.metadata) console.log('Template metadata:', jsonData.metadata);
        if (jsonData.fields) console.log('Number of fields:', jsonData.fields.length);
        
        // Convert JSON fields to the format expected by the UI
        const fields = (jsonData.fields || []).map(field => ({
            id: field.id,
            name: field.name,
            type: field.type,
            required: field.required,
            description: field.description,
            examples: Array.isArray(field.examples) ? field.examples.join('\n') : field.examples,
            options: field.options
        }));
        
        return fields;
    } catch (error) {
        console.error('Error parsing JSON template:', error);
        return [];
    }
}

// Function to determine field type based on content
function determineFieldType(field) {
    const name = field.name.toLowerCase();
    const id = field.id.toLowerCase();
    
    // Text fields (short inputs)
    if (name.includes('headline') || name.includes('title')) {
        return 'text';
    }
    
    // Number fields
    if (name.includes('number') || name.includes('startups') || name.includes('cantidad')) {
        return 'number';
    }
    
    // Date fields
    if (name.includes('date') || name.includes('fecha')) {
        return 'date';
    }
    
    // Email fields
    if (name.includes('email') || name.includes('correo')) {
        return 'email';
    }
    
    // Default to textarea for longer content
    return 'textarea';
}

// Template definitions
const templates = {
    standard: {
        name: 'Plantilla Estándar',
        description: 'Plantilla base de Repsol con todos los campos estándar del Challenge Request',
        fields: [], // Will be populated dynamically from markdown
    },
    automotive: {
        name: 'Economía circular',
        description: 'Tecnologías para combustibles renovables, captura de CO2, hidrógeno renovable y materiales circulares',
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
                name: 'Repsol Team',
                type: 'textarea',
                required: true,
                description: 'Indicate the people involved, name and position',
                examples: 'Incluir: Sponsor, Owner (main contact), Coordinator, Evaluators, Pilot Project Team'
            }
        ]
    },
    drones: {
        name: 'Movilidad y generación renovable',
        description: 'Descarbonización del transporte con nuevos combustibles y lubricantes, y gestión energética eficiente',
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
                name: 'Repsol Team',
                type: 'textarea',
                required: true,
                description: 'Indicate the people involved, name and position',
                examples: 'Incluir: Sponsor, Owner (main contact), Coordinator, Evaluators, Pilot Project Team'
            }
        ]
    },
    energy: {
        name: 'Optimización de activos',
        description: 'Uso de computación cuántica, modelización y robótica para eficiencia industrial',
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
                examples: 'Utility scale y Grid level son los más relevantes para Repsol'
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
                name: 'Repsol Team',
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
document.addEventListener('DOMContentLoaded', async function() {
    // Ensure all steps are hidden initially
    hideAllSteps();
    
    // Load standard template from JSON
    await loadStandardTemplate();
    // Load Economy Circular template from JSON (if available)
    await loadEconomyCircularTemplate();
    
    // Initialize everything after template is loaded
    initializeTemplateSelection();
    initializeCustomizationPanel();
    initializeModal();
    initializeActions();
    
    // Password gate: lock until correct password is provided
    initializePasswordGate();

    // Show loading complete message
    console.log('Application initialized successfully');
    console.log('Available templates:', Object.keys(templates));
    console.log('Standard template fields count:', templates.standard.fields.length);
});

// Function to hide all steps initially
function hideAllSteps() {
    const steps = ['step-a', 'step-b', 'step-c', 'step-d'];
    steps.forEach(stepId => {
        const stepElement = document.getElementById(stepId);
        if (stepElement) {
            stepElement.style.display = 'none';
        }
    });
    
    // Show only step A initially
    const stepA = document.getElementById('step-a');
    if (stepA) {
        stepA.style.display = 'block';
    }
}

// Load standard template from JSON file
async function loadStandardTemplate() {
    try {
        console.log('Loading standard template from JSON...');
        const fields = await parseJsonTemplate();
        templates.standard.fields = fields;
        console.log('Standard template loaded from JSON:', fields);
        console.log('Template object after loading:', templates.standard);
    } catch (error) {
        console.error('Error loading standard template:', error);
        // Fallback to empty fields if JSON loading fails
        templates.standard.fields = [];
    }
}

// Load Economy Circular template from JSON file
async function loadEconomyCircularTemplate() {
    try {
        console.log('Loading Economy Circular template from JSON...');
        const fields = await parseJsonFile('economia_circular.json');
        if (Array.isArray(fields) && fields.length > 0) {
            templates.automotive.fields = fields;
            console.log('Economy Circular template loaded from JSON:', fields.length);
        } else {
            console.warn('Economy Circular JSON returned no fields; keeping existing static fields');
        }
    } catch (error) {
        console.error('Error loading Economy Circular template:', error);
    }
}

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
            
            // Update validation
            updateValidation();
            
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
    if (!currentTemplate) {
        console.log('No current template selected');
        return;
    }
    
    console.log('Populating fields for template:', currentTemplate.name);
    console.log('Template fields:', currentTemplate.fields);
    
    const fieldList = document.getElementById('fieldList');
    if (!fieldList) {
        console.log('Field list element not found');
        return;
    }
    
    fieldList.innerHTML = '';
    
    if (!currentTemplate.fields || currentTemplate.fields.length === 0) {
        console.log('No fields to populate');
        fieldList.innerHTML = '<p class="text-applus-gray-400 text-center py-4">No hay campos disponibles para este template.</p>';
        return;
    }
    
    currentTemplate.fields.forEach(field => {
        const fieldElement = createFieldElement(field);
        fieldList.appendChild(fieldElement);
    });
    
    selectedFields = [...currentTemplate.fields];
    console.log('Fields populated successfully:', selectedFields.length);
}

function createFieldElement(field) {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'list-item';
    fieldDiv.dataset.fieldId = field.id;
    
    fieldDiv.innerHTML = `
        <div class="flex-1">
            <div class="font-semibold mb-1 text-applus-gray-600">${field.name}</div>
            <div class="text-sm text-applus-gray-400">${getFieldTypeLabel(field.type)} ${field.required ? '(Obligatorio)' : '(Opcional)'}</div>
            ${field.examples ? `<div class="field-examples">💡 ${field.examples}</div>` : ''}
        </div>
        <div class="flex gap-1">
            <button class="p-1 border-none cursor-pointer rounded transition-all duration-300 hover:bg-applus-gray-200" onclick="editField('${field.id}')" title="Editar">
                <i class="fas fa-edit text-applus-gray-400"></i>
            </button>
            <button class="p-1 border-none cursor-pointer rounded transition-all duration-300 hover:bg-applus-gray-200" onclick="deleteField('${field.id}')" title="Eliminar">
                <i class="fas fa-trash text-applus-gray-400"></i>
            </button>
        </div>
    `;
    
    fieldDiv.addEventListener('click', function(e) {
        if (!e.target.closest('button')) {
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
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add selection to clicked field
    const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`);
    fieldElement.classList.add('active');
    
    // Set current field and show configuration
    currentField = selectedFields.find(f => f.id === fieldId);
    showFieldConfiguration();
}

function showFieldConfiguration() {
    const configDiv = document.getElementById('fieldConfig');
    
    if (!currentField) {
        configDiv.innerHTML = '<p class="text-applus-gray-400 italic text-center py-10">Selecciona un campo para configurarlo</p>';
        return;
    }
    
    configDiv.innerHTML = `
        <form class="space-y-4" id="fieldConfigForm">
            <div class="flex flex-col gap-2">
                <label for="configName" class="font-medium text-applus-gray-700">Nombre del Campo</label>
                <input type="text" id="configName" value="${currentField.name}" required class="form-input">
            </div>
            <div class="flex flex-col gap-2">
                <label for="configType" class="font-medium text-applus-gray-700">Tipo de Campo</label>
                <select id="configType" required class="form-select">
                    <option value="text" ${currentField.type === 'text' ? 'selected' : ''}>Texto</option>
                    <option value="textarea" ${currentField.type === 'textarea' ? 'selected' : ''}>Área de Texto</option>
                    <option value="select" ${currentField.type === 'select' ? 'selected' : ''}>Lista Desplegable</option>
                    <option value="checkbox" ${currentField.type === 'checkbox' ? 'selected' : ''}>Casillas de Verificación</option>
                    <option value="number" ${currentField.type === 'number' ? 'selected' : ''}>Número</option>
                    <option value="date" ${currentField.type === 'date' ? 'selected' : ''}>Fecha</option>
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <label for="configDescription" class="font-medium text-applus-gray-700">Descripción</label>
                <textarea id="configDescription" rows="3" class="form-textarea">${currentField.description || ''}</textarea>
            </div>
            <div class="flex flex-col gap-2">
                <label for="configExamples" class="font-medium text-applus-gray-700">Ejemplos/Pistas</label>
                <textarea id="configExamples" rows="2" class="form-textarea">${currentField.examples || ''}</textarea>
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" id="configRequired" ${currentField.required ? 'checked' : ''} class="rounded border-applus-gray-300 text-applus-orange focus:ring-applus-orange">
                <label for="configRequired" class="font-medium text-applus-gray-700">Campo obligatorio</label>
            </div>
            ${currentField.options ? `
            <div class="flex flex-col gap-2">
                <label for="configOptions" class="font-medium text-applus-gray-700">Opciones (una por línea)</label>
                <textarea id="configOptions" rows="4" class="form-textarea">${currentField.options.join('\n')}</textarea>
            </div>
            ` : ''}
            <div class="flex flex-col gap-2">
                <button type="button" class="btn-applus-primary" onclick="saveFieldConfiguration()">Guardar Cambios</button>
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
    
    // Update validation
    updateValidation();
    
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
        updateValidation();
        document.getElementById('fieldConfig').innerHTML = '<p class="text-applus-gray-400 italic text-center py-10">Selecciona un campo para configurarlo</p>';
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
        modal.style.display = 'flex';
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
    modal.style.display = 'none';
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
    updateValidation();
    closeModal();
    document.getElementById('saveTemplateBtn').disabled = false;
}

// Preview functionality
function updatePreview() {
    const previewDiv = document.getElementById('formPreview');
    
    let previewHTML = '<form class="space-y-5">';
    
    selectedFields.forEach(field => {
        previewHTML += `
            <div class="flex flex-col gap-2">
                <label for="preview_${field.id}" class="font-medium text-applus-gray-700">${field.name} ${field.required ? '*' : ''}</label>
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
            return `<input type="text" id="${fieldId}" placeholder="${field.description}" class="form-input">`;
        case 'textarea':
            return `<textarea id="${fieldId}" rows="3" placeholder="${field.description}" class="form-textarea"></textarea>`;
        case 'select':
            let selectHTML = `<select id="${fieldId}" class="form-select">`;
            if (field.options) {
                field.options.forEach(option => {
                    selectHTML += `<option value="${option}">${option}</option>`;
                });
            }
            selectHTML += '</select>';
            return selectHTML;
        case 'checkbox':
            let checkboxHTML = '<div class="space-y-2">';
            if (field.options) {
                field.options.forEach((option, index) => {
                    checkboxHTML += `
                        <label class="flex items-center gap-2">
                            <input type="checkbox" name="${fieldId}" value="${option}" class="rounded border-applus-gray-300 text-applus-orange focus:ring-applus-orange">
                            <span class="text-sm text-applus-gray-600">${option}</span>
                        </label>
                    `;
                });
            }
            checkboxHTML += '</div>';
            return checkboxHTML;
        case 'number':
            return `<input type="number" id="${fieldId}" placeholder="${field.description}" class="form-input">`;
        case 'date':
            return `<input type="date" id="${fieldId}" class="form-input">`;
        default:
            return `<input type="text" id="${fieldId}" placeholder="${field.description}" class="form-input">`;
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
}

function continueToNextStep() {
    // Hide current step content
    const templateSelection = document.querySelector('.template-selection');
    const customizationPanel = document.getElementById('customizationPanel');
    const actionsSection = document.querySelector('.flex.justify-between.items-center.mt-10.pt-8.border-t-2.border-applus-gray-200');
    const stepB = document.getElementById('step-b');
    
    if (templateSelection) templateSelection.style.display = 'none';
    if (customizationPanel) customizationPanel.style.display = 'none';
    if (actionsSection) actionsSection.style.display = 'none';
    
    // Show step B
    if (stepB) stepB.style.display = 'block';
    
    // Update step indicators
    updateStepIndicators('B');
    
    // Update header phase indicator
    updateHeaderPhase('B');
    
    // Initialize step B functionality
    initializeStepB();
    
    console.log('Navigated to Step B');
}

// Keeping for backward compatibility - now handled directly in each step file
function updateStepIndicators(activeStep) {
    // This function is kept for backward compatibility
    // Each step file now updates the indicator directly
}

function updateHeaderPhase(step) {
    // This function is now handled by updateStepIndicators
    // Keeping for backward compatibility
}

// Initialize step indicator on page load
document.addEventListener('DOMContentLoaded', function() {
    const stepIndicator = document.getElementById('current-step-indicator');
    if (stepIndicator) {
        stepIndicator.textContent = 'Paso A: Personalización';
    }
});

// ---------------- Password Gate ----------------
function initializePasswordGate() {
    const PASSWORD = 'Scouting8656$$';
    const modal = document.getElementById('passwordModal');
    const input = document.getElementById('accessPassword');
    const submitBtn = document.getElementById('passwordSubmitBtn');
    const errorMsg = document.getElementById('passwordError');

    if (!modal || !input || !submitBtn) {
        return;
    }

    // If already validated in this session, skip
    const unlocked = sessionStorage.getItem('scouting_unlocked');
    if (unlocked === 'true') {
        unlockApp(modal);
        return;
    }

    document.body.classList.add('locked');
    modal.style.display = 'flex';

    const validate = () => {
        const value = input.value || '';
        if (value === PASSWORD) {
            sessionStorage.setItem('scouting_unlocked', 'true');
            unlockApp(modal);
        } else {
            if (errorMsg) errorMsg.style.display = 'block';
            input.value = '';
            input.focus();
        }
    };

    submitBtn.addEventListener('click', validate);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            validate();
        }
    });
}

function unlockApp(modal) {
    document.body.classList.remove('locked');
    if (modal) modal.style.display = 'none';
}

function initializeStepB() {
    // This function will be called when step-b.js is loaded
    if (typeof initializeStepBContent === 'function') {
        initializeStepBContent();
    }
}
