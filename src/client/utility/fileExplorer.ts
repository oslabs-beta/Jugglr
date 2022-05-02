/**
 * Action helpers moved here for time being...
 */
 const selectSchemaFile = async () :Promise<void> => {
  const response = await selectorModule.openFile();
  console.log("Electron's Response:", response);
  return response;
};

export const selectProjectRootDirectory = async () :Promise<void>=> {
  const response = await selectorModule.openDir();
  console.log("Electron's Response:", response);
  return response;
};

const selectTableFile = async () :Promise<void> => {
  const response = await selectorModule.openFile();
  console.log("Electron's Response:", response);
  return response;  
};