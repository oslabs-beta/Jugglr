/**
 * Action helpers moved here for time being...
 */
 export const selectFile = async () :Promise<string> => {
  const response = await selectorModule.openFile();
  return response;
};

export const selectProjectRootDirectory = async () :Promise<string>=> {
  const response = await selectorModule.openDir();
  return response;
};

export const uploadTableData = async (table:string, schema:string) :Promise<string>  => {
  console.log('entered uploadTableData')
  if(table==="" || schema===""){ 
    return "Please fill out all required fields"
  }
  const response = await psUploadData.uploadData(table,schema)
  console.log('exiting uploadTableData')
  return response;
}