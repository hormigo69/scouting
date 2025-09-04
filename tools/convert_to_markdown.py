#!/usr/bin/env python3
"""
Script para convertir archivos PDF, DOCX y PPT a Markdown
Uso: python convert_to_markdown.py <ruta_archivo>
"""

import sys
import os
import argparse
from pathlib import Path
from typing import Optional

# Importar librerías de conversión
try:
    from docx import Document
    from pptx import Presentation
    import PyPDF2
    import markdown
except ImportError as e:
    print(f"Error: Falta instalar dependencias: {e}")
    print("Ejecuta: pip install python-docx python-pptx PyPDF2 markdown")
    sys.exit(1)


def pdf_to_markdown(pdf_path: str) -> str:
    """Convierte un archivo PDF a Markdown"""
    markdown_content = []
    
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            for page_num, page in enumerate(pdf_reader.pages, 1):
                text = page.extract_text()
                if text.strip():
                    # Limpiar y formatear el texto
                    lines = text.split('\n')
                    formatted_lines = []
                    
                    for line in lines:
                        line = line.strip()
                        if line:
                            # Detectar títulos por longitud y formato
                            if len(line) < 100 and line.isupper():
                                formatted_lines.append(f"## {line}")
                            elif len(line) < 50 and line.endswith(':'):
                                formatted_lines.append(f"### {line}")
                            else:
                                formatted_lines.append(line)
                    
                    if formatted_lines:
                        markdown_content.append(f"\n## Página {page_num}\n")
                        markdown_content.extend(formatted_lines)
                        markdown_content.append("")
                        
    except Exception as e:
        print(f"Error al procesar PDF: {e}")
        return ""
    
    return '\n'.join(markdown_content)


def docx_to_markdown(docx_path: str) -> str:
    """Convierte un archivo DOCX a Markdown"""
    markdown_content = []
    
    try:
        doc = Document(docx_path)
        
        for paragraph in doc.paragraphs:
            text = paragraph.text.strip()
            if not text:
                continue
                
            # Detectar estilos de párrafo
            if paragraph.style.name.startswith('Heading 1'):
                markdown_content.append(f"# {text}")
            elif paragraph.style.name.startswith('Heading 2'):
                markdown_content.append(f"## {text}")
            elif paragraph.style.name.startswith('Heading 3'):
                markdown_content.append(f"### {text}")
            elif paragraph.style.name.startswith('Heading'):
                markdown_content.append(f"#### {text}")
            else:
                markdown_content.append(text)
            
            markdown_content.append("")
        
        # Procesar tablas
        for table in doc.tables:
            markdown_content.append("\n| " + " | ".join([cell.text for cell in table.rows[0].cells]) + " |")
            markdown_content.append("| " + " | ".join(["---"] * len(table.rows[0].cells)) + " |")
            
            for row in table.rows[1:]:
                markdown_content.append("| " + " | ".join([cell.text for cell in row.cells]) + " |")
            
            markdown_content.append("")
            
    except Exception as e:
        print(f"Error al procesar DOCX: {e}")
        return ""
    
    return '\n'.join(markdown_content)


def pptx_to_markdown(pptx_path: str) -> str:
    """Convierte un archivo PPTX a Markdown"""
    markdown_content = []
    
    try:
        prs = Presentation(pptx_path)
        
        for slide_num, slide in enumerate(prs.slides, 1):
            markdown_content.append(f"\n## Diapositiva {slide_num}\n")
            
            for shape in slide.shapes:
                if hasattr(shape, "text") and shape.text.strip():
                    text = shape.text.strip()
                    
                    # Detectar títulos de diapositiva
                    if slide_num == 1 and "title" in shape.name.lower():
                        markdown_content.append(f"# {text}")
                    elif "title" in shape.name.lower():
                        markdown_content.append(f"### {text}")
                    else:
                        markdown_content.append(text)
                    
                    markdown_content.append("")
            
            markdown_content.append("---")
            
    except Exception as e:
        print(f"Error al procesar PPTX: {e}")
        return ""
    
    return '\n'.join(markdown_content)


