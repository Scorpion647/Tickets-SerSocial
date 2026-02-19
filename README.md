# Tickets-SerSocial
# Tickets-SerSocial

Sistema de gestión de tickets para solicitudes internas, con backend en **Django + DRF**, frontend en **Next.js** y base de datos **PostgreSQL**.

## 1) Requisitos (versiones sugeridas)

### Opción A — ejecución local (sin Docker)
- Python **3.14+**
- Node.js **20+**
- npm **10+**
- PostgreSQL **16**
- Git

### Opción B — ejecución con Docker (recomendada)
- Docker **24+**
- Docker Compose plugin **v2.20+**

---

## 2) Instalación rápida (Docker, recomendada)

1. Clona el repositorio y entra al proyecto:

```bash
git clone <URL_DEL_REPO>
cd Tickets-SerSocial
```

2. Crea el archivo de variables de entorno:

```bash
cp .env.example .env
```

3. Edita `.env` con valores reales. Ejemplo mínimo:

```env
# PostgreSQL
POSTGRES_DB=ticketsdb
POSTGRES_USER=ticketsuser
POSTGRES_PASSWORD=postgres

# Django
DB_NAME=ticketsdb
DB_USER=ticketsuser
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
SECRET_KEY=django-insecure-dev-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,backend
```

4. Levanta servicios:

```bash
docker compose up --build -d
```

5. Inicializa base de datos (migraciones):

```bash
docker compose exec backend python manage.py migrate
```

6. (Opcional) Crea usuario administrador:

```bash
docker compose exec backend python manage.py createsuperuser
```

7. (Opcional) Carga datos de ejemplo/seed:

```bash
docker compose exec backend python manage.py seed_tickets --clear --tickets 20 --comentarios 50
```

### URLs
- Frontend: http://localhost:3000
- API Backend: http://localhost:8000/api/
- Admin Django: http://localhost:8000/admin/

---

## 3) Instalación local (sin Docker)

> Usa esta opción si prefieres correr cada servicio manualmente.

### 3.1 Backend (Django)

1. Entra al directorio backend:

```bash
cd src
```

2. Crea y activa entorno virtual:

```bash
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
```

3. Instala dependencias:

```bash
pip install -r requirements.txt
```

4. Configura variables de entorno en un `.env` en la raíz del proyecto (o exporta variables en tu shell):

```env
DB_NAME=ticketsdb
DB_USER=ticketsuser
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=django-insecure-dev-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

5. Ejecuta migraciones:

```bash
python manage.py migrate
```

6. (Opcional) Carga seed de datos:

```bash
python manage.py seed_tickets --clear --tickets 20 --comentarios 50
```

7. Levanta backend:

```bash
python manage.py runserver 0.0.0.0:8000
```

### 3.2 Frontend (Next.js)

En otra terminal:

```bash
cd frontend
npm install
NEXT_PUBLIC_API_URL=http://localhost:8000/api npm run dev
```

Frontend disponible en: http://localhost:3000

---

## 4) Inicialización de base de datos

El proyecto usa **migraciones de Django**. El comando principal es:

```bash
python manage.py migrate
```

o con Docker:

```bash
docker compose exec backend python manage.py migrate
```

No se requiere script SQL manual para la instalación básica.

---

## 5) Cómo correr la aplicación

### Con Docker
```bash
docker compose up -d
```

### Sin Docker
- Backend:
  ```bash
  cd src && source .venv/bin/activate && python manage.py runserver 0.0.0.0:8000
  ```
- Frontend:
  ```bash
  cd frontend && npm run dev
  ```

---

## 6) Datos de ejemplo (seed) — opcional

Puedes poblar la base con tickets y comentarios de prueba:

```bash
python manage.py seed_tickets --clear --tickets 20 --comentarios 50
```

Opciones disponibles:
- `--clear`: limpia tickets y comentarios antes de crear nuevos.
- `--tickets N`: cantidad de tickets a generar.
- `--comentarios N`: cantidad de comentarios a generar.

---

## 7) Verificación rápida

- Abrir `http://localhost:3000` y comprobar listado/creación de tickets.
- Verificar API en `http://localhost:8000/api/`.
- Verificar autenticación en endpoints bajo `http://localhost:8000/api/auth/`.