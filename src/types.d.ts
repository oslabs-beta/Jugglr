/**
 * These namespaces do nothing as far as we can tell.
 */
export namespace  selectorModule {
  function openFile (): string;
  function openDir (): string;
  function setProjectRoot (): string;
}

export namespace dockerController {
  function createDockerfile(): string;
}
export namespace psUploadData {
  function uploadData(a:string,b:string):string;
}


