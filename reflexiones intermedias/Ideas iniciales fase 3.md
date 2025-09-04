# Ideas Iniciales Fase 3: Análisis y Enriquecimiento de Datos

## Objetivo

Transformar la Long List de startups identificadas en la Fase 2 en una shortlist priorizada basada en matriz multidimensional personalizada por challenge, con enriquecimiento selectivo y análisis cualitativo para preparar la evaluación final.

## Entregables Estándar

* **Shortlist sugerida**: Lista priorizada de startups (top 10-15) con explicaciones detalladas y validación humana
* **Matriz de decisión**: Estructura multidimensional con ejes extraídos automáticamente de Fase 1
* **Perfiles enriquecidos**: Análisis cualitativo profundo solo para la shortlist
* **Market maps finales**: Visualizaciones enfocadas en la shortlist con insights competitivos
* **Reportes individuales**: Documentos de investigación detallados por startup priorizada
* **Paquete para Fase 4**: Outputs estructurados para evaluación manual final

## Flujo Completo de la Fase 3: Del Análisis a la Shortlist

Este flujo amplía el proceso inicial, incorporando pasos previos para garantizar que el input (Long List de la Fase 2) sea completo y de alta calidad antes de proceder con el análisis profundo. Esto reduce riesgos como sesgos de análisis o información incompleta, alineándose con las reglas del repo (consultar docs/, comportamiento adversarial).

### Inputs de Fases Anteriores

#### Input de la Fase 1 (para Extracción de Ejes)
- **Pregunta de investigación estructurada**: Base para generar ejes multidimensionales
- **Criterios MoSCoW/PICOC**: Prioridades y parámetros para matriz y scoring
- **Condiciones de contorno**: KPIs, umbrales y restricciones del challenge
- **Riesgos Adversariales**: Inconsistencia si Fase 1 se modifica post-ejecución; mitigar con validación automática de cambios y logs de versiones
- **Mitigaciones**: Cross-reference automático con outputs de Fase 1; alertas si hay desalineaciones

#### Input de la Fase 2
- **Long List filtrada**: Lista de startups relevantes con perfiles básicos validados
- **Metadatos de búsqueda**: Estadísticas de cobertura y criterios aplicados documentados
- **Perfiles JSON básicos**: Información inicial estructurada de múltiples fuentes
- **Trazabilidad completa**: Documentación de decisiones de filtrado y criterios aplicados

### Fase de Preparación (Pasos A-C): Extracción y Configuración de Matriz Multidimensional

#### Paso A: Extracción Automática de Ejes y Parámetros (🤖 AGENTE IA)
- **Descripción**: Extraer ejes multidimensionales específicos del challenge a partir de la pregunta de investigación y condiciones de contorno de Fase 1
- **Proceso**:
  - Analizar automáticamente criterios MoSCoW, PICOC y KPIs de Fase 1 para generar ejes (ej. "Fit Tecnológico vs. Madurez Financiera")
  - Definir parámetros variables por reto (ej. umbrales para "alto fit": TRL >7, financiación >$5M)
  - Generar matriz multidimensional inicial con ponderaciones basadas en prioridades de Fase 1
- **Validación**: Cross-check con ejemplos en `examples/Braking_Market_Map.csv`; permitir overrides humanos para variar ejes/valores
- **Riesgos Adversariales**: Extracción imprecisa si Fase 1 es ambigua; mitigar con validación humana obligatoria
- **Output**: Matriz configurable lista para posicionar startups

#### Paso A.1: Validación Humana de Ejes y Parámetros (👤 CHECK HUMANO)
- **Descripción**: Validar, modificar o añadir ejes y parámetros extraídos automáticamente para asegurar intuición y alineación con el negocio
- **Proceso**:
  - Revisar ejes generados por IA para interpretabilidad
  - Añadir ejes no explícitos en Fase 1 (ej. "Riesgo Regulatorio", "Capacidad de Escalado")
  - Ajustar ponderaciones y umbrales según contexto del negocio
  - Validar que la matriz capture todas las dimensiones críticas del challenge
- **Validación**: Verificar que los ejes sean intuitivos para el equipo y capturen la complejidad del reto
- **Riesgos Adversariales**: Sesgos humanos en la definición de ejes; mitigar con documentación de justificaciones y validación cruzada
- **Output**: Matriz validada y ajustada lista para posicionamiento de startups

