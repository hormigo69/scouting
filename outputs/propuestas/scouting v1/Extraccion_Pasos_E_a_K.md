## Procedimiento de Extracción (Pasos E→K) — BVLOS (Demo)

Origen: `code/files/Challenge request con ejemplo BVLOS.json`, `code/files/ai-review-bvlos.json`, `code/files/respuestas_final.json`

---

### Paso E: Leer y etiquetar el formulario
- **Contexto/uso**: Inspecciones industriales BVLOS (líneas eléctricas, oleoductos, eólica on/off‑shore; lineales de infraestructura, GIS/mapping, monitoreo ambiental)
- **Resultado/KPIs**: ≥60–100 km/día; −30% coste/km; 0 incidentes; re‑vuelo ≤5%; lead time −40%; ≥95% disponibilidad; ≥8/10 satisfacción cliente
- **Restricciones**: EASA 2019/947 Specific vía SORA/PDRA; DAA aceptable; C2 redundado; lost‑link validado; geocercas; logging/telemetría; manuales/mantenimiento; historial BVLOS o evidencia
- **Geografía**: Piloto ES (CLM/Aragón) y PT (Alentejo); despliegue ES/PT/sur de FR; espejo MX/CL
- **Actores**: Fabricantes UAS (helicóptero no tripulado, fixed‑wing VTOL), proveedores DAA/C2, integradores UE; startups/scaleups/OEM
- **Madurez/plazos**: TRL ≥8 (plataforma/C2), ≥7 (DAA); piloto feb–mar 2026 (Iberia) o dic 2025 (LatAm)
- **Señales**: actividad reciente, solvencia para piloto <12 semanas, referencias BVLOS
- **Fuentes**: Regulación EASA; SOPs/QA/QC; fichas de caso; benchmarking (NDA)

### Paso F: Desambiguar términos críticos
EASA 2019/947; SORA; PDRA; LUC; BVLOS; DAA; C2; RTK/PPK; MTOW/VTOL/fixed‑wing VTOL; AESA.

### Paso G: PICOC + HMW
- **P**: Inspecciones lineales y pruebas off‑shore en Iberia (UE)
- **I**: Plataformas BVLOS con DAA/C2/payloads modulares, RTK/PPK, SDK
- **C**: VLOS actual (8–12 km/día)
- **O**: ≥60–100 km/día; −30% coste/km; 0 incidentes; ≤5% re‑vuelo; −40% lead time; ≥95% disponibilidad
- **C**: Cumplimiento EASA vía SORA/PDRA; corredores rurales; AESA; soporte UE; piloto <12 semanas
- **HMW**: ¿Cómo multiplicar productividad reduciendo ≥30% coste/km con 0 incidentes y piloto en 3–6 meses?

### Paso H: TRL y tiempos
- **TRL**: Plataforma/C2 ≥8; DAA/autonomía ≥7
- **Tiempos**: Evaluación sep–oct 2025; autorización nov 2025–ene 2026; piloto feb–mar 2026 (Iberia); espejo dic 2025 (LatAm)

### Paso I: MoSCoW
- **Must**: SORA/PDRA; TRL 8/7; DAA; C2 redundado; lost‑link; geocercas; logging; autonomía/alcance mínimos; payloads críticos; soporte UE; piloto en ventana
- **Should**: Historial BVLOS; SDK/PPK/RTK; gimbal; entregas <12 semanas; TCO competitivo; modelo servicio; referencias energía/infra
- **Could**: Piloto espejo LatAm; analítica avanzada; acuerdos temporales; co‑desarrollo
- **Won’t**: No re‑contactar Swissdrones/UMS/Schiebel/UAVOS/ANAVIA antes de shortlist

### Paso J: Pregunta operativa
Para inspecciones lineales y off‑shore en Iberia (UE), ¿qué fabricantes de UAS y proveedores de DAA/C2 ofrecen plataformas BVLOS (helicóptero no tripulado o fixed‑wing VTOL) que permitan operar cumpliendo EASA Reg. (UE) 2019/947 mediante SORA, con TRL ≥8 (plataforma/C2) y ≥7 (DAA), aptas para piloto en feb–mar 2026, logrando ≥60–100 km/día y ≥−30% coste/km?

### Paso K: Ficha de búsqueda (APIs y web)
- **Contexto/uso**: Inspección BVLOS lineales y prueba off‑shore; Iberia
- **KPIs**: ≥60–100 km/día; −30% coste/km; 0 incidentes; ≤5% re‑vuelo; −40% lead time; ≥95% disponibilidad
- **Must**: EASA Specific vía SORA/PDRA; DAA; C2 redundado; lost‑link; geocercas; logging; manuales; soporte UE; piloto <12 semanas
- **Geos**: ES/PT (prioridad); FR (extensión); MX/CL (espejo)
- **Actores**: Startups/scaleups/OEM/integradores UAS; proveedores DAA/C2; integradores UE
- **Madurez y tiempos**: TRL 8/7; piloto feb–mar 2026
- **Señales**: actividad reciente; referencias utilities/infra; logística UE
- **Taxonomía**: UAVs/Drones/Aerospace/Avionics/Remote Sensing/Robotics/Autonomous/Industrial Inspection/Oil & Gas Services/Electric Utilities; keywords: BVLOS, DAA, SORA, PDRA, LUC, C2 redundancy, lost‑link, VTOL, fixed‑wing VTOL, unmanned helicopter
- **Evidencia web**: EASA 2019/947; SORA authorization; BVLOS AESA; lost link; C2 redundancy; OM; PDRA; safety case
- **Incluir**: TRL ≥8/≥7; evidencia BVLOS; autonomía/alcance mínimos; payloads críticos; soporte UE; plazos <12 semanas; PoC con datos para safety case
- **Excluir**: consumo/sin BVLOS; sin VTOL (sin justificación); sin DAA/C2 redundado; sin logging/soporte UE; TCO >€500k sin ventaja o OPEX >€1.000/h
- **APIs**:
  - Crunchbase: categorías+ubicaciones+keywords (AND‑only); Autocomplete IDs; fields: `website_url`, `location_identifiers`, `facet_ids`, `short_description`, `founder_identifiers`, `funding_stage`
  - PitchBook: Aerospace/Robotics; keyword “BVLOS/DAA”; región ES/PT/FR/UE; entities: companies/deals

---

Nota: Este documento acompaña al JSON `code/files/extraction_E_to_K.json` que se usa para renderizar la demo en el front con animación de “procesando…”.


