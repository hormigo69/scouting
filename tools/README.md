# 🛠️ Herramientas del Proyecto

Esta carpeta contiene herramientas útiles para el proyecto Applus - Scouting de Innovación.

## 📁 Contenido

### 🔄 Conversor de Documentos
- **`convert_to_markdown.py`** - Script principal para convertir PDF, DOCX y PPTX a Markdown
- **`convert.sh`** - Wrapper bash que activa automáticamente el entorno virtual
- **`requirements.txt`** - Dependencias Python necesarias
- **`README_conversor.md`** - Documentación completa del conversor

## 🚀 Uso Rápido

### Conversor de Documentos

#### Opción 1: Script wrapper (Recomendado)
```bash
# Desde cualquier ubicación
./tools/convert.sh documento.pdf

# O desde la carpeta tools
./convert.sh documento.pdf
```

#### Opción 2: Activación manual del entorno virtual
```bash
# Activar entorno virtual
source ../.venv/bin/activate

# Instalar dependencias (solo la primera vez)
pip install -r requirements.txt

# Convertir archivo
python convert_to_markdown.py documento.pdf
```

## 📋 Próximas Herramientas

- [ ] Analizador de documentos PDF
- [ ] Extractor de datos de APIs
- [ ] Generador de reportes automáticos
- [ ] Validador de formatos de archivo

## 🔧 Mantenimiento

- Todas las herramientas deben incluir su propio `requirements.txt`
- Documentar cada herramienta en un README separado
- Mantener compatibilidad con el entorno virtual del proyecto
- El script wrapper `convert.sh` facilita el uso sin activar manualmente el entorno virtual
