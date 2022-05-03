FROM postgres:latest 
    ENV POSTGRES_USER postgres 
    ENV POSTGRES_PASSWORD postgres 
    ENV POSTGRES_DB postgres 
    WORKDIR /Users/miriam/codesmith/Jugglr /usr/pgdata
    COPY /Users/miriam/codesmith/Jugglr/__tests__/data/starwars_postgres.create.sql /docker-entrypoint-initdb.d/ 