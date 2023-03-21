# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /openai-quickstart-python
ENV OPENAI_API_KEY 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
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT flask run --host=0.0.0.0 --port=8080
