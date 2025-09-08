(function() {
// Paso E–K: Render de extracción con simulación de tiempo real (demo)
let extractionData = null;

async function loadExtractionData() {
    try {
        const res = await fetch('files/extraction_E_to_K.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        extractionData = await res.json();
        return extractionData;
    } catch (e) {
        console.error('Error cargando extraction_E_to_K.json', e);
        return null;
    }
}

function showStepE() {
    const stepE = document.getElementById('step-e');
    if (stepE) stepE.style.display = 'block';
    const stepIndicator = document.getElementById('current-step-indicator');
    if (stepIndicator) stepIndicator.textContent = 'Paso E–K: Extracción';
    stepE.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function backToStepD() {
    const stepE = document.getElementById('step-e');
    const stepD = document.getElementById('step-d');
    if (stepE) stepE.style.display = 'none';
    if (stepD) stepD.style.display = 'block';
    const stepIndicator = document.getElementById('current-step-indicator');
    if (stepIndicator) stepIndicator.textContent = 'Paso D: Entrevista';
}

function setProgress(pct, label) {
    const bar = document.getElementById('ek-progress-bar');
    const text = document.getElementById('ek-progress-label');
    if (bar) bar.style.width = `${pct}%`;
    if (text) text.textContent = label || '';
}

function buildTimeline(order) {
    const container = document.getElementById('ek-timeline');
    if (!container) return;
    // Reset
    container.innerHTML = '';
    // Wrapper
    const wrap = document.createElement('div');
    wrap.className = 'flex items-center gap-3 overflow-x-auto';
    order.forEach((key, idx) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-2';
        item.innerHTML = `
            <div data-ek="${key}" class="step flex flex-col items-center gap-1 opacity-40 transition-all duration-300" title="${stepDesc(key)}">
                <div class="step-number">${key}</div>
                <div class="text-xs text-center text-applus-gray-400 step-label font-medium">${stepLabel(key)}</div>
            </div>
            ${idx < order.length-1 ? '<div class="w-8 h-0.5 bg-applus-gray-200"></div>' : ''}
        `;
        wrap.appendChild(item);
    });
    container.appendChild(wrap);
}

function stepLabel(k) {
    const map = { E: 'Etiquetar', F: 'Desambiguar', G: 'PICOC', H: 'TRL/Tiempos', I: 'MoSCoW', J: 'Pregunta', K: 'Ficha búsqueda' };
    return map[k] || k;
}

function stepDesc(k) {
    const map = {
        E: 'Etiquetar slots: contexto, KPIs, restricciones, geos y actores',
        F: 'Aclarar términos críticos: regulación, acrónimos y conceptos',
        G: 'Definir PICOC y HMW para acotar la pregunta',
        H: 'Fijar TRL mínimo y tiempos del piloto',
        I: 'Priorizar con MoSCoW (must/should/could/won’t)',
        J: 'Redactar la pregunta operativa (1 frase)',
        K: 'Construir la ficha de búsqueda para APIs y web'
    };
    return map[k] || '';
}

function activateTimelineStep(k) {
    const steps = document.querySelectorAll('#ek-timeline .step');
    steps.forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0.4';
        const label = s.querySelector('.step-label');
        if (label) {
            label.classList.remove('text-applus-orange', 'font-semibold');
            label.classList.add('text-applus-gray-400', 'font-medium');
        }
    });
    const current = document.querySelector(`#ek-timeline [data-ek="${k}"]`);
    if (current) {
        current.classList.add('active');
        current.style.opacity = '1';
        const number = current.querySelector('.step-number');
        if (number) {
            number.style.backgroundColor = '#FF8C00';
            number.style.borderColor = '#FF8C00';
            number.style.color = '#fff';
        }
        const label = current.querySelector('.step-label');
        if (label) {
            label.classList.add('text-applus-orange', 'font-semibold');
            label.classList.remove('text-applus-gray-400', 'font-medium');
        }
    }
}

function renderStepCard(stepKey, stepData) {
    const container = document.createElement('div');
    container.className = 'bg-white rounded-lg p-5 border border-applus-gray-200 shadow-applus';
    const title = stepData.title || `Paso ${stepKey}`;
    let inner = `<h3 class="text-applus-gray-600 text-xl font-semibold mb-1">${title}</h3>`;
    inner += `<div class="text-applus-gray-400 text-xs mb-3">${stepDesc(stepKey)}</div>`;

    if (stepKey === 'E' && stepData.slots) {
        inner += `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 class="text-applus-gray-700 font-semibold mb-2">Contexto/uso</h4>
                    <ul class="ml-5 list-disc space-y-1">${(stepData.slots.context_use||[]).map(i=>`<li>${i}</li>`).join('')}</ul>
                </div>
                <div>
                    <h4 class="text-applus-gray-700 font-semibold mb-2">Resultado/KPIs</h4>
                    <ul class="ml-5 list-disc space-y-1">${Object.entries(stepData.slots.outcomes_kpis||{}).map(([k,v])=>`<li><strong>${k}</strong>: ${v}</li>`).join('')}</ul>
                </div>
                <div>
                    <h4 class="text-applus-gray-700 font-semibold mb-2">Restricciones</h4>
                    <ul class="ml-5 list-disc space-y-1">${(stepData.slots.constraints||[]).map(i=>`<li>${i}</li>`).join('')}</ul>
                </div>
                <div>
                    <h4 class="text-applus-gray-700 font-semibold mb-2">Geografía</h4>
                    <div class="text-sm">
                        <div><strong>Piloto</strong>: ${(stepData.slots.geography&&stepData.slots.geography.pilot_phase||[]).join(', ')}</div>
                        <div><strong>Despliegue</strong>: ${(stepData.slots.geography&&stepData.slots.geography.initial_deploy||[]).join(', ')}</div>
                        <div><strong>Espejo</strong>: ${(stepData.slots.geography&&stepData.slots.geography.mirror_pilot_plan_b||[]).join(', ')}</div>
                    </div>
                </div>
                <div>
                    <h4 class="text-applus-gray-700 font-semibold mb-2">Actores objetivo</h4>
                    <ul class="ml-5 list-disc space-y-1">${(stepData.slots.target_actors||[]).map(i=>`<li>${i}</li>`).join('')}</ul>
                </div>
                <div>
                    <h4 class="text-applus-gray-700 font-semibold mb-2">Madurez y tiempos</h4>
                    <ul class="ml-5 list-disc space-y-1">
                        <li><strong>TRL plataforma/C2</strong>: ${(stepData.slots.maturity_timing&&stepData.slots.maturity_timing.trl_platform_c2)||''}</li>
                        <li><strong>TRL DAA</strong>: ${(stepData.slots.maturity_timing&&stepData.slots.maturity_timing.trl_daa_autonomy)||''}</li>
                        <li><strong>Ventana piloto Iberia</strong>: ${(stepData.slots.maturity_timing&&stepData.slots.maturity_timing.pilot_window_iberia)||''}</li>
                        <li><strong>Ventana alternativa</strong>: ${(stepData.slots.maturity_timing&&stepData.slots.maturity_timing.alt_window_latam)||''}</li>
                    </ul>
                </div>
            </div>`;
    } else if (stepKey === 'F') {
        inner += `<ul class="ml-5 list-disc space-y-1">${(stepData.terms||[]).map(t=>`<li><strong>${t.term}</strong>: ${t.definition}</li>`).join('')}</ul>`;
    } else if (stepKey === 'G') {
        const p = stepData.picoc||{};
        inner += `
            <div class="space-y-2 text-sm">
                <div><strong>P</strong>: ${p.population_context||''}</div>
                <div><strong>I</strong>: ${p.intervention||''}</div>
                <div><strong>C</strong>: ${p.comparison||''}</div>
                <div><strong>O</strong>: ${p.outcome||''}</div>
                <div><strong>C</strong>: ${p.context||''}</div>
                <div class="mt-2"><strong>HMW</strong>: ${stepData.hmw||''}</div>
            </div>`;
    } else if (stepKey === 'H') {
        const trl = stepData.trl||{}; const tml = stepData.timelines||{};
        inner += `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 class="text-applus-gray-700 font-semibold mb-2">TRL mínimos</h4>
                    <ul class="ml-5 list-disc space-y-1">
                        <li>Plataforma/C2: ${trl.platform_c2||''}</li>
                        <li>DAA/Autonomía: ${trl.daa_autonomy||''}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-applus-gray-700 font-semibold mb-2">Tiempos</h4>
                    <ul class="ml-5 list-disc space-y-1">
                        <li>Evaluación/Shortlist: ${tml.evaluation_shortlist||''}</li>
                        <li>Autorización/SORA: ${tml.authorization_sora||''}</li>
                        <li>Piloto Iberia: ${tml.pilot_window_iberia||''}</li>
                        <li>Alternativa LatAm: ${tml.alt_mirror_latam||''}</li>
                    </ul>
                </div>
            </div>`;
    } else if (stepKey === 'I') {
        const m = (stepData.moscow)||{};
        const block = (label, arr)=>`<div><h4 class="text-applus-gray-700 font-semibold mb-2">${label}</h4><ul class="ml-5 list-disc space-y-1">${(arr||[]).map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
        inner += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">${block('Must', m.must)}${block('Should', m.should)}${block('Could', m.could)}${block("Won’t", m.wont)}</div>`;
    } else if (stepKey === 'J') {
        inner += `<div class="bg-applus-gray-50 p-4 rounded border text-sm border-l-4 border-applus-orange">${stepData.research_question||''}</div>`;
    } else if (stepKey === 'K') {
        const s = stepData.search_sheet||{};
        inner += `
            <div class="space-y-3 text-sm bg-applus-gray-50 p-4 rounded border border-l-4 border-applus-orange">
                <div><strong>Contexto/uso</strong>: ${s.context_use||''}</div>
                <div><strong>KPIs</strong>: ${(s.outcomes_kpis||[]).join('; ')}</div>
                <div><strong>Must</strong>: <ul class="ml-5 list-disc">${(s.constraints_must||[]).map(i=>`<li>${i}</li>`).join('')}</ul></div>
                <div><strong>Geografía</strong>: Prioridad ${(s.geography&&s.geography.priority||[]).join(', ')}; Extensión ${(s.geography&&s.geography.extend||[]).join(', ')}; Espejo ${(s.geography&&s.geography.mirror||[]).join(', ')}</div>
                <div><strong>Actores</strong>: ${(s.target_actors||[]).join('; ')}</div>
                <div><strong>Madurez/tiempos</strong>: TRL plataforma/C2 ${s.maturity_timing&&s.maturity_timing.trl_platform_c2||''}; TRL DAA ${s.maturity_timing&&s.maturity_timing.trl_daa||''}; Ventana ${s.maturity_timing&&s.maturity_timing.pilot_window||''}</div>
                <div><strong>Señales</strong>: ${(s.market_signals||[]).join('; ')}</div>
                <div><strong>Taxonomía</strong>: ${(s.taxonomy&&s.taxonomy.categories||[]).join(', ')}<br><strong>Keywords</strong>: ${(s.taxonomy&&s.taxonomy.keywords||[]).join(', ')}</div>
                <div><strong>Evidencia web</strong>: ${(s.evidence_keywords||[]).join('; ')}</div>
                <div><strong>Incluir</strong>: <ul class="ml-5 list-disc">${(s.inclusion_criteria||[]).map(i=>`<li>${i}</li>`).join('')}</ul></div>
                <div><strong>Excluir</strong>: <ul class="ml-5 list-disc">${(s.exclusion_criteria||[]).map(i=>`<li>${i}</li>`).join('')}</ul></div>
                <div><strong>APIs</strong>:
                    <div class="mt-2"><em>Crunchbase</em>: ${s.api_compilation&&s.api_compilation.crunchbase&&s.api_compilation.crunchbase.hint||''}. Campos: ${(s.api_compilation&&s.api_compilation.crunchbase&&s.api_compilation.crunchbase.request_fields||[]).join(', ')}</div>
                    <div class="mt-1"><em>PitchBook</em>: ${s.api_compilation&&s.api_compilation.pitchbook&&s.api_compilation.pitchbook.hint||''}. Entidades: ${(s.api_compilation&&s.api_compilation.pitchbook&&s.api_compilation.pitchbook.entities||[]).join(', ')}</div>
                </div>
            </div>`;
    }

    container.innerHTML = inner;
    return container;
}

async function simulateRealtimeRender() {
    const content = document.getElementById('ek-content');
    if (!content || !extractionData) return;
    const order = extractionData.render_order || Object.keys(extractionData.steps||{});
    // Construir timeline
    buildTimeline(order);
    const total = order.length;
    let done = 0;

    for (const key of order) {
        const step = extractionData.steps[key];
        setProgress(Math.round((done/total)*100), `Procesando Paso ${key}…`);
        activateTimelineStep(key);
        // Simular latencia
        // eslint-disable-next-line no-await-in-loop
        await new Promise(r => setTimeout(r, 500));
        const card = renderStepCard(key, step);
        content.appendChild(card);
        done += 1;
    }
    setProgress(100, 'Completado');
    activateTimelineStep(order[order.length-1]);
}

function initializeStepE() {
    showStepE();
    loadExtractionData().then(() => simulateRealtimeRender());
    const backBtn = document.getElementById('back-to-step-d-btn');
    if (backBtn) backBtn.addEventListener('click', backToStepD);
    const dlBtn = document.getElementById('download-ek-qs-btn');
    if (dlBtn) dlBtn.addEventListener('click', downloadQuestionAndSheet);
}

// Exponer para ser llamado desde Step D
window.initializeStepE = initializeStepE;
 
// Descargar pregunta operativa y ficha de búsqueda en Markdown
function downloadQuestionAndSheet() {
    if (!extractionData || !extractionData.steps) return;
    const j = extractionData.steps.J || {};
    const k = extractionData.steps.K || {};
    const s = k.search_sheet || {};
    const md = [
        '# Pregunta operativa y ficha de búsqueda',
        '',
        '## Pregunta operativa',
        j.research_question || '',
        '',
        '## Ficha de búsqueda',
        `- **Contexto/uso**: ${s.context_use || ''}`,
        `- **KPIs**: ${(s.outcomes_kpis||[]).join('; ')}`,
        `- **Must**: ${(s.constraints_must||[]).join(' | ')}`,
        `- **Geografía**: Prioridad ${(s.geography&&s.geography.priority||[]).join(', ')}; Extensión ${(s.geography&&s.geography.extend||[]).join(', ')}; Espejo ${(s.geography&&s.geography.mirror||[]).join(', ')}`,
        `- **Actores**: ${(s.target_actors||[]).join('; ')}`,
        `- **Madurez/tiempos**: TRL plataforma/C2 ${s.maturity_timing&&s.maturity_timing.trl_platform_c2||''}; TRL DAA ${s.maturity_timing&&s.maturity_timing.trl_daa||''}; Ventana ${s.maturity_timing&&s.maturity_timing.pilot_window||''}`,
        `- **Señales**: ${(s.market_signals||[]).join('; ')}`,
        `- **Taxonomía**: ${(s.taxonomy&&s.taxonomy.categories||[]).join(', ')}`,
        `- **Keywords**: ${(s.taxonomy&&s.taxonomy.keywords||[]).join(', ')}`,
        `- **Evidencia web**: ${(s.evidence_keywords||[]).join('; ')}`,
        `- **Incluir**: ${(s.inclusion_criteria||[]).join(' | ')}`,
        `- **Excluir**: ${(s.exclusion_criteria||[]).join(' | ')}`,
        `- **APIs (Crunchbase)**: ${(s.api_compilation&&s.api_compilation.crunchbase&&s.api_compilation.crunchbase.hint)||''}. Campos: ${(s.api_compilation&&s.api_compilation.crunchbase&&s.api_compilation.crunchbase.request_fields||[]).join(', ')}`,
        `- **APIs (PitchBook)**: ${(s.api_compilation&&s.api_compilation.pitchbook&&s.api_compilation.pitchbook.hint)||''}. Entidades: ${(s.api_compilation&&s.api_compilation.pitchbook&&s.api_compilation.pitchbook.entities||[]).join(', ')}`
    ].join('\n');
    const blob = new Blob([md], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pregunta_y_ficha_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
}
})();


