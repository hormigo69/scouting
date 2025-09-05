# Ideas Iniciales Fase 2: Búsqueda y Recopilación de Datos

## Objetivo

Ejecutar la búsqueda sistemática de startups y tecnologías basándose en la pregunta de investigación y ficha de búsqueda generadas en la Fase 1. Esta fase se centra en la activación de agentes de búsqueda, recopilación masiva de datos y primer filtrado automático.

## Entregables Estándar

* **Long List**: Lista inicial de startups/empresas potencialmente cualificadas (basada en criterios de la Fase 1)
* **Datos enriquecidos**: Información básica de cada startup (ubicación, etapa, financiación, tecnología, etc.)
* **Metadatos de búsqueda**: Estadísticas de cobertura, fuentes consultadas, criterios aplicados
* **Trazabilidad**: Documentación de qué criterios se aplicaron y por qué

---

## Flujo Completo de la Fase 2: De la Ficha a la Long List

Este flujo amplía el proceso inicial, incorporando pasos previos para garantizar que el input (Ficha de Búsqueda) sea completo y de alta calidad antes de ejecutar las búsquedas automatizadas. Esto reduce riesgos como suposiciones no validadas o criterios incompletos, alineándose con las reglas del repo (consultar docs/, comportamiento adversarial).

### Input de la Fase 1
- **Pregunta de investigación estructurada**: Basada en el proceso de 11 pasos (A-K) de la Fase 1
- **Ficha de búsqueda completa**: Con criterios MoSCoW priorizados, taxonomías resueltas y plan de evidencia
- **Trazabilidad PRISMA**: Documentación completa de criterios y decisiones

### Fase de Preparación (Pasos A-C)

#### Paso A: Configuración de Herramientas de Búsqueda (🤖 AGENTE IA)
- **Descripción**: Preparar y configurar las APIs y herramientas de búsqueda para ejecutar las consultas definidas en la Fase 1.
- **Proceso**:
  - Resolver IDs de categorías y ubicaciones en Crunchbase usando Autocomplete API
  - Configurar filtros equivalentes en PitchBook según contrato disponible
  - Preparar operadores de búsqueda avanzada para investigación web
  - Validar conectividad y permisos de todas las fuentes
- **Validación**: Cross-check con documentación de APIs en `docs/docs_tecnicos/`
- **Output**: Herramientas configuradas y listas para ejecutar búsquedas

#### Paso B: Estrategia para Crunchbase (🤖 AGENTE IA)
- **Descripción**: Implementar la estrategia de búsqueda en Crunchbase basándose en la ficha de la Fase 1.
- **Consideraciones técnicas**:
  - La búsqueda v4 requiere `field_ids` + `query` y todas las condiciones se combinan con AND
  - Para cubrir sinónimos/OR, lanzar múltiples búsquedas y unir resultados
  - Usar Autocomplete para resolver IDs de categorías y ubicaciones
  - Implementar paginación inteligente para resultados masivos
- **Validación**: Verificar contra ejemplos en `examples/point_zero_crunchbase.json`
- **Output**: Conjunto de resultados de Crunchbase con metadatos completos

#### Paso C: Estrategia para PitchBook (🤖 AGENTE IA)
- **Descripción**: Ejecutar búsquedas en PitchBook según el alcance contratado.
- **Actividades**:
  - Consultar companies, deals, investors según filtros de la ficha
  - Ajustar filtros equivalentes (industria/vertical, localización, etapa, fechas)
  - Monitorizar eventos relevantes (rondas, cambios ejecutivos)
  - Implementar búsquedas incrementales para optimizar rate limits
- **Validación**: Verificar contra ejemplos en `examples/point_zero_pitchbook.json`
- **Output**: Conjunto de resultados de PitchBook con metadatos completos

### Fase de Ejecución (Pasos D-F)

#### Paso D: Investigación Web y Fuentes Secundarias (🤖 AGENTE IA)
- **Descripción**: Realizar búsquedas profundas en web para complementar datos de APIs.
- **Técnicas**:
  - Usar operadores avanzados (`site:`, `filetype:`, `intitle:`)
  - Buscar normativas, informes técnicos, evidencias de pilotos
  - Consultar bases de datos especializadas, patentes, publicaciones académicas
  - Implementar web scraping selectivo para sitios críticos