def convert_file(file_path: str) -> Optional[str]:
    """Convierte un archivo a Markdown según su extensión"""
    file_path = Path(file_path)
    
    if not file_path.exists():
        print(f"Error: El archivo {file_path} no existe")
        return None
    
    file_extension = file_path.suffix.lower()
    
    if file_extension == '.pdf':
        return pdf_to_markdown(str(file_path))
    elif file_extension == '.docx':
        return docx_to_markdown(str(file_path))
    elif file_extension == '.pptx':
        return pptx_to_markdown(str(file_path))
    else:
        print(f"Error: Formato no soportado: {file_extension}")
        print("Formatos soportados: .pdf, .docx, .pptx")
        return None


def save_markdown(content: str, original_path: str) -> bool:
    """Guarda el contenido Markdown en un archivo"""
    try:
        original_path = Path(original_path)
        markdown_path = original_path.with_suffix('.md')
        
        with open(markdown_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Archivo convertido guardado como: {markdown_path}")
        return True
        
    except Exception as e:
        print(f"Error al guardar archivo: {e}")
        return False


def get_file_path_interactively() -> str:
    """Pide interactivamente la ruta del archivo a convertir"""
    print("\n🔄 Conversor de Documentos a Markdown")
    print("=" * 40)
    
    while True:
        # Mostrar archivos disponibles en el proyecto
        print("\n📁 Archivos disponibles en el proyecto:")
        print("docs/docs_cliente/")
        print("  - Applus Presentación Corporativa 2024.pdf")
        print("  - A+ Template_CHALLENGE REQUEST 3.docx")
        print("  - Challenge request con ejemplo BVLOS.docx")
        print("  - Market Map y Perfil de Compañia.pdf")
        print("\nexamples/")
        print("  - Braking_Market_Map.csv")
        print("  - plantilla crunchbase.json")
        print("  - plantilla pitchbook.json")
        
        print("\n💡 Tip: Puedes usar rutas relativas como 'docs/docs_cliente/documento.pdf'")
        
        file_path = input("\n📂 Introduce la ruta del archivo a convertir: ").strip()
        
        if not file_path:
            print("❌ Por favor, introduce una ruta válida")
            continue
        
        # Verificar si el archivo existe
        if os.path.exists(file_path):
            return file_path
        else:
            print(f"❌ El archivo '{file_path}' no existe")
            print("💡 Verifica la ruta y vuelve a intentarlo")


def main():
    parser = argparse.ArgumentParser(
        description="Convierte archivos PDF, DOCX y PPT a Markdown",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos de uso:
  python convert_to_markdown.py documento.pdf
  python convert_to_markdown.py presentacion.pptx
  python convert_to_markdown.py informe.docx
  
Si no se proporciona archivo, el script pedirá la ruta interactivamente.
        """
    )
    
    parser.add_argument(
        'archivo',
        nargs='?',  # Hacer el argumento opcional
        help='Ruta del archivo a convertir (PDF, DOCX o PPTX)'
    )
    
    parser.add_argument(
        '--output', '-o',
        help='Ruta de salida para el archivo Markdown (opcional)'
    )
    
    args = parser.parse_args()
    
    # Si no se proporciona archivo, pedirlo interactivamente
    if not args.archivo:
        file_path = get_file_path_interactively()
    else:
        file_path = args.archivo
    
    # Verificar que el archivo existe
    if not os.path.exists(file_path):
        print(f"❌ Error: El archivo '{file_path}' no existe")
        sys.exit(1)
    
    print(f"🔄 Convirtiendo: {file_path}")
    
    # Convertir archivo
    markdown_content = convert_file(file_path)
    
    if markdown_content is None:
        print("❌ Error en la conversión")
        sys.exit(1)
    
    # Guardar archivo
    if args.output:
        # Guardar en ubicación personalizada
        try:
            with open(args.output, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            print(f"✅ Archivo guardado como: {args.output}")
        except Exception as e:
            print(f"❌ Error al guardar en {args.output}: {e}")
            sys.exit(1)
    else:
        # Guardar en la misma ubicación
        if not save_markdown(markdown_content, file_path):
            sys.exit(1)
    
    print("🎉 Conversión completada exitosamente")


if __name__ == "__main__":
    main()
