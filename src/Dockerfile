# src/Dockerfile
FROM python:3.14-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc libpq-dev && \
    apt-get clean

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD sh -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"