- **Validación**: Cross-check con fuentes oficiales y documentación regulatoria
- **Output**: Conjunto de resultados web con metadatos estructurados

> **Nota Aclaratoria**: Esta investigación en Fase 2 es de recolección masiva y cuantitativa (datos crudos para Long List), no análisis cualitativo profundo. El enriquecimiento selectivo y síntesis de insights (ej. evaluación de riesgos/tecnología) se realiza en Fase 3, reutilizando estos datos para evitar redundancias. Riesgo: Posible overlap; mitigar reutilizando outputs explícitamente.

#### Paso E: Fusión y Consolidación de Resultados (🤖 AGENTE IA)
- **Descripción**: Combinar y consolidar los resultados de todas las fuentes en una Long List unificada.
- **Metodología**:
  - Usar Reciprocal Rank Fusion (RRF) para combinar rankings de diferentes fuentes
  - Re-ordenar por señales de evidencia y actualidad
  - Eliminar duplicados y consolidar información usando algoritmos de matching
  - Aplicar scoring inicial basado en completitud y relevancia
- **Validación**: Verificar cobertura contra criterios MoSCoW de la Fase 1
- **Output**: Long List consolidada con scoring inicial y metadatos de fusión

#### Paso F: Primer Filtrado Automático (🤖 AGENTE IA)
- **Descripción**: Aplicar filtros automáticos básicos para reducir la Long List a un tamaño manejable.
- **Criterios**:
  - Cumplimiento de requisitos "Must" de la ficha (validación automática)
  - Disponibilidad de información mínima requerida (threshold configurable)
  - Eliminación de resultados obviamente no relevantes (filtros de calidad)
  - Aplicación de criterios de exclusión documentados
- **Validación**: Verificar que no se eliminen startups relevantes por error
- **Output**: Long List filtrada lista para revisión humana

---

## Estructura de Datos de Salida

### Long List Consolidada
```json
{
  "metadata": {
    "fase_origen": "Fase 2",
    "fecha_generacion": "2024-01-XX",
    "criterios_aplicados": ["criterio1", "criterio2"],
    "fuentes_consultadas": ["crunchbase", "pitchbook", "web"],
    "estadisticas": {
      "total_encontradas": 150,
      "despues_filtrado": 45,
      "cobertura_criterios": 0.85
    }
  },
  "startups": [
    {
      "id": "startup_001",
      "nombre": "Startup Example",
      "perfil_basico": {...},
      "fuentes": ["crunchbase", "pitchbook"],
      "scoring_inicial": 0.78,
      "criterios_cumplidos": ["must1", "should1"],
      "metadatos_busqueda": {...}
    }
  ]
}
```

### Metadatos de Búsqueda
- **Trazabilidad**: Qué criterios se aplicaron y por qué
- **Estadísticas de cobertura**: Porcentaje de criterios satisfechos por fuente
- **Calidad de datos**: Completitud y consistencia de información
- **Tiempo de ejecución**: Performance de cada fuente y paso

---

## Consideraciones Técnicas

### Gestión de APIs y Rate Limiting
- **Implementación de colas inteligentes**: Priorizar búsquedas críticas
- **Sistema de caché distribuido**: Evitar consultas repetidas
- **Fallbacks automáticos**: Cambiar a fuentes alternativas si una API falla
- **Monitoreo de quotas**: Alertas cuando se acerquen límites

### Calidad y Validación de Datos
- **Validación cruzada**: Verificar información entre múltiples fuentes
- **Detección de outliers**: Identificar datos anómalos o inconsistentes
- **Enriquecimiento automático**: Completar campos faltantes cuando sea posible
- **Control de calidad**: Métricas de completitud y precisión

### Escalabilidad y Performance
- **Procesamiento paralelo**: Ejecutar búsquedas independientes simultáneamente
- **Optimización de consultas**: Minimizar número de llamadas a APIs
- **Gestión de memoria**: Manejar grandes volúmenes de datos eficientemente
- **Recuperación de errores**: Reintentos inteligentes y logging detallado

---

## Métricas de Éxito

### Cobertura y Calidad
- **Cobertura de criterios**: ≥85% de criterios "Must" satisfechos
- **Completitud de datos**: ≥70% de startups con perfiles completos
- **Precisión de filtrado**: ≤15% de falsos negativos en filtrado automático
- **Diversidad geográfica**: Representación de al menos 3 regiones principales

