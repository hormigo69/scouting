# **PROPUESTA DE PILOTO (MVP)**
## Sistema Inteligente de Scouting de Innovación – Fases 2 y 3


---

### 1. Visión General del Proyecto Completo

Applus+ tiene interés en implementar una solución avanzada de scouting de innovación potenciada por IA que transforme el proceso actual de búsqueda y evaluación de startups en un sistema más automatizado, data-driven y escalable. La solución que proponemos combina tecnologías de IA de última generación con acceso a fuentes premium de datos (Pitchbook, Crunchbase, …) y un sistema de evaluación automatizada para acelerar y mejorar significativamente el proceso de identificación y selección de startups.

Esta solución automatiza las tareas repetitivas y de análisis de datos, permitiendo al equipo de innovación enfocarse en decisiones estratégicas y evaluación cualitativa de alto valor. El sistema está diseñado para ser adaptativo y escalable, aprendiendo continuamente de cada proceso de scouting para mejorar futuras búsquedas.

El proyecto integral de Scouting de Innovación consta de **5 fases**:
1. **Definición** – Entender la necesidad de negocio y formular la pregunta de investigación.
2. **Búsqueda (Automatizada)** – Identificar compañías y soluciones relevantes en múltiples fuentes.
3. **Análisis (Enriquecimiento)** – Profundizar en la información y generar visualizaciones.
4. **Evaluación** – Scoring, shortlist y selección final.
5. **Documentación** – Compilación de informes finales y plan preliminar de integración.

> **Objetivo a largo plazo:** Automatizar el proceso end-to-end (Fases 1-5) para reducir tiempo y sesgos en la identificación de startups.

---

### 2. Alcance del Piloto (MVP)
Aunque se ha pensado en una arquitectura completa que cubra las 5 fases, el **piloto** propuesto se centra **exclusivamente** en las **Fases 2 y 3** para validar y demostrar la capacidad de recopilación y análisis automáticos, que consideramos la parte a la que se le puede sacar más partido en un tiempo relativamente corto.

#### ¿Qué partes se automatizan?

 **Fase 2. Agentes de búsqueda y análisis**
 El objetivo es activar agentes para automatizar las consultas a las diferentes fuentes, tanto a través de APIs premium (PitchBook, Crunchbase) como de un web scraping selectivo.
 Se espera que estos agentes generen una lista inicial de startups y perfiles JSON básicos de las startups encontradas.

| **Fase 3. Agente de enriquecimiento** 
Este agente recibe una lista de startups y sus perfiles básicos y los enriquece con investigación profunda, generando perfiles completos, analizando métricas de tracción y evaluando equipo y tecnología.
La salida esperada es un documento de investigación detallado por cada startup y un fichero con las métricas basicas que permitan, en una fase posterior, comparar las startups en una matriz de decisión.

---

### 3. Flujo del Piloto Paso a Paso
```mermaid
graph TD
    A[Input: Pregunta de investigación] --> B[Agente Buscador]<br/>"Fase 2"
    B --> C[Lista bruta de compañías]
    C --> D[Generar perfiles JSON básicos]
    D --> E[Agente Enriquecedor]<br/>"Fase 3"
    E --> F[Perfiles enriquecidos]
    E --> G[Fichero con métricas básicas]
    F --> H[Creación deMarket Map]
```

---

### 4. Input del Piloto
- **Pregunta de investigación ejemplo:**
  > *“¿Qué compañías están desarrollando tecnologías innovadoras para reducir emisiones de frenos ante la normativa Euro 7?”*
- **Criterios iniciales (a definir en cada caso):** Categorías, geografía, nivel de madurez, funding.

Estos datos se definen con el cliente al inicio del piloto y se cargan en el sistema como **brief estructurado**.

---

### 5. Outputs Esperados
A continuación se muestran ejemplos **reales o simulados para las pruebas** generados por el prototipo y que servirán de referencia en el piloto:

| Tipo de Output | Formato | Ejemplo en el repositorio |
|----------------|---------|---------------------------|
| **Perfiles JSON básicos** | `.json` | `examples/point_zero_crunchbase.json` |
| **Perfiles JSON enriquecidos** | `.json` | `examples/point_zero_pitchbook.json` |
| **Reporte Deep Research** | `.md` | `examples/Point Zero Startup Research Report.md` |
| **Market map** | `.csv` | `examples/Braking_Market_Map.csv` |

> **Nota:** Durante el piloto se generarán estos mismos tipos de archivos para **5-10 startups** identificadas como más relevantes.

---

