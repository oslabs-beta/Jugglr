export namespace  selectorModule {
  function openFile (): string;
  function openDir (): string;
  function setProjectRoot (): Array<string>;
}

export namespace dockerController {
  function createDockerfile(): string;
}
export namespace psUploadData {
  function uploadData(a:string,b:string):string;
}


