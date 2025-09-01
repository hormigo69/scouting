
# 

# 

# 

# 

# 

# **PROPUESTA DE COLABORACIÓN**

1. ### DESCRIPCIÓN.

Este proyecto tiene como objetivo **implementar una solución de seguridad** que proteja el acceso a un entorno de monitorización (instnacias de Grafana) y a sus respectivas APIs de datos mediante **autenticación basada en AWS Cognito** y un flujo seguro de tráfico con **CloudFront, WAF, API Gateway, Lambdas y ALB**.

Se eliminan componentes anteriores (como Nginx) para **simplificar la arquitectura** y **reforzar la seguridad**.

La solución debe estar automatizada mediante **Terraform** y **pipelines CI/CD**, garantizando la trazabilidad, la gestión de usuarios segura y el cumplimiento de buenas prácticas de AWS.

2. ### ALCANCE.

El alcance y las características de la solución propuesta son los siguientes que se listan a continuación:

* Diseño y construcción de la infraestructura necesaria para la autenticación segura mediante Cognito (User Pools e Identity Pools).  
* Protección de tráfico de entrada con WAF y CloudFront.  
* Implementación de funciones Lambda para validar, obtener y refrescar tokens.  
* Despliegue de API Gateway como puerta de entrada a servicios internos, autenticado con Cognito (sin API Key).  
* Actualización del balanceador ALB para enrutar tráfico hacia múltiples entornos Kubernetes organizados por namespace, eliminando Nginx.  
* Federación de cada instancia de Grafana con Cognito para habilitar Single Sign-On (SSO).  
* Pruebas funcionales y de seguridad antes de poner en producción.  
* Automatización completa mediante Terraform y CI/CD.  
* Documentación completa del proyecto.

**No incluye**: Rediseño de Grafana ni modificaciones funcionales en las APIs de datos.

3. ### DESCRIPCIÓN DE LA SOLUCIÓN.

El diagrama ilustra la arquitectura de seguridad diseñada para proteger el acceso a los servicios internos, específicamente diversas instancias de Grafana y sus APIs asociadas desplegadas en múltiples namespaces dentro de Kubernetes, utilizando autenticación basada en AWS Cognito y un flujo de tráfico seguro.

Desde el exterior, las peticiones de los usuarios pasan primero por **AWS WAF** (Web Application Firewall) y luego por **CloudFront**, donde una función de filtrado de cabeceras refuerza los controles de seguridad.

A partir de ahí, el tráfico se bifurca según el destino:

* **Acceso a Grafana**: CloudFront redirige las solicitudes al **Application Load Balancer (ALB)**, que enruta el tráfico hacia la instancia de Grafana correspondiente dentro del namespace de Kubernetes adecuado. La autenticación se realiza mediante federación con **Cognito**.  
* **Acceso a la API**: CloudFront pasa la solicitud al **API Gateway**, que interactúa con funciones **Lambda** personalizadas (`token`, `refresh_token`, `validate_token`) para gestionar la validación y renovación de tokens de autenticación basados en Cognito.

Todo el flujo garantiza que **solo usuarios autenticados** y autorizados puedan interactuar con los recursos internos y permite **escalar horizontalmente** el número de entornos sin duplicar la arquitectura.

Esta solución se adapta a entornos diferenciados mediante namespaces (`NS VERTIPORT`), garantizando segmentación, trazabilidad y control por entorno.

	

![][image1]

4. ### CRONOGRAMA Y PRESUPUESTO.

Las tareas estimadas para el servicio propuesto, se desglosa a continuación con el detalle de cada una y el presupuesto estimado para ello:

| CATEGORÍA | TAREA |
| :---: | :---: |

| PREPARACIÓN DE PROYECTO | Revisar requisitos, planificar recursos y configurar entorno inicial |
| :---: | ----- |
| ARQUITECTURA. DISEÑO DE LA SOLUCIÓN | Definir arquitectura, componentes y flujos de datos para cumplir requisitos |
| TERRAFORMACIÓN COGNITO | Crear infraestructura de Cognito con Terraform para User y Identity Pools |
| CONFIGURACIÓN COGNITO (USER POOL \+ IDENTITY POOL) | Ajustar políticas, atributos y roles de usuarios e identidades |
| CONFIGURACIÓN Y TERRAFORMADO CLOUDFRONT | Desplegar distribución CloudFront con Terraform, OAI/OAC y comportamientos |
| DESARROLLO LAMBDAS COGNITO (VALIDATE, REFRESH Y TOKEN) | Implementar funciones Lambda para obtener, validar y renovar tokens |
| INTEGRACIÓN CI/CD LAMBDAS | Configurar pipeline para despliegue automático de Lambdas en entornos |
| TERRAFORMADO Y CONFIGURACIÓN API GATEWAY | Provisionar API Gateway con Terraform y definir rutas, métodos y autorizaciones sustituyendo el uso de API Key por Token de Cognito |
| ELIMINAR NGINX Y MODIFICAR LOAD BALANCER | Desplegar nueva configuración sin Nginx, ajustando Load Balancer a tráfico directo |
| MOVER EL CERTIFICADO A CLOUDFRONT (TERMINAR TLS) | Importar certificado SSL a CloudFront y habilitar HTTPS en la distribución |
| FEDERACIÓN GRAFANA CON COGNITO | Integrar Grafana con Cognito para autenticación única y gestión de usuarios |
| PRUEBAS DEL SISTEMA | Ejecutar pruebas funcionales, de carga y seguridad en todos los componentes desplegados |
| AJUSTES Y PUESTA EN PRODUCCIÓN | Afinar configuración, corregir incidencias y promover la solución a producción |
| DOCUMENTACIÓN | Redactar guías de usuario, operacionales y diagramas de arquitectura |
| GESTIÓN DE PROYECTO | Toma de requisitos y gestión de objetivos de proyecto |
|  | Gestión y coordinación de equipo |
| TOTAL | 12.072€ |

## 

## Fuera de alcance

Todo lo que no se incluye en la presente propuesta o no se especifica estará fuera de alcance. De aparecer funcionalidades no especificadas, se tratará en la fase de definición y se consensuará entre ambas partes su inclusión en el alcance y cómo afecta al precio.

