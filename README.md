
# Jugglr

A brief description of what this project does and who it's for


## Authors

- [@Anthony Stanislaus](https://github.com/STANISLAUSA)
- [@Alvin Ma](http://github.com/ALVMA1945)
- [@Miriam Feder](https://www.github.com/mirfeder)
- [@Iftekhar Uddin](http://github.com/iuddin)


## Run Locally

### Clone the project

```bash
  git clone https://github.com/oslabs-beta/Jugglr
```

### Go to the project directory

```bash
  cd Jugglr
```

### Install dependencies

```bash
  npm install
```

### Start the servers

```bash
  npm run build
  npm start
```

### Run tests
```bash
  npm test
```
## Documentation

[Documentation](https://linktodocumentation)


## Running in CI/CD

To run tests in a CI/CD process, the Docker image must be built and run in a container on the CI/CD server. 
You may choose to create a second Dockerfile (e.g.) Dockerfile.cli as follows:
Using the baseline Dockerfile created by Jugglr (in the `<project root>`/jugglr/ directory), you
can either load a sql file with all data included (i.e., a PostgreSQL dump file) 
or you can load data as a separate step, as described below

#### First, in the Dockerfile, add a step at the end to copy the csv file(s) into the container:
```bash
COPY <yourcsvfilename.csv with full path>  <specify any path in the container, like /usr/data/yourcsvfilename.csv>
```
#### Build the image 
- note: the dot after the image name is important, it means build the image from the current directory. If you want to build image from elsewhere, specify that location relative to where command is being run from
- if you name your Dockerfile a different name or put it in a different path, specify that after the -f flag.
```bash
docker build -t <image name> . -f jugglr/Dockerfile   //or other name you have given the Dockerfile
```
#### Run the image in a container: 
```bash
  docker run -d \
  --name <container name>  \
  -p <port to run on>:5432 \                                  //port number can be anything on the left of the colon. Leave the 5432 after the colon
  -e POSTGRES_PASSWORD=<postgres password>  <image name>
```
#### Finally, load data from a file (keep the single and double quotes in the copy command below):

```bash
docker exec -it <container name>  psql -U <database username> -d <databasename> -c "\copy <tablename> FROM '<path to csv file>' DELIMITER ',' CSV HEADER;"
```
