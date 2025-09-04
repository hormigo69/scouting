Estoy intentando procedimentar y automatizar el paso 1 del sistema de scouting de innovación.

El primer paso del procedimiento, que es el quiero resolver ahora, es:
1. **Definición** – Entender la necesidad de negocio y formular la pregunta de investigación.

Las unidades de negocio, cuando tienen una necesidad, rellenan el formulario docs/docs_cliente/Challenge request con ejemplo BVLOS.md . De ahí deberíamos de sacar la pregunta de investigación del proceso de scouting de innovación

Una pregunta tipo sería:
*"¿Qué compañías están desarrollando tecnologías innovadoras para reducir emisiones de frenos ante la normativa Euro 7?"*

TAREA:
¿Qué procedimiento podríamos usar para convertir el documento que recibimos de las unidades de negocio, en una pregunta de investigación?

Deberíamos entender bien el documento fuente y pensar en cuales serían los pasos para sacar la pregunta de investigación. 

También podría ser útil definir una estructura de pregunta de investigación, que incluya todos los elementos por los que se va a hacer la investigación. 

____________________________________________________________

## objetivo

Transformar cada **formulario de necesidad** en:

1. **Una pregunta de investigación** (una sola frase, clara y accionable).
2. **Una ficha de búsqueda** (lista de criterios/filtros) lista para ejecutar en **Crunchbase**, **PitchBook** y **web**.

> Nota de método: usar "**How Might We**" (HMW) ayuda a enmarcar necesidades sin pre‑cerrar soluciones; es un puente entre **Definir** e **Idear** en design thinking. Úsalo para validar con negocio; después convierte a una pregunta operativa con criterios verificables. ([The Interaction Design Foundation][1], [designkit.org][2])

---

## entregables estándar

* **Pregunta de investigación (1 línea)**.
* **Ficha de búsqueda** con: contexto, resultado/KPIs, restricciones (regulatorias/técnicas), geografía, tipo de actor, madurez (TRL), plazo de piloto, señales de mercado (financiación/etapa), palabras clave y criterios de inclusión/exclusión.
* **Trazabilidad**: fuente de cada criterio y razones de inclusión/exclusión (estilo PRISMA para transparencia). ([PRISMA statement][3])

---

## Flujo Completo de la Fase 1: De la Plantilla a la Pregunta de Investigación

Este flujo amplía el proceso inicial, incorporando pasos previos para garantizar que el input (Challenge Request) sea completo y de alta calidad antes de extraer la pregunta y ficha. Esto reduce riesgos como suposiciones no validadas o datos incompletos, alineándose con las reglas del repo (consultar docs/, comportamiento adversarial).

### Input Inicial
- **Plantilla genérica de Challenge Request**: Basada en el ejemplo en docs/docs_cliente/A+ Template_CHALLENGE REQUEST 3.md. Incluye secciones estándar como Problema, Impacto, Soluciones Potenciales, Descartadas, Consideraciones, Piloto y Valor Proposición.

### Paso A: Personalización de Formulario (Humano)
- **Descripción**: Un experto (ej. equipo de innovación) adapta la plantilla genérica al reto específico, ajustando campos para enfocar en el dominio (ej. automoción, energía). Se añaden preguntas guiadas para elicitar detalles como TRL mínimo, geografía o restricciones regulatorias.
- **Ampliación**: Incluir checklists de docs/ (ej. requisitos regulatorios de EASA para drones). Cuestionar suposiciones: ¿El reto asume madurez tecnológica? Sugerir alternativas (ej. incluir HMW (How Might We - método de design thinking para abrir opciones sin pre-cerrar soluciones) para abrir opciones).
- **Output**: Challenge Request personalizado (Markdown o formulario editable).

### Paso B: Respuesta por Parte de la Unidad de Negocio (Humano)
- **Descripción**: La unidad de negocio rellena el formulario personalizado, proporcionando detalles narrativos sobre el problema, impacto y expectativas.
- **Ampliación**: Para futuras iteraciones, implementar un formulario asistido (ej. con prompts IA para guiar respuestas, como "Especifique KPIs medibles" o "Liste restricciones regulatorias"). Esto ayuda a enfocar, pero por ahora es manual.
- **Output**: Challenge Request finalizado (versión rellena).

