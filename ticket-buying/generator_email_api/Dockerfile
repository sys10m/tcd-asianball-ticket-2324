
FROM python:3.9-slim

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN pip install Flask Flask_RESTful gunicorn pillow python-barcode

CMD exec gunicorn --bind :$PORT --workers 1 --threads 4 --timeout 0 main:app

