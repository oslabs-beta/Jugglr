FROM postgres:latest
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB postgres
ENV PGDATA var/lib/postgres/data/pgdata
COPY starwars_postgres_create.sql /docker-entrypoint-initdb.d/
VOLUME [ "/data" ] 