### Paso C: Revisión de Challenge Request (Agente IA)
- **Descripción**: Un agente IA analiza el formulario relleno contra reglas predefinidas para detectar datos faltantes o ambiguos.
- **Reglas de Detección de Datos Faltantes** (basadas en plantilla estándar):
  - **Obligatorios**: Problema descrito, Impacto con KPIs (ej. ahorro %), Soluciones potenciales, Consideraciones (regulatorias/técnicas).
  - **Adversarial**: Identificar riesgos (ej. "Falta mención a TRL mínimo; riesgo de soluciones inmaduras"), suposiciones no validadas (ej. "Asume cumplimiento UE sin detalles") y alternativas (ej. "Considerar geos no-UE para laxitud regulatoria").
  - **Ampliación**: Usar herramientas como semantic search en docs/ para validar términos (ej. cross-check con API Pitchbook para taxonomías). Si faltan >20% campos, flaggear para revisión humana.
- **Output**: Listado de datos a mejorar (ej. "Faltan KPIs cuantitativos; sugiero agregar % reducción de costes").

### Paso D: Entrevista con Unidad de Negocio para Terminar de Definir el Reto (Humano + IA Asistida)
- **Descripción**: Basado en el listado de Paso C, realizar una entrevista (virtual o meeting) para incorporar datos faltantes y refinar el formulario.
- **Ampliación**: IA puede generar preguntas guiadas (ej. "Para el TRL mínimo, ¿prefieren ≥6 para piloto rápido?"). Documentar en Markdown, actualizando memoria_proyecto.yaml si hay cambios significativos (por reglas del repo). Cuestionar adversarial: Explorar edge cases (ej. "Qué pasa si no hay soluciones en UE?").
- **Output**: Informe completo Challenge Request (versión final, validada y enriquecida).

A partir de aquí, procedemos con el **Procedimiento de Extracción** (pasos 1-10 originales, ahora renombrados como E-N para flujo continuo).

---

## Procedimiento de Extracción (Pasos E-N)

Una vez que tenemos el Challenge Request completo y validado, procedemos con la extracción de la pregunta de investigación y ficha de búsqueda.

### Paso E: Leer y etiquetar el formulario
   Extraer y normalizar estos "slots": **Contexto/uso**, **Resultado/KPIs**, **Restricciones** (normas, certificaciones, seguridad, datos), **Geografía**, **Actores objetivo** (startup/scaleup/OEM/integrador), **Madurez/TRL y plazo**, **Señales de mercado** (última ronda/etapa), **Fuentes adjuntas**.

### Paso F: Desambiguar términos críticos

   * Regulación y acrónimos (p. ej., **EASA 2019/947** y **SORA** para BVLOS). SORA es el método de evaluación de riesgo aceptado por EASA para la categoría "Specific". ([EUR-Lex][4], [EASA][5])
   * Para automoción, **Euro 7 (Reg. (UE) 2024/1257)** incluye por primera vez emisiones no‑de‑escape como **partículas de freno** y **desgaste de neumáticos**. ([EUR-Lex][6])

### Paso G: Definir el resultado y los límites (PICOC + HMW)

   * Asegurar **Contexto/Población, Intervención/tecnología, Resultado, Comparación (si aplica), y Contexto**. Lo usamos para que la pregunta sea completa y para derivar criterios de búsqueda. ([CEBMa][7])
   * Opcional: formular también la versión **HMW** parapor si es necesario revisar con negocio. ([The Interaction Design Foundation][1])

### Paso H: Fijar madurez y tiempos (TRL y plazo de piloto)
   Declarar un **TRL mínimo** (p. ej., ≥6 para piloto de integración) y un **plazo** (e.g., ≤6–12 meses). La escala TRL (1–9) es el estándar en Horizonte 2020/Europa. ([European Commission][8])

### Paso I: Priorizar requisitos (MoSCoW)
   Separar **Must/Should/Could/Won't** para que los filtros de búsqueda no "maten" la exploración. ([Wikipedia][9])

### Paso J: Redactar la pregunta operativa (1 frase)
   **Plantilla**:

   > Para **\[caso de uso]** en **\[sector/mercado y geografía]**, ¿qué **\[tipo de actor]** ofrece **\[tecnología/solución]** que **\[logra KPI/resultado]** cumpliendo **\[norma/restricción]**, con **\[TRL mínimo]**, **listo para piloto en \[plazo]**?