### 6. Entregables del Piloto
-**Entregable principal**: **Código fuente** (repositorio Git) con una **API REST** documentada que, al recibir la **pregunta de investigación** y los criterios, ejecuta los agentes y devuelve los outputs estandarizados.
-**Outputs generados automáticamente**:
  1. **Dataset bruto** (CSV/JSON) de compañías encontradas.
  2. **Perfiles básicos** (Crunchbase, PitchBook) en formato JSON.
  3. **Perfiles enriquecidos** con insights clave y métricas (JSON).
  4. **Market Map** (CSV) generado a partir de los datos enriquecidos.
  5. **Reportes individuales** (Markdown) por cada startup priorizada.
-**Documentación complementaria**:
  - Manual de despliegue y guía de uso de la API.
  - Memoria metodológica con lecciones aprendidas y roadmap para fases 4-5.

---

### 7. Duración y Responsabilidades
- **Duración estimada:** xx semanas.
- **Responsabilidades del cliente:**
  - Validar la pregunta de investigación y criterios.
  - Proveer acceso a cuentas API (si aplica) o aprobar uso de créditos IA.
- **Responsabilidades del equipo IA:**
  - Configurar y ejecutar los agentes de Búsqueda y Análisis.
  - Entregar outputs y realizar sesión de revisión.

---

### 8. Éxito del Piloto (Criterios SMART)
El piloto se considerará **exitoso** cuando se cumplan **todas** las métricas siguientes:

**Cobertura**: Número de startups relevantes identificadas ≥ **10** compañías validadas por el equipo de innovación.

**Precisión**: Ratio de *falsos positivos* (compañías irrelevantes) en la lista final ≤ **20 %** tras revisión del cliente.

**Velocidad**: Tiempo total desde la carga de la pregunta hasta la generación completa de outputs ≤ **48 h**.

**Ahorro de tiempo**: Reducción frente al proceso manual actual (estimado 160 h) ≥ **70 %** de ahorro.

**Entregables**: Todos los ficheros (dataset, perfiles, market map, reportes) generados y accesibles **100 %** entregados dentro del plazo.

**Reproducibilidad**: Despliegue del sistema en entorno del cliente siguiendo la guía ≤ **1 día** de trabajo.

Si alguna métrica no se alcanza se revisará conjuntamente para determinar acciones correctivas antes de dar el piloto por finalizado.

---

### 9. Próximos Pasos Tras el Piloto
1. Decidir extensión a **Fase 4 (Evaluación)** y **Fase 5 (Documentación)**.
2. Ajustar agentes y métricas según feedback.
3. Planificar roadmap para escalado a otras áreas de innovación.

---

### 10. Presupuesto Aproximado del Piloto

#### 📊 Resumen Ejecutivo
**Inversión Total Estimada**: **€48.000 - €62.000** (duración: 10-12 semanas)

| Categoría | Monto | % del Total | Justificación |
|-----------|-------|-------------|---------------|
| **Desarrollo Técnico** | €28.000 - €36.000 | 60% | Core del sistema de IA |
| **Infraestructura** | €9.000 - €13.000 | 18% | Servicios cloud y APIs |
| **Gestión de Proyecto** | €6.000 - €8.000 | 12% | Coordinación y documentación |
| **Contingencias** | €5.000 - €7.000 | 10% | Riesgos técnicos |
| **Total** | **€48.000 - €62.000** | **100%** | **Piloto completo** |

---

#### 🔧 Desglose Detallado por Categorías

##### 1. Desarrollo Técnico (€28.000 - €36.000)
**Horas totales estimadas**: 120-150 horas de desarrollo especializado

| Componente | Horas | Costo (€) | Detalles Técnicos |
|------------|-------|-----------|-------------------|
| **Arquitectura de Agentes IA** | 45-55h | €9.000 - €11.000 | • Diseño de agentes especializados<br>• Lógica de reasoning avanzada<br>• Optimización de prompts |
| **Integración APIs Premium** | 25-35h | €5.000 - €7.000 | • PitchBook API v2<br>• Crunchbase API<br>• Rate limiting & autenticación |
| **API REST & Backend** | 35-45h | €7.000 - €9.000 | • FastAPI/Django REST<br>• Procesamiento asíncrono<br>• Documentación automática |
| **Procesamiento de Datos** | 30-40h | €6.000 - €8.000 | • Estructuras JSON normalizadas<br>• Generación de market maps<br>• Reportes dinámicos |
| **Testing & QA** | 20-25h | €4.000 - €5.000 | • Unit tests & integración<br>• Validación de datos<br>• Performance testing |

##### 2. Infraestructura y Servicios (€9.000 - €13.000)

| Servicio | Costo (€) | Detalles |
|----------|-----------|----------|
| **Plataforma de IA** | €4.000 - €6.000 | • OpenAI/Claude API credits<br>• ~50.000 tokens para desarrollo<br>• Inferencia durante pruebas |
| **Cloud Infrastructure** | €3.000 - €4.000 | • AWS/GCP/Azure compute<br>• Storage & databases<br>• Vector database (Pinecone/Weaviate) |
| **Data APIs** | €3.000 - €4.000 | • PitchBook premium access<br>• Crunchbase enterprise<br>• Testing credits |

##### 3. Gestión de Proyecto (€6.000 - €8.000)

| Actividad | Horas | Costo (€) | Deliverables |
|-----------|-------|-----------|-------------|
| **Project Management** | 25-35h | €5.000 - €7.000 | • Sprint planning<br>• Stakeholder management<br>• Risk monitoring |
| **Documentación** | 15-20h | €3.000 - €4.000 | • Technical documentation<br>• User guides<br>• API documentation |

##### 4. Riesgos y Contingencias (€5.000 - €7.000)
**Reserva técnica del 10%** para:
- Cambios inesperados en APIs externas
- Optimización de rendimiento adicional
- Resolución de bugs críticos
- Validación de seguridad adicional

---

#### 📅 Timeline y Hitos de Pago

| Semana | Hito | % Pago | Monto (€) | Deliverables |
|--------|------|--------|-----------|-------------|
| **Semana 1-2** | Inicio & Setup | 30% | €14.400 - €18.600 | • Arquitectura definida<br>• APIs conectadas<br>• Entorno de desarrollo |
| **Semana 3-6** | Desarrollo Core | 40% | €19.200 - €24.800 | • Agentes implementados<br>• API funcional<br>• Primeras pruebas |
| **Semana 7-10** | Testing & Optimización | 20% | €9.600 - €12.400 | • QA completo<br>• Optimizaciones<br>• Documentación final |
| **Semana 11-12** | Despliegue & Validación | 10% | €4.800 - €6.200 | • Sistema en producción<br>• Sesiones de validación<br>• Transferencia de conocimiento |

---

#### 💰 Modelo de Costos y Supuestos

**Tarifas aplicadas:**
- Desarrollo IA especializado: €60-75/hora
- Arquitectura de sistemas: €70-85/hora
- Project Management: €55-65/hora

**Supuestos incluidos:**
- ✅ Acceso a APIs de PitchBook y Crunchbase
- ✅ Entorno cloud proporcionado por cliente
- ✅ 2-3 stakeholders para validaciones
- ✅ Datos de prueba disponibles

**No incluye:**
- ❌ Licencias comerciales post-piloto
- ❌ Mantenimiento y soporte continuo
- ❌ Escalado a producción
- ❌ Capacitación adicional del equipo

---

#### 📈 Análisis de ROI y Beneficios

##### Beneficios Cuantificables:
| Métrica | Antes | Después | Ahorro Anual |
|---------|-------|---------|--------------|
| **Tiempo de scouting** | 160h por búsqueda | 16h por búsqueda | **€80.000 - €120.000** |
| **Costos operativos** | €25.000/año | €5.000/año | **€20.000/año** |
| **Cobertura de mercado** | 50 startups | 200+ startups | **4x más oportunidades** |

##### ROI del Piloto:
- **Payback period**: 3-4 meses
- **ROI primer año**: **250-350%**
- **ROI años siguientes**: **500%+**
- **Break-even**: Después de 8-12 búsquedas

##### Beneficios Cualitativos:
- **Velocidad**: De semanas a horas en identificación de oportunidades
- **Calidad**: Mayor precisión en evaluación de startups
- **Escalabilidad**: Costos marginales cercanos a cero
- **Competitividad**: Ventaja estratégica en innovación

---

#### ⚠️ Factores de Riesgo y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Cambios en APIs | Media | Alto | Reserva técnica + contratos flexibles |
| Calidad de datos | Baja | Medio | Validación múltiple + fuentes alternativas |
| Curva de aprendizaje | Baja | Bajo | Capacitación incluida + documentación |

---

#### 🤝 Condiciones Comerciales

- **Validez de presupuesto**: 60 días desde aprobación
- **Plazo de ejecución**: 10-12 semanas desde kickoff
- **Forma de pago**: Transferencia bancaria
- **Penalizaciones**: No aplican si hitos cumplidos
- **Confidencialidad**: NDA estándar aplicable

**¿Listo para revolucionar tu proceso de scouting de innovación?** 🚀

---

