export namespace  selectorModule {
  function openFile (): string;
  function openDir (): string;
  function setProjectRoot (): object;
}

export namespace dockerController {
  function createDockerfile(): string;
}
export namespace psUploadData {
  function uploadData(a:string,b:string):string;
}


