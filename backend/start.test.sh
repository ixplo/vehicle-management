#!/usr/bin/env bash
# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

./mvnw spring-boot:run -Dspring-boot.run.profiles=test