### Paso K: Construir la ficha de búsqueda** (para compilar a APIs y web)

   * **Vertical/categorías**, **ubicaciones**, **etapa/financiación** (desde/año), **palabras clave de evidencia** (términos técnicos/regulatorios), **exclusiones**, **fuentes preferentes**.
   * **Criterios de inclusión/exclusión** documentados (sirven para auditoría posterior). ([PRISMA statement][3])

---

## Estructura de la pregunta de investigación

> **Para \[mercado/país/es y caso de uso]**, ¿qué **\[startups/scaleups/OEM/integradores]** ofrecen **\[tecnología/solución]** que **\[logra resultado/KPI medible]** **cumpliendo \[norma/estándar/restricción]**, con **\[TRL mínimo]**, **aptos para piloto en \[meses]** y **operativos en \[geografía]**?

*(Opcional HMW para alinear con negocio)*: **¿Cómo podríamos** \[resultado/KPI] **en \[contexto]** **cumpliendo \[restricciones]** y **listo para piloto en \[plazo]**? ([The Interaction Design Foundation][1])

---

## Estructura de la ficha de búsqueda (para ejecutar en apis y web)

* **Contexto/uso**
* **Resultado/KPIs** (medibles)
* **Restricciones y must‑haves** (regulatorias/técnicas)
* **Geografía**
* **Actores objetivo**
* **Madurez y tiempos** (p. ej., **TRL** mínimo y plazo de piloto) ([European Commission][8])
* **Señales de mercado** (etapa, última ronda desde \[año])
* **Taxonomía**: categorías/verticales y sinónimos (a resolver a IDs en Crunchbase) ([Access Crunchbase Data][11])
* **Palabras clave de evidencia** (para web)
* **Criterios de inclusión/exclusión** y **fuentes** (para trazabilidad tipo PRISMA). ([PRISMA statement][3])

---

## Ejemplos de salida

### Ejemplo 1 · BVLOS (inspección industrial)

**Pregunta**

> Para **inspecciones industriales** (líneas eléctricas, oleoductos, eólica) en **UE**, ¿qué **fabricantes de UAS/proveedores de DAA** permiten **operaciones BVLOS** **cumpliendo EASA (Reg. (UE) 2019/947) mediante SORA**, con **TRL ≥6**, **aptos para piloto en ≤6 meses**? ([EUR-Lex][4], [EASA][5])

**Criterios clave (ficha de búsqueda)**

* **Must**: elegibilidad **SORA** (Categoría *Specific*), mitigaciones de riesgo/DAA. ([EASA][5])
* **Should**: autonomía/alcance/payload mínimos para la misión; experiencia en utilities/O\&G.
* **Geos**: UE (prioridad ES/PT).
* **Madurez**: **TRL ≥6**. ([European Commission][8])
* **Señales de mercado**: última ronda desde 2022; etapas Seed‑B.
* **Evidencias web**: manuales SORA, autorizaciones BVLOS previas. ([EASA][5])

### Ejemplo 2 · Euro 7 (partículas de freno)

**Pregunta**

> Para **vehículos M1/N1** a comercializar en **UE** bajo **Euro 7**, ¿qué **empresas** ofrecen **tecnologías para reducir partículas de freno (PM/PN)** (p. ej., materiales, recubrimientos, filtros/captura, monitorización) que permitan **cumplir el Reglamento (UE) 2024/1257**, con **TRL ≥6** y **piloto de integración en 9–12 meses**? ([EUR-Lex][6])

**Criterios clave (ficha de búsqueda)**

* **Must**: alineamiento con límites de **Euro 7** y durabilidad; foco en freno (y, si aplica, neumáticos). ([EUR-Lex][6])
* **Geos**: UE.
* **Madurez**: **TRL ≥6**. ([European Commission][8])
* **Señales de mercado**: actividad de financiación reciente; clientes piloto en OEM/Tier‑1.
* **Evidencias web**: protocolos de ensayo/validación publicados o referencias técnicas.

---

## Checklist de calidad (usamos esto antes de lanzar el scouting)

* **Cubre PICOC**: contexto, intervención/solución, resultado/KPI, comparación (si procede), contexto. ([CEBMa][7])
* **Incluye TRL y plazo de piloto** (realistas). ([European Commission][8])
* **Prioriza con MoSCoW** (Must/Should/Could/Won’t). ([Wikipedia][9])
* **Compila a APIs**:

  * Crunchbase: filtros **AND‑only**; sinónimos ⇒ **múltiples llamadas** y unión de resultados (Nos apoyamos en **Autocomplete** para IDs). ([Access Crunchbase Data][10])
  * PitchBook: confirmar filtros disponibles según contrato (entidades: companies/deals/investors...). ([PitchBook][15])
