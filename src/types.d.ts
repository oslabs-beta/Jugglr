// declare namespace selectorModal {
//   function openFile (): Promise<string>;
// }

// declare namespace fileController {
//   function fileSelector (): Promise<string>;
// }
declare namespace dockerController {
  function createDockerfile (rootDir: string, dbName: string, dbUser: string, dbPwd: string, imageName: string, schemaPath: string):  string;
​
  function createImage (rootDir: string): string;
​
  function getImages(): Array<string>;
​
  function getContainers (): Array<string>;
​
  function getVolumes (): Array<string>;
​
  function runContainer (containerName: string, port: number): string;
​
  function startContainer (containerName: string):string;
​
  function stopContainer (containerName: string): string;
​
  function deleteContainer (containerName: string): string;
​
  function getRunCommand (rootDir: string, imageName: string, containerName: string): string;
}
