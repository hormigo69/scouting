#!/bin/bash
# Wrapper script para activar el entorno virtual y ejecutar el conversor

# Obtener la ruta del script actual
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Activar entorno virtual
source "$PROJECT_DIR/.venv/bin/activate"

# Ejecutar el script Python
python "$SCRIPT_DIR/convert_to_markdown.py" "$@"
