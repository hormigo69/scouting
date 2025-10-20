#!/usr/bin/env python3
"""
Script para iniciar el servidor HTTP local para la aplicación Repsol Scouting
Uso: python start_server.py [puerto]
"""

import http.server
import socketserver
import sys
import os
import webbrowser
from pathlib import Path
import json
from datetime import datetime

def start_server(port=8000):
    """Inicia el servidor HTTP en el puerto especificado"""
    
    # Cambiar al directorio del script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Directorio de ficheros
    files_dir = script_dir / "files"
    files_dir.mkdir(parents=True, exist_ok=True)
    
    # Configurar el servidor con un handler personalizado
    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def _send_json(self, code=200, payload=None):
            self.send_response(code)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            if payload is not None:
                self.wfile.write(json.dumps(payload, ensure_ascii=False).encode('utf-8'))

        def do_OPTIONS(self):
            # Opcional: soporte básico para preflight en el mismo origen
            self.send_response(204)
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

        def do_POST(self):
            if self.path == '/api/save-interview':
                try:
                    content_length = int(self.headers.get('Content-Length', 0))
                    raw_body = self.rfile.read(content_length) if content_length > 0 else b''
                    if not raw_body:
                        return self._send_json(400, {"ok": False, "error": "Cuerpo vacío"})

                    try:
                        payload = json.loads(raw_body.decode('utf-8'))
                    except Exception:
                        return self._send_json(400, {"ok": False, "error": "JSON inválido"})

                    data = payload.get('data', payload)
                    if data is None:
                        return self._send_json(400, {"ok": False, "error": "Falta campo 'data'"})

                    # Nombre de archivo opcional
                    provided_filename = payload.get('filename')
                    if isinstance(provided_filename, str) and provided_filename.strip():
                        # Sanitizar: usar solo el nombre base y forzar extensión .json
                        base_name = os.path.basename(provided_filename).rsplit('.', 1)[0]
                        filename = f"{base_name}.json"
                    else:
                        timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
                        filename = f"interview-results-{timestamp}.json"

                    target_path = files_dir / filename
                    with target_path.open('w', encoding='utf-8') as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)

                    return self._send_json(200, {
                        "ok": True,
                        "filename": filename,
                        "relative_path": f"files/{filename}"
                    })
                except Exception as e:
                    return self._send_json(500, {"ok": False, "error": f"Error interno: {e}"})
            else:
                return super().do_POST()

    handler = CustomHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print("🚀 Servidor Repsol iniciado")
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
    print("🎯 Repsol - Servidor de Desarrollo")
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
