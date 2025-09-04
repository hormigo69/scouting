# Conversor de Documentos a Markdown

Script para convertir archivos PDF, DOCX y PPTX a formato Markdown.

## Características

- ✅ **PDF**: Extrae texto y detecta títulos automáticamente
- ✅ **DOCX**: Preserva estilos de encabezados y tablas
- ✅ **PPTX**: Convierte diapositivas manteniendo estructura
- 🎯 **Ubicación**: Guarda el archivo .md en la misma carpeta
- 🔧 **Flexible**: Opción de salida personalizada

## Instalación

1. **Activar entorno virtual**:
   ```bash
   source .venv/bin/activate
   ```

2. **Instalar dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

## Uso

### Conversión básica
```bash
# Convierte y guarda en la misma ubicación
python convert_to_markdown.py documento.pdf
python convert_to_markdown.py presentacion.pptx
python convert_to_markdown.py informe.docx
```

### Conversión con salida personalizada
```bash
# Guarda en ubicación específica
python convert_to_markdown.py documento.pdf -o /ruta/salida.md
```

## Formatos soportados

| Formato | Extensión | Descripción |
|---------|-----------|-------------|
| PDF | `.pdf` | Extrae texto y detecta títulos |
| Word | `.docx` | Preserva estilos y tablas |
| PowerPoint | `.pptx` | Convierte diapositivas |

## Ejemplos de salida

### PDF
```markdown
## Página 1

## TÍTULO PRINCIPAL
### Subtítulo:
Contenido del párrafo...
```

### DOCX
```markdown
# Título Principal
## Subtítulo
### Sub-subtítulo

Contenido del párrafo...

| Columna 1 | Columna 2 |
|-----------|-----------|
| Dato 1    | Dato 2    |
```

### PPTX
```markdown
# Título de la Presentación

## Diapositiva 1

### Título de diapositiva
Contenido de la diapositiva...

---

## Diapositiva 2
```

## Solución de problemas

### Error de dependencias
```bash
pip install python-docx python-pptx PyPDF2 markdown
```

### Permisos de archivo
```bash
chmod +x convert_to_markdown.py
```

## Notas técnicas

- **Codificación**: UTF-8 para compatibilidad internacional
- **Memoria**: Procesa archivos página por página para eficiencia
- **Formato**: Markdown estándar compatible con GitHub, GitLab, etc.
