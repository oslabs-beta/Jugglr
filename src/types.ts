

export type EnvConfig = {
  rootDir: rootDir,
  image?: string,
  container?: string
}
export type RunDocker = {
  container:string
  containerIdObject:{}
  containerNames: string[]
}
export type DockerFile = {
  from: string | 'postgres:latest' ,
  user: string | 'postgres' ,
  host: string | 'localhost' ,
  database: string | 'postgres' ,
  password: string | 'postgres' ,
  port: number | 5432 ,
  rootDir: rootDir,
  schema?: schema
}
export type LoadTable = {
  tablePath: string
  tableName: string
}
export type rootDir = string;
export type schema = string;