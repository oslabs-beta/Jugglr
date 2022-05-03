FROM postgres:latest 
    ENV POSTGRES_USER postgres 
    ENV POSTGRES_PASSWORD postgres 
    ENV POSTGRES_DB postgres 
    WORKDIR /Users/alvinma/Desktop/Codesmith/Jugglr
    COPY /Users/alvinma/Desktop/Codesmith/Jugglr/__tests__/data/starwars_postgres_create.sql /docker-entrypoint-initdb.d/ 