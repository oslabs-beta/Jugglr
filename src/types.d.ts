export namespace  selectorModule {
  function openFile (): string;
  function openDir (): string;
}

export namespace dockerController {
  function createDockerfile(): string;
}
export namespace psUploadData {
  function uploadData(a:string,b:string):string;
}

export default selectorModule;
export default dockerController;