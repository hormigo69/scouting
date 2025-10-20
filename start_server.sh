#!/bin/bash
# Script para iniciar el servidor HTTP local para Repsol

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}🎯 Repsol - Servidor de Desarrollo${NC}"
    echo "=================================================="
    echo ""
    echo "Uso: $0 [puerto]"
    echo ""
    echo "Ejemplos:"
    echo "  $0          # Inicia en puerto 8000 (por defecto)"
    echo "  $0 3000     # Inicia en puerto 3000"
    echo "  $0 8080     # Inicia en puerto 8080"
    echo ""
    echo "Presiona Ctrl+C para detener el servidor"
}

# Verificar argumentos
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_help
    exit 0
fi

# Obtener puerto (por defecto 8000)
PORT=${1:-8000}

# Verificar que el puerto sea un número válido
if ! [[ "$PORT" =~ ^[0-9]+$ ]]; then
    echo -e "${RED}❌ Error: El puerto debe ser un número${NC}"
    echo -e "${YELLOW}💡 Uso: $0 [puerto]${NC}"
    exit 1
fi

# Verificar que el puerto esté en rango válido
if [ "$PORT" -lt 1024 ] || [ "$PORT" -gt 65535 ]; then
    echo -e "${RED}❌ Error: El puerto debe estar entre 1024 y 65535${NC}"
    exit 1
fi

# Verificar que estamos en el directorio correcto
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: No se encontró index.html${NC}"
    echo -e "${YELLOW}💡 Asegúrate de ejecutar este script desde la carpeta 'code/'${NC}"
    exit 1
fi

# Mostrar información del servidor
echo -e "${BLUE}🚀 Servidor Repsol iniciado${NC}"
echo -e "${GREEN}📡 Puerto: $PORT${NC}"
echo -e "${GREEN}🌐 URL: http://localhost:$PORT${NC}"
echo -e "${GREEN}📁 Directorio: $(pwd)${NC}"
echo ""
echo -e "${YELLOW}💡 Presiona Ctrl+C para detener el servidor${NC}"
echo "=================================================="

# Intentar abrir el navegador (solo en macOS)
if command -v open &> /dev/null; then
    echo -e "${BLUE}🌐 Abriendo navegador...${NC}"
    open "http://localhost:$PORT" &
fi

# Iniciar el servidor Python
python3 -m http.server "$PORT"
