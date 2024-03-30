FROM python:3.11-slim

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install required packages
RUN pip install Flask Flask_RESTful firebase_admin==6.4.0 gunicorn

# Print installed packages and versions
RUN pip freeze

# Set the command to run the application using gunicorn
CMD exec gunicorn --bind :$PORT --workers 1 --threads 4 --timeout 0 main:app

