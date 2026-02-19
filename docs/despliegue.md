# Guía corta de despliegue

Este proyecto puede desplegarse de dos formas principales:

1. **Todo en local** con Docker Compose.
2. **Backend en Render + Frontend en Vercel**.

## 1) Despliegue local (Docker Compose)

### Requisitos
- Docker 24+
- Docker Compose v2.20+

### Pasos
1. Crear archivo de entorno:
   ```bash
   cp .env.example .env
   ```
2. Levantar servicios:
   ```bash
   docker compose up --build -d
   ```
3. Ejecutar migraciones:
   ```bash
   docker compose exec backend python manage.py migrate
   ```
4. (Opcional) Cargar seed:
   ```bash
   docker compose exec backend python manage.py seed_tickets --clear --tickets 20 --comentarios 50
   ```

### URLs locales
- Frontend: `http://localhost:3000`
- API: `http://localhost:8000/api/`
- Admin: `http://localhost:8000/admin/`

---

## 2) Despliegue Backend en Render + Frontend en Vercel

## 2.1 Backend (Render)

### Crear servicios
- Crear una base de datos PostgreSQL en Render.
- Crear un **Web Service** para el backend (raíz: `src/`).

### Variables de entorno sugeridas (Render)
- `DEBUG=False`
- `SECRET_KEY=<valor-seguro>`
- `ALLOWED_HOSTS=<tu-backend>.onrender.com`
- `DB_NAME=<db_name>`
- `DB_USER=<db_user>`
- `DB_PASSWORD=<db_password>`
- `DB_HOST=<db_host>`
- `DB_PORT=<db_port>`
- `CORS_ALLOWED_ORIGINS=https://<tu-frontend>.vercel.app`

### Comandos de build/start sugeridos
- **Build Command:**
  ```bash
  pip install -r requirements.txt && python manage.py migrate
  ```
- **Start Command:**
  ```bash
  gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
  ```

> Si no tienes `gunicorn` instalado, agrégalo a `src/requirements.txt`.

### Validación
- Probar health/manual: `https://<tu-backend>.onrender.com/api/`

---

## 2.2 Frontend (Vercel)

### Configuración
- Importar repositorio en Vercel.
- Seleccionar como Root Directory: `frontend/`.
- Definir variable de entorno:
  - `NEXT_PUBLIC_API_URL=https://<tu-backend>.onrender.com/api`

### Build
Vercel detecta Next.js automáticamente.

### Validación
- Abrir `https://<tu-frontend>.vercel.app`.
- Verificar login, listado de tickets, detalle y creación de comentarios.

---

## 3) Recomendaciones básicas de seguridad
- Nunca subir `.env` al repositorio.
- Usar `DEBUG=False` en producción.
- Rotar `SECRET_KEY` y credenciales al compartir el proyecto.
- Limitar `ALLOWED_HOSTS` y `CORS_ALLOWED_ORIGINS` a dominios reales.
- Configurar HTTPS (Render/Vercel ya lo proveen por defecto).