* **Plan de evidencia**: qué PDFs/notas de prensa/patentes vamos a recoger (operadores avanzados de búsqueda). ([Microsoft Support][13])
* **Fusión de señales**: RRF + re‑rank por evidencia y actualidad. ([G. V. Cormack][14])
* **Trazabilidad**: guardar criterios y decisiones (diagrama/tabla estilo PRISMA). ([PRISMA statement][3])

---

## Notas prácticas

* **HMW vs. pregunta operativa**: usar HMW para abrir el ámbito con la unidad de negocio y evitar sesgo de solución; después, bajar a la pregunta “operativa” con criterios verificables (regulación, TRL, plazo). ([The Interaction Design Foundation][1])
* **Crunchbase**: además de “organizations”, documentar qué **`field_ids`** pides (p. ej., `website_url`, `location_identifiers`, `facet_ids`, etc.) y qué operadores admite cada campo (la guía de **field types & operators** aclara combinaciones válidas). ([Access Crunchbase Data][16])
* **PitchBook**: Usarlo para enriquecer señales de mercado (deals/etapas/inversores) y construir “alertas” de cambios relevantes (depende del alcance contratado). ([PitchBook][12])

---

## En resumen

1. **Preparación** (Pasos A-D): Personalizar plantilla, recoger respuestas, revisar con IA, entrevistar para completar.
2. **Extracción** (Pasos E-K): Mapear formulario, desambiguar, definir PICOC, fijar TRL/plazo, priorizar MoSCoW, redactar pregunta, construir ficha de búsqueda.
3. **Validación**: Checklist de calidad antes de pasar a la Fase 2.
4. **Documentación**: Trazabilidad PRISMA y actualización de memoria_proyecto.yaml.
5. **Output para Fase 2**: Pregunta de investigación y ficha de búsqueda completas, listas para ejecutar en APIs y web.


[1]: https://www.interaction-design.org/literature/topics/how-might-we "What is How Might We (HMW)? | IxDF - The Interaction Design Foundation"
[2]: https://www.designkit.org/methods/how-might-we.html "How Might We - Design Kit"
[3]: https://www.prisma-statement.org/prisma-2020-flow-diagram "PRISMA 2020 flow diagram — PRISMA statement"
[4]: https://eur-lex.europa.eu/eli/reg_impl/2019/947/oj/eng  "Implementing regulation - 2019/947 - EN - EUR-Lex"
[5]: https://www.easa.europa.eu/en/domains/drones-air-mobility/operating-drone/specific-category-civil-drones/specific-operations-risk-assessment-sora  "Specific Operations Risk Assessment (SORA) - EASA"
[6]: https://eur-lex.europa.eu/eli/reg/2024/1257/oj/eng  "Regulation - 2024/1257 - EN - EUR-Lex"
[7]: https://cebma.org/resources/frequently-asked-questions/what-is-a-picoc/  "What is a PICOC? » CEBMa"
[8]: https://ec.europa.eu/research/participants/data/ref/h2020/wp/2014_2015/annexes/h2020-wp1415-annex-g-trl_en.pdf  "G. Technology readiness levels (TRL)"
[9]: https://en.wikipedia.org/wiki/MoSCoW_method  "MoSCoW method - Wikipedia"
[10]: https://data.crunchbase.com/docs/using-search-apis  "Using Search API - Access Crunchbase Data"
[11]: https://data.crunchbase.com/docs/using-autocomplete-api  "Using Autocomplete API - Access Crunchbase Data"
[12]: https://pitchbook.com/help/PitchBook-api  "PitchBook API - PitchBook"
[13]: https://support.microsoft.com/en-us/topic/advanced-search-options-b92e25f1-0085-4271-bdf9-14aaea720930  "Advanced search options - Microsoft Support"
[14]: https://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf  "Reciprocal Rank Fusion outperforms Condorcet and individual Rank ..."
[15]: https://pitchbook.com/products/direct-access-data/api  "PitchBook API: Flexibly call down data on demand | PitchBook"
[16]: https://data.crunchbase.com/reference/available-field-types-operators  "Available Field Types & Operators - Access Crunchbase Data"


