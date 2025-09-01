# Pitchbook

## Contexto
Pitchbook es una plataforma de investigación de empresas y startups.


## Información general que devuelve la API de Pitchbook
- Company
    - Identificadores PitchBook, bio corporativa, industria(s), ubicación, estado operativo, website.
    - Financiación: rondas recientes y pasadas, inversores participantes, métricas resumidas.
    - Señales/eventos: cambios ejecutivos, liquidez (exits), M&A relacionados.
    - Deal (VC/PE/M&A/Debt)
        - Tipo de operación, fecha, tamaño, valoración (si aplica), stake, estructura, compradores/vendedores, asesores.
        - Deal stock information para el breakdown de títulos/acciones cuando esté disponible.
    - Investor (firmas VC/PE/Corp VC, etc.)
        - Identidad del inversor, thesis, check size típico (cuando consta), sectores/etapas objetivo, portfolio y ritmo inversor.
-  Fund
        - Nombre del fondo, vintage year, tamaño (target/closed), estrategia, gestora, holdings y vínculos con LPs. (PitchBook estructura fondos e inversores como datasets separados con relaciones).
    - Limited Partner (LP)
        - AUM, asset allocation, commitment preferences/mandates y foco de inversión (según la guía pública de su proceso de datos).
    - Service Provider (advisors)
        - Firmas de servicios (legales, banca de inversión, auditoría, etc.) vinculadas a deals y compañías.
    - Person (People/Executives)
        - Ejecutivos y board members, biografías, cargos, cambios de rol vinculados a compañías/deals. La API está pensada, entre otras cosas, para detectar “inflection points” como cambios ejecutivos.
    - VC Exit Predictor (ML)
Para compañías VC-backed con criterios mínimos (≥2 rondas en 6 años, etc.), la API expone:
        - Success Class (Exit vs No Exit), Predicted Exit Type (IPO vs M&A).
        - Success/IPO/M&A/No Exit Probabilities (porcentajes).
        - Opportunity Score (percentil de retorno estimado).
    - PitchBook publica metodología y casos de uso en su Help Center.
Filtros disponibles
    - La API permite aplicar criterios amplios y puedes filtrar por:
        - Ubicación (país, región, ciudad, o solo HQ)
        - Industria, subdividida en tres capas:
            - Primary Industry Sector (categoría amplia)
            - Primary Industry Group (subcategoría más específica)
            - Primary Industry Code (nivel aún más granular)
            - Verticals o “Emerging Spaces”, que permiten filtrar por áreas de interés o tecnologías emergentes que suelen cruzar industrias
            - Keywords: búsqueda por palabras clave, con sugerencias inteligentes durante la escritura
            - Fecha/rango temporal: por ejemplo, búsqueda de deals en un periodo específico
            - Estado de empresa o deal: filtrado por deals completados, solo el más reciente, exits, etc.

además de esta info tenemos la bio corporativa y el enlace a las web de estas

Parece que puede devolver algo de granularidad con las variables de Industria, en tres capas:
    - Primary Industry Sector (categoría amplia)
    - Primary Industry Group (subcategoría más específica)
    - Primary Industry Code (nivel aún más granular)
y con Verticals o "Emerging Spaces", que permiten filtrar por áreas de interés o tecnologías emergentes que suelen cruzar industrias

## Contacto y Acceso a la API

### Información de contacto
**Patrick Wong, CFA**  
Account Development Manager, Direct Data  
Saffron House | 6-10 Kirby Street  
Holborn | London | EC1N 8TS  
Phone: +44 (0) 20 8156 6367  
Email: Patrick.Wong@pitchbook.com  
Web: https://www.pitchbook.com

### Especificaciones técnicas de la API

#### Arquitectura
- **Tipo**: RESTful API
- **Formato de salida**: JSON
- **Autenticación**: Disponible (detalles en documentación técnica)
- **Paginación**: Implementada

#### Documentación técnica
- **Guía técnica con ejemplos**: https://documenter.getpostman.com/view/5190535/TzCV1iRc
- **Archivos de referencia**:
  - Pitchbook API V2 Endpoints.xlsx (lista de endpoints disponibles)
  - Pitchbook API V2 Sandbox Entities.xlsx (entidades disponibles en sandbox)

#### Entorno de pruebas (Sandbox)
- **Duración**: 2 semanas
- **Limitaciones**: Sin límites de rate, disponibilidad de la mayoría de endpoints
- **Restricción**: Número preseleccionado de IDs que se pueden consultar
- **Disponibilidad**: Sí, se puede proporcionar clave de sandbox

#### Limitaciones y licencias
- **Uso**: Solo para uso interno, redistribución no permitida
- **Almacenamiento**: Válido durante la duración del contrato activo (mínimo 1 año)
- **Rate limits**: Sin límites en entorno sandbox
- **Análisis piloto**: Solo análisis interno, con restricciones de caching/retención y redistribución

### Ejemplos de datos disponibles

La API puede proporcionar ejemplos de:
1. **Perfil de empresa completo**
2. **Ronda de financiación reciente** (con inversores)
3. **Consulta de búsqueda con filtros** (industria/keywords, ubicación HQ, rango de empleados, fecha/etapa de última financiación)

### Objetos principales y diccionario de datos

Los objetos clave incluyen diccionarios de campos para:
- **Company/Organization**: Perfiles corporativos completos
- **Funding Round/Deal**: Detalles de rondas de financiación
- **Investor/Fund**: Información de inversores y fondos






