# Propuesta de Piloto (POC): Automatización de Scouting en Sistemas de Freno Sostenibles

Esta propuesta describe un Piloto o Proof of Concept (POC) enfocado en automatizar las **fases 2 (Búsqueda) y 3 (Análisis)** del proceso de scouting de innovación, utilizando el caso de ejemplo de "sistemas de freno sostenibles para Euro 7". La POC demuestra la generación automática de outputs como perfiles JSON (de agentes Crunchbase y Pitchbook), reportes de deep research (MD) y market maps (CSV), basados en la arquitectura IA descrita en ARQUITECTURA_SISTEMA_IA_v1.md.

El proceso completo tiene 5 fases, pero la **POC se limita a fases 2 y 3** para validar la recopilación y análisis automatizados. Fases 1, 4 y 5 se incluyen para contexto y podrían extenderse en futuras iteraciones.

## 1. Fase de Definición (Fuera de la POC - Preparación)

Esta fase prepara los inputs para la POC, pero no se automatiza aquí.

### Inputs
- Brief inicial del cliente (e.g., necesidad de frenos sin emisiones).
- Contexto regulatorio (Euro 7/CARB).
- Segmentos objetivo (e.g., EVs, automoción ligera).

### Procesamiento
Estructuración manual o asistida del problema, validación con el cliente para generar la pregunta unificada y criterios.

### Outputs
- Pregunta de Negocio Unificada: "¿Qué compañías están desarrollando tecnologías innovadoras para reducir emisiones de frenos?"
- Criterios de Clasificación (e.g., categorías del Market Map).
- Plantillas para outputs (e.g., formato JSON para perfiles).

## 2. Fase de Búsqueda (Incluida en la POC - Recopilación Automatizada)

En la POC, esta fase demuestra la activación de agentes para queries en APIs como Crunchbase y Pitchbook, generando listas brutas y perfiles JSON iniciales.

### Inputs
- Pregunta unificada y criterios de la Fase 1.
- Acceso a fuentes: APIs (Crunchbase, PitchBook), webs, prensa, patentes.

### Procesamiento
- Agente Buscador de Candidatos (Autopilot): Configura y ejecuta queries (e.g., "startups + brake emissions + Euro 7").
- Recopilación masiva y filtrado automático de duplicados/irrelevantes.
- Generación de perfiles JSON básicos.

### Outputs
- Lista bruta de compañías (CSV/JSON con 50-100 entradas: nombre, URL, país, categoría preliminar).
- Perfiles JSON de ejemplo generados automáticamente:
  - Estilo Crunchbase: Ver @point_zero_crunchbase.json (datos básicos como funding, location).
  - Estilo Pitchbook: Ver @point_zero_pitchbook.json (detalles financieros, inversores).

Estos JSON se generan en tiempo real durante el POC para startups como Point Zero.

## 3. Fase de Análisis (Incluida en la POC - Enriquecimiento y Visualización)

En la POC, se enriquece la lista bruta con deep research y se genera el market map, replicando reportes MD y CSV.

### Inputs
- Lista bruta y JSON de la Fase 2.
- Criterios de enriquecimiento (e.g., IP, pilotos).

### Procesamiento
- Agente Enriquecedor de Perfiles (Autopilot): Scraping y análisis de fuentes para insights.
- Generación de reportes MD y categorización.
- Agente Generador de Market Map: Crea visuales y CSV.

### Outputs
- Market Map Actualizado: Ver @Braking_Market_Map.csv (categorías con compañías como Point Zero en "New Brake Concept").
- Shortlist por Categoría (JSON enriquecido).
- Paquetes de Compañía:
  - Deep Research Report: Ver @Point Zero Startup Research Report.md (análisis detallado con secciones como Executive Summary, Key Facts).
  - Perfiles Estructurados: JSON combinados de Fase 2 con insights añadidos.

Estos outputs se producen automáticamente en la POC para 5-10 startups seleccionadas.

## 4. Fase de Evaluación (Fuera del POC - Extensión Futura)

Usa outputs de la POC para scoring y selección.

### Inputs
- Market map y reportes de Fase 3.
- Matriz de scoring.

### Procesamiento
- Scoring automático y análisis de riesgos.

### Outputs
- Ranking priorizado.

## 5. Fase de Documentación (Fuera del POC - Extensión Futura)

Compila todo en reportes finales.

### Inputs
- Outputs de fases anteriores.

### Procesamiento
- Estandarización.

### Outputs
- Informe Ejecutivo y Plan de Integración.