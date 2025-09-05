#!/usr/bin/env python3
"""
Script para iniciar el servidor HTTP local para la aplicación Applus+ Ventures
Uso: python start_server.py [puerto]
"""

import http.server
import socketserver
import sys
import os
import webbrowser
from pathlib import Path

def start_server(port=8000):
    """Inicia el servidor HTTP en el puerto especificado"""
    
    # Cambiar al directorio del script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Configurar el servidor
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print("🚀 Servidor Applus+ Ventures iniciado")
            print(f"📡 Puerto: {port}")
            print(f"🌐 URL: http://localhost:{port}")
            print(f"📁 Directorio: {script_dir}")
            print("\n💡 Presiona Ctrl+C para detener el servidor")
            print("=" * 50)
            
            # Abrir automáticamente el navegador
            webbrowser.open(f'http://localhost:{port}')
            
            # Iniciar el servidor
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: El puerto {port} ya está en uso")
            print(f"💡 Intenta con otro puerto: python start_server.py {port + 1}")
        else:
            print(f"❌ Error al iniciar el servidor: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Servidor detenido")
        print("👋 ¡Hasta luego!")

def main():
    """Función principal"""
    print("🎯 Applus+ Ventures - Servidor de Desarrollo")
    print("=" * 50)
    
    # Verificar que estamos en el directorio correcto
    if not Path("index.html").exists():
        print("❌ Error: No se encontró index.html")
        print("💡 Asegúrate de ejecutar este script desde la carpeta 'code/'")
        sys.exit(1)
    
    # Obtener el puerto del argumento de línea de comandos
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
            if port < 1024 or port > 65535:
                print("❌ Error: El puerto debe estar entre 1024 y 65535")
                sys.exit(1)
        except ValueError:
            print("❌ Error: El puerto debe ser un número")
            print("💡 Uso: python start_server.py [puerto]")
            sys.exit(1)
    
    start_server(port)

if __name__ == "__main__":
    main()
