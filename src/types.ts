

export type EnvConfig = {
  rootDir: rootDir,
  image?: string,
  container?: string
}
export type StartUpObj ={
  image:string
  imageSubmitted: boolean
  container:string
  selectedImage: string
  port: string
}
export type image = {
  containers: number
  id: string
  repoTags: string[]
}
export type  container = {
  id: string
  image: string
  imageId:string
  names: string
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
  port: string | "5432" ,
  rootDir: rootDir,
  schema?: schema
}
export type LoadTable = {
  tablePath: string
  tableName: string
}
export type rootDir = string;
export type schema = string;