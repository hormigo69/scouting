# Frontend - Paso A: Personalización de Challenge Request

Este frontend implementa el **Paso A** de la **Fase 1** del sistema de scouting de innovación de Applus+ Ventures.

## 🎯 Objetivo

Permitir al equipo de innovación seleccionar y personalizar plantillas de Challenge Request según el dominio específico del reto (automoción, drones, energía, etc.).

## 🚀 Características

### 1. **Selector de Plantillas**
- **Genérica**: Plantilla estándar para cualquier tipo de reto
- **Automoción**: Especializada en Euro 7, normativas UE, TRL
- **Drones/UAS**: Campos específicos para EASA, SORA, BVLOS
- **Energía**: Para retos energéticos, renovables, smart grid

### 2. **Editor de Personalización**
- **Campos**: Añadir, editar, eliminar campos del formulario
- **Validación**: Configurar campos obligatorios y reglas específicas
- **Vista Previa**: Ver cómo quedará el formulario final

### 3. **Funcionalidades Avanzadas**
- Configuración de tipos de campo (texto, área de texto, lista desplegable, etc.)
- Validación automática de campos obligatorios
- Exportación de plantillas personalizadas
- Interfaz responsive y moderna

## 📁 Estructura de Archivos

```
code/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── start_server.py     # Script Python para iniciar servidor
├── start_server.sh     # Script Bash para iniciar servidor
└── README.md           # Este archivo
```

## 🛠️ Cómo Usar

### 1. **Iniciar el Servidor (Recomendado)**
```bash
# Navegar a la carpeta code
cd code

# Opción 1: Script Python (recomendado)
python3 start_server.py

# Opción 2: Script Bash
./start_server.sh

# Opción 3: Con puerto personalizado
python3 start_server.py 3000
./start_server.sh 3000
```

### 2. **Abrir Directamente en Navegador**
```bash
# Navegar a la carpeta code
cd code

# Abrir index.html en un navegador web
open index.html
```

### 3. **Seleccionar Plantilla**
- Haz clic en una de las plantillas disponibles
- Cada plantilla tiene campos predefinidos según el dominio

### 4. **Personalizar Campos**
- **Pestaña Campos**: Editar, añadir o eliminar campos
- **Pestaña Validación**: Ver reglas de validación
- **Pestaña Vista Previa**: Ver el formulario final

### 5. **Guardar y Continuar**
- **Guardar Plantilla**: Exporta la plantilla personalizada
- **Continuar**: Pasa al siguiente paso del proceso

## 🎨 Plantillas Disponibles

### **Genérica**
Campos estándar basados en la plantilla original:
- Challenge Headline
- Problem
- Potential Solutions
- Discarded Solutions
- Number of Startups
- Considerations
- Pilot Project
- Value Proposition
- Applus Team

### **Automoción**
Campos especializados para retos de automoción:
- Euro 7 Compliance
- Minimum TRL
- Emission Focus
- Vehicle Categories
- Regulatory Requirements
- Pilot Timeline

### **Drones/UAS**
Campos específicos para operaciones de drones:
- Operation Type (VLOS/BVLOS)
- EASA Category
- SORA Required
- Payload Requirements
- Flight Altitude
- Weather Conditions

### **Energía**
Campos para retos energéticos:
- Energy Type
- Efficiency Target
- Scale of Application
- Renewable Energy Focus
- Grid Integration

## 🔧 Personalización de Campos

### **Tipos de Campo Disponibles**
- **Texto**: Campo de texto simple
- **Área de Texto**: Para descripciones largas
- **Lista Desplegable**: Opciones predefinidas
- **Casillas de Verificación**: Múltiples selecciones
- **Número**: Campos numéricos
- **Fecha**: Selector de fecha

### **Configuración de Campos**
- Nombre del campo
- Tipo de campo
- Descripción/placeholder
- Campo obligatorio/opcional
- Opciones (para listas y casillas)

## 📊 Flujo del Proceso

```
1. Seleccionar Plantilla Base
   ↓
2. Personalizar Campos
   ↓
3. Configurar Validaciones
   ↓
4. Vista Previa
   ↓
5. Guardar Plantilla
   ↓
6. Continuar al Paso B
```

## 🎯 Próximos Pasos

Este frontend se integra con el flujo completo de la Fase 1:

- **Paso A**: ✅ Personalización de Formulario (este frontend)
- **Paso B**: Respuesta por Parte de la Unidad de Negocio
- **Paso C**: Revisión con IA
- **Paso D**: Entrevista para Completar

## 🔮 Funcionalidades Futuras

- Integración con backend para guardar plantillas
- Plantillas dinámicas basadas en IA
- Validación en tiempo real
- Colaboración en tiempo real
- Historial de versiones de plantillas

## 🐛 Solución de Problemas

### **El frontend no carga**
- Verifica que todos los archivos estén en la misma carpeta
- Abre el archivo `index.html` directamente en el navegador

### **Los estilos no se aplican**
- Verifica que `styles.css` esté en la misma carpeta
- Revisa la consola del navegador para errores

### **JavaScript no funciona**
- Verifica que `script.js` esté en la misma carpeta
- Revisa la consola del navegador para errores JavaScript

## 📝 Notas Técnicas

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Responsive**: Compatible con dispositivos móviles
- **Sin dependencias**: No requiere frameworks externos
- **Modular**: Fácil de extender y modificar

---

**Desarrollado para Applus+ Ventures - Sistema de Scouting de Innovación**
