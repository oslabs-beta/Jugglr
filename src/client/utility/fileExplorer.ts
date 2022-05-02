/**
 * Action helpers moved here for time being...
 */
 const selectSchemaFile = async () :Promise<void> => {
  const response = await selectorModule.openFile();
  return response;
};

export const selectProjectRootDirectory = async () :Promise<void>=> {
  const response = await selectorModule.openDir();
  return response;
};

const selectTableFile = async () :Promise<void> => {
  const response = await selectorModule.openFile();
  return response;  
};