#### Paso B: Posicionamiento de Startups en la Matriz (🤖 AGENTE IA + 👤 VALIDACIÓN HUMANA)
- **Descripción**: Posicionar la Long List en la matriz multidimensional usando datos de Fase 2
- **Proceso**:
  - Mapear startups automáticamente a ejes (ej. calcular scores por parámetro)
  - Aplicar filtros dinámicos basados en valores configurables (ej. descartar si no cumple umbral)
  - Permitir al equipo variar ejes/parámetros en tiempo real para escenarios what-if
- **Validación**: Verificar contra metadatos de Fase 2; identificar suposiciones no validadas (ej. sesgos en scores)
- **Output**: Matriz poblada con posiciones iniciales de startups

#### Paso C: Sugerencia de Shortlist con Explicación (🤖 AGENTE IA + 👤 CHECK HUMANO)
- **Descripción**: La IA sugiere una shortlist preliminar basada en la matriz, con explicaciones detalladas, pero no decide finalmente; requiere supervisión humana
- **Proceso**:
  - Aplicar scoring multidimensional ponderado para ranking sugerido
  - Generar shortlist preliminar (ej. top 10-15 por criterios del challenge)
  - Incluir explicaciones detalladas por startup (justificando scores, posiciones en ejes, cumplimiento de parámetros y posibles sesgos)
  - Check Humano: Revisión manual para validar sugerencias, ajustar ejes o descartes antes de proceder
- **Validación**: Cross-check con market maps preliminares de Fase 2; identificar riesgos como sesgos en scoring
- **Riesgos Adversariales**: Sesgos IA en sugerencias; mitigar con explicaciones transparentes y check humano obligatorio
- **Output**: Shortlist sugerida con explicaciones y matriz adjunta, validada humanamente

### Fase de Análisis (Pasos D-F): Enriquecimiento y Evaluación para Shortlist

#### Paso D: Enriquecimiento Selectivo de Shortlist (🤖 AGENTE IA)
- **Descripción**: Realizar análisis cualitativo profundo solo para la shortlist sugerida, reutilizando datos recopilados en Fase 2 (ej. web/PitchBook) para evitar redundancias
- **Diferencias con Fase 2**: Fase 2 es recolección masiva y cuantitativa (datos crudos); aquí es síntesis cualitativa (insights, scoring ponderado, evaluación de riesgos) – no re-scrapear, sino analizar y enriquecer lo existente
- **Proceso**:
  - Reutilizar outputs de Fase 2 para base de datos
  - Añadir análisis cualitativo: métricas detalladas (ej. CAGR), equipo (experiencia), tecnología (TRL), riesgos (técnicos/comerciales)
  - Generar insights accionables con justificación
- **Riesgos Adversariales**: Posible overlap si Fase 2 ya es "deep"; mitigar reutilizando explícitamente y validando no-duplicados
- **Output**: Perfiles enriquecidos para shortlist, con trazabilidad a Fase 2

#### Paso E: Generación de Market Maps y Reportes (🤖 AGENTE IA)
- **Descripción**: Crear visualizaciones y reportes enfocados en la shortlist
- **Proceso**: Usar matriz para maps detallados; generar reportes individuales
- **Output**: Market maps finales y reportes

#### Paso F: Preparación para Fase 4 (🤖 AGENTE IA)
- **Descripción**: Estructurar outputs para evaluación manual en Fase 4
- **Proceso**: Exportar shortlist, matriz y reportes en formatos accionables
- **Output**: Paquete completo para validación humana (Fase 4 manual: votación, feedback, selección final)

## Estructura de Datos de Salida

### Shortlist Sugerida
```json
{
  "metadata": {
    "fase_origen": "Fase 3",
    "fecha_generacion": "2024-01-XX",
    "criterios_aplicados": ["criterio1", "criterio2"],
    "scoring_metodologia": "multidimensional_ponderado",
    "validacion_humana": true
  },
  "shortlist": [
    {
      "startup_id": "startup_001",
      "ranking": 1,
      "score_total": 0.87,
      "posicion_ejes": {
        "fit_tecnologico": 0.82,
        "madurez_financiera": 0.91,
        "equipo": 0.78
      },
      "explicacion": "Alto score por TRL 8 y financiación reciente...",
      "criterios_cumplidos": ["must1", "should1", "should2"],
      "riesgos_identificados": ["dependencia_single_partnership"]
    }
  ]
}
```

### Matriz de Decisión
```json
{
  "metadata": {
    "ejes_extraidos_fase1": ["fit_tecnologico", "madurez_financiera"],
    "ponderaciones": {"fit_tecnologico": 0.6, "madurez_financiera": 0.4},
    "umbrales": {"fit_tecnologico": 0.7, "madurez_financiera": 0.6}
  },
  "startups": [
    {
      "startup_id": "startup_001",
      "posiciones": {
        "fit_tecnologico": 0.82,
        "madurez_financiera": 0.91
      },
      "score_ponderado": 0.87
    }
  ]
}
```

### Perfiles Enriquecidos
```json
{
  "metadata": {
    "fase_origen": "Fase 3",
    "fecha_generacion": "2024-01-XX",
    "metodologia_analisis": ["reutilizacion_fase2", "analisis_cualitativo"],
    "fuentes_consultadas": ["fase2_outputs"],
    "calidad_datos": 0.87
  },
  "startup": {
    "id": "startup_001",
    "perfil_basico": {...},
    "perfil_enriquecido": {
      "metricas_detalladas": {...},
      "evaluacion_equipo": {...},
      "evaluacion_tecnologia": {...},
      "analisis_riesgos": {...}
    },
    "scoring_cualitativo": {
      "equipo": 0.82,
      "tecnologia": 0.78,
      "mercado": 0.75,
      "financiacion": 0.88
    }
  }
}
```

## Consideraciones Técnicas

### Personalización por Challenge
- **Extracción automática**: Ejes generados desde criterios MoSCoW/PICOC de Fase 1
- **UI para variaciones**: Permitir ajustes humanos en ejes y parámetros
- **Validación cruzada**: Verificar consistencia con outputs de Fase 1

### Separación de Fases
- **Fase 3**: Genera shortlist sugerida con validación humana
- **Fase 4**: 100% manual para decisiones finales
- **Trazabilidad**: Preservar conexiones entre fases

### Reutilización de Datos
- **Evitar redundancia**: Reutilizar outputs de Fase 2 explícitamente
- **Validación**: Cross-check para evitar duplicados
- **Metadatos**: Tracking de fuentes y metodologías

## Métricas de Éxito

### Calidad de Shortlist
- **Alineación con criterios**: ≥80% de startups alineadas con challenge
- **Diversidad**: Representación de al menos 3 clusters diferentes
- **Validación humana**: 100% de startups revisadas manualmente

### Eficiencia Operativa
- **Tiempo de procesamiento**: ≤4 horas para shortlist de 15 startups
- **Automatización**: ≥70% de tareas automatizadas
- **Reutilización**: ≥90% de datos de Fase 2 reutilizados

### Calidad de Análisis
- **Insights accionables**: ≥3 insights por startup
- **Cobertura de riesgos**: Identificación de ≥85% de riesgos críticos
- **Trazabilidad**: 100% de decisiones documentadas

## Riesgos y Mitigaciones

### Riesgos de Extracción de Ejes
- **Fase 1 ambigua**: Implementar validación automática y defaults
- **Cambios post-ejecución**: Logs de versiones y alertas de desalineación
- **Sesgos automáticos**: Múltiples algoritmos y validación humana

### Riesgos de Posicionamiento
- **Scores inconsistentes**: Validación cruzada entre fuentes
- **Filtros demasiado estrictos**: Umbrales configurables y escenarios what-if
- **Sesgos de matriz**: Múltiples configuraciones de ejes

### Riesgos de Enriquecimiento
- **Overlap con Fase 2**: Reutilización explícita y validación de no-duplicados
- **Análisis superficial**: Establecer umbrales mínimos de profundidad
- **Dependencia de fuentes**: Diversificación y fallbacks automáticos

## Próximos Pasos

Esta fase se conecta directamente con la **Fase 4 (Evaluación Manual)**, donde:

1. **Shortlist sugerida** → Base para votación y feedback del equipo
2. **Matriz de decisión** → Contexto para posicionamiento competitivo
3. **Perfiles enriquecidos** → Información para evaluación cualitativa
4. **Market maps** → Visualización para discusión estratégica

La Fase 4 utilizará los outputs estructurados de esta fase para:
- Aplicar votación y feedback del equipo
- Generar shortlist final y selección
- Producir recomendaciones de integración

## Notas de Implementación

### Automatización Prioritaria
- **Extracción de ejes**: 90% automatizado con validación humana
- **Posicionamiento**: 80% automatizado con ajustes en tiempo real
- **Enriquecimiento**: 70% automatizado con revisión de insights

### Intervención Humana
- **Validación de ejes**: Revisión de extracción automática
- **Check de shortlist**: Validación de sugerencias IA
- **Ajustes de matriz**: Configuración de parámetros y umbrales

### Documentación y Trazabilidad
- **Metodologías**: Documentación completa de algoritmos y criterios
- **Fuentes**: Tracking de reutilización de Fase 2
- **Decisiones**: Justificación de cambios y ajustes
- **Versionado**: Control de cambios en configuración de matriz
