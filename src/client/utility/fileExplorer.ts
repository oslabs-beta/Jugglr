/**
 * Action helpers moved here for time being...
 */
export const selectSchemaFile = async () :Promise<void> => {
  const response = await selectorModule.openFile();
  return response;
};

export const selectProjectRootDirectory = async () :Promise<void>=> {
  const response = await selectorModule.openDir();
  return response;
};

export const selectTableFile = async () :Promise<void> => {
  const response = await selectorModule.openFile();
  return response;  
};

export const createDockerFile = async (filePath, fileContent) => {
  const response = await dockerController.createContainer(filePath, fileContent);
  return response;
}