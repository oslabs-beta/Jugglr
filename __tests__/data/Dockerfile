FROM postgres:latest
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB postgres
COPY starwars_postgres_create.sql /docker-entrypoint-initdb.d/
