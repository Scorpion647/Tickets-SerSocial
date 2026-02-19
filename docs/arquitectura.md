# Arquitectura del Sistema - Tickets SerSocial

## Decisiones Técnicas

- **Backend: Django.** Elegí Django porque incluye ORM, panel de administración, autenticación y Django REST Framework listos para usar. Esto me permitió construir rápidamente la API, gestionar usuarios y roles, y mantener la seguridad sin tener que configurar todo desde cero. Aunque habia otras alternativas opte por esta ya que es la mas conocida para mi experiencia y tiene una amplia gama de herramientas que me facilitaban mucho el desarrollo del backend sin tener que escribir demasiado codigo

- **Frontend: Next.js.** Lo elegi porque es un framework el cual ya he trabajado y necesitaba un framework que diera buena experiencia de usuario y fuera fácil de desarrollar. Next.js ofrece renderizado híbrido (SSR/CSR), enrutamiento basado en archivos y un ecosistema muy maduro.

- **Base de datos: PostgreSQL.** Para desarrollo local, SQLite es más simple, pero como la idea del proyecto es tomar esto como un caso real entonces elegi PostgreSQL
Para que desde el primer momento ya estuviera listo el proyecto para poder ser escalable. Este cuenta con mejor rendimiento manejando grandes cantidades de datos y es un
estandar a la hora de hablar de entornos reales.

## Flujo de Datos Principal

1. El usuario inicia sesión y obtiene un token JWT.
2. Las peticiones a la API incluyen el token en la cabecera `Authorization`.
3. El backend valida el token y aplica permisos según el rol (agente/solicitante).
4. Los tickets y comentarios se almacenan en PostgreSQL con relaciones entre tablas.
5. El frontend consume la API paginada y aplica filtros en tiempo real.

## Diagrama de Alto Nivel

```mermaid
graph TD
    A[Cliente Web] --> B[Next.js Frontend]
    B --> C{API REST}
    C --> D[Django Backend]
    D --> E[(PostgreSQL)]
    
    B --> F[Autenticación JWT]
    D --> F
    
    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#dfd,stroke:#333
    style D fill:#bbf,stroke:#333
    style E fill:#fbb,stroke:#333