### Eficiencia Operativa
- **Tiempo total de ejecución**: ≤24 horas para búsquedas estándar
- **Throughput de APIs**: Maximizar uso de rate limits disponibles
- **Recuperación de errores**: ≤5% de reintentos necesarios
- **Uso de recursos**: Optimizar CPU y memoria durante procesamiento

### Trazabilidad y Auditoría
- **Documentación completa**: 100% de decisiones de filtrado documentadas
- **Metadatos estructurados**: Formato consistente para todas las búsquedas
- **Historial de cambios**: Tracking de modificaciones en criterios
- **Validación de resultados**: Proceso de QA documentado

---

## Riesgos y Mitigaciones

### Riesgos Técnicos Críticos
- **Cambios en APIs externas**: Implementar versionado y adaptadores flexibles
- **Limitaciones de rate**: Sistema de colas con priorización inteligente
- **Fallos de conectividad**: Múltiples proveedores de internet y fallbacks
- **Cambios en estructuras de datos**: Validación automática de esquemas

### Riesgos de Calidad de Datos
- **Datos obsoletos**: Implementar timestamps y validación de frescura
- **Información contradictoria**: Algoritmos de resolución de conflictos
- **Sesgos de fuente**: Diversificación automática y validación cruzada
- **Completitud variable**: Métricas de calidad por startup y fuente

### Riesgos Operativos
- **Escalabilidad**: Arquitectura modular y auto-scaling
- **Mantenimiento**: Documentación detallada y procesos automatizados
- **Monitoreo**: Dashboards en tiempo real y alertas proactivas
- **Recuperación**: Backups automáticos y procesos de restore

---

## Checklist de Calidad Pre-Fase 3

Antes de pasar a la Fase 3, verificar:

- ✅ **Long List generada**: ≥10 startups relevantes validadas
- ✅ **Perfiles básicos completos**: Información mínima requerida disponible
- ✅ **Metadatos estructurados**: Trazabilidad completa de búsqueda
- ✅ **Criterios aplicados**: Documentación de filtros y decisiones
- ✅ **Calidad de datos**: Validación cruzada entre fuentes
- ✅ **Performance**: Tiempos de ejecución dentro de parámetros
- ✅ **Documentación**: Proceso completo documentado para auditoría

---

## Próximos Pasos y Conexión con Fase 3

Esta fase se conecta directamente con la **Fase 3 (Análisis y Enriquecimiento)**, donde:

1. **Long List filtrada** → Input principal para análisis profundo
2. **Perfiles básicos** → Base para enriquecimiento con investigación adicional
3. **Metadatos de búsqueda** → Contexto para validación de relevancia
4. **Criterios aplicados** → Base para ajustes en próximas iteraciones

La Fase 3 tomará los outputs estructurados de esta fase para generar:
- Perfiles enriquecidos con investigación profunda
- Análisis de métricas de tracción y tecnología
- Market maps y visualizaciones
- Reportes individuales por startup

---

## Notas de Implementación para el Piloto

### Automatización Prioritaria
- **Búsquedas básicas**: 100% automatizadas (Crunchbase, PitchBook)
- **Investigación web**: 80% automatizada con validación humana
- **Filtrado automático**: 90% automatizado con revisión de edge cases
- **Consolidación**: 100% automatizada con algoritmos de matching

### Intervención Humana
- **Validación de criterios**: Revisión de ficha de búsqueda antes de ejecución
- **Revisión de filtrado**: Validación de startups eliminadas automáticamente
- **Ajustes de parámetros**: Fine-tuning de thresholds y criterios
- **QA final**: Verificación de calidad antes de pasar a Fase 3

### Documentación y Trazabilidad
- **Logs detallados**: Todas las decisiones y resultados documentados
- **Metadatos estructurados**: Formato consistente para auditoría
- **Versionado**: Control de cambios en criterios y configuraciones
- **Reportes**: Resúmenes ejecutivos de cada ejecución

### Iteración y Mejora
- **Feedback loop**: Aprender de cada ejecución para mejorar criterios
- **A/B testing**: Probar diferentes configuraciones de búsqueda
- **Optimización continua**: Mejorar algoritmos basándose en resultados
- **Escalabilidad**: Preparar para volúmenes mayores en producción
