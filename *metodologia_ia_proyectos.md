# Proceso Asistido por IA para Proyectos

## Introducción
Este documento detalla un proceso estructurado para trabajar en proyectos utilizando un editor de IA (como Cursor) que mantiene el contexto a través de carpetas dedicadas. El objetivo es incorporar documentación (transcripciones, documentos técnicos, propuestas) para generar outputs eficientes, pensar sobre el proyecto y colaborar con un asistente IA integrado.

El proceso se inspira en conceptos como el uso de Markdown para documentación, RAG (Retrieval-Augmented Generation) nativo en herramientas como Cursor, y reflexiones de expertos como Andrej Karpathy sobre la transformación de conocimiento para LLMs. Se enfatiza en mantener "higiene de repositorios" para cada proyecto, utilizando plantillas, ejemplos y reglas para potenciar la IA.

## Estructura de Carpetas
Para mantener el contexto, cada proyecto tiene su propia carpeta o repositorio. Esto permite que la IA acceda fácilmente a la documentación relevante.

- **Carpeta Principal del Proyecto** (ej: /Proyectos/NombreProyecto/):
  - **README.md**: Descripción general del proyecto, objetivos, stakeholders y reglas de uso de IA (ej: "Ser adversarial y crítico en revisiones").
  - **docs/**: Documentación técnica, transcripciones de reuniones, papers o referencias.
    - transcripciones/reunion_inicial.md
    - docs_tecnicos/especificaciones.md
  - **plantillas/**: Plantillas reutilizables (ej: email.md, propuesta.md).
  - **examples/**: Ejemplos de outputs previos (ej: emails pasados, propuestas exitosas).
  - **reglas/**: Archivos con instrucciones para IA (ej: reglas_estilo.md con directivas como "Ser crítico, identificar fallos").
  - **outputs/**: Generados por IA (ej: propuesta_final.md, informe_investigacion.md).
  - **memoria/**: Archivos para memoria persistente (ej: memoria_proyecto.md con actualizaciones de IA).
  - **.teamwork**: Archivo para integración con herramientas como Teamwork (ID de proyecto).

Esta estructura permite que la IA use RAG para consultar contexto automáticamente en herramientas como Cursor.

## Proceso Detallado
El proceso cubre desde la reunión inicial con un cliente hasta la entrega, asistido por IA en cada paso.

### 1. Reunión Inicial con Cliente
- **Preparación**: Crea una subcarpeta "reuniones/" en el proyecto. Usa una plantilla de reunión (plantillas/reunion.md) con secciones para agenda, notas y preguntas clave.
- **Durante la Reunión**: Toma notas en un MD temporal. Usa IA para sugerir preguntas en tiempo real (ej: "@cursor: Basado en notas, sugiere preguntas críticas").
- **Post-Reunión**:
  - Transcribe y resume con IA: "@cursor: Resume esta transcripción y extrae requisitos clave".
  - Almacena en docs/transcripciones/reunion_inicial.md.
  - IA adversarial: "@cursor: Scrutinize this summary – identify flaws, assumptions, risks".

### 2. Investigación Asistida
- **Búsqueda Inicial**: Usa herramientas como codebase_search o grep para explorar documentación existente.
- **Generación de Conocimiento**: Inspirado en Karpathy, transforma PDFs/papers en formatos LLM-legibles (Markdown con ejemplos). Opcionalmente, genera problemas sintéticos si el proyecto requiere entrenamiento o variaciones infinitas (puede ser overkill para seguimiento general, ya que distrae de outputs prácticos y añade complejidad innecesaria).
- **Herramientas Genéricas Adicionales**: Incorpora herramientas como Deep Research o el navegador Comet para búsquedas avanzadas; esta fase es human-based, guiada por el usuario pero asistida por IA para refinar y expandir resultados.
- **IA Asistida**: "@cursor: Investiga [tema] basado en docs/ y genera informe con gaps y riesgos".
- **Almacenamiento**: Guarda en docs/investigacion/[tema].md. Usa sintéticos para expandir solo si es relevante (ej: problemas de relojes como en el ejemplo de Karpathy).

### 3. Generación de Propuesta
- **Estructura**: Usa plantilla (plantillas/propuesta.md) con secciones: Objetivos, Alcance, Riesgos, Presupuesto.
- **Asistencia IA**:
  - "@cursor: Genera propuesta basada en transcripciones y reglas_estilo.md. Sé crítico: identifica trade-offs".
  - Incorpora investigación: "@cursor: Integra hallazgos de investigacion.md".
- **Revisión**: Usa personalidad adversarial: "@cursor: Examina esta propuesta – cuestiona factibilidad, escalabilidad".
- **Outputs**: Guarda en outputs/propuesta_v1.md. Itera con versiones.

### 4. Desarrollo y Ejecución del Proyecto
- **Tareas**: Integra con Teamwork (usa .teamwork para IDs). "@cursor: Crea tareas basadas en propuesta".
- **Colaboración IA**: Para coding o docs, usa autocomplete y agente en Cursor.
  - Memoria: IA actualiza memoria_proyecto.md con insights (push changes manualmente).
- **Entornos de RL (Inspirado en Karpathy)**: Crea "entornos" para práctica (ej: simulaciones de problemas en MD con generadores sintéticos).

### 5. Revisión y Cierre
- **Revisión Final**: "@cursor: Analiza todo el proyecto – identifica gaps, lecciones aprendidas".
- **Archivo**: Mueve a carpeta completada, actualiza README con resumen.

## Mejores Prácticas
- **Higiene de Repos**: Un repo por proyecto/subproyecto. Usa Markdown para todo.
- **Integración IA**: En Cursor, usa @ para consultas contextuales. Para no-coders, wrappea en interfaz simple.
- **Personalidades IA**: Usa prompts como el adversarial para revisiones críticas.
- **Escalabilidad**: Para normies, templates preconfiguradas (salud, emails, YouTube scripts).
- **Inspiraciones**:
  - Karpathy: Transforma conocimiento a formatos LLM (SFT, RL environments).
  - Comunidad: Repos con docs en MD como "second brain".

## Estructura para Equipos
Para escalar este proceso a un equipo, integra herramientas colaborativas y automatizaciones que faciliten el trabajo compartido y reduzcan fricciones.

- **Seguimiento en GitHub**: Usa repositorios compartidos en GitHub para cada proyecto. Crea branches por feature o tarea (ej: branch 'investigacion-temaX'), y utiliza pull requests para revisiones colaborativas. Integra issues para tracking de tareas, asignando labels como 'IA-Revision' para prompts adversariales. Esto permite que el equipo revise cambios en documentación y outputs de IA de manera versionada.

- **Repos de Plantillas**: Mantén un repositorio central de plantillas (ej: github.com/equipo/plantillas-proyectos) con estructuras base (README.md, carpetas docs/, plantillas/, etc.). Los equipos pueden clonar o fork este repo al iniciar un proyecto nuevo, asegurando consistencia. Actualiza el repo central con mejoras comunitarias.

- **Automatización de Creación de Estructura**: Desarrolla scripts simples (ej: en Python o bash) para generar la estructura de carpetas automáticamente. Por ejemplo, un script 'init_proyecto.sh' que cree las carpetas y copie plantillas. Integra con GitHub Actions para automatizar setups al crear un repo nuevo, o usa herramientas como Cookiecutter para templates parametrizados.

Esta estructura fomenta colaboración, mantiene el contexto compartido y automatiza tareas repetitivas, haciendo el proceso más eficiente para equipos.

