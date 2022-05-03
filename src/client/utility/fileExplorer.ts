import { getLeadingCommentRanges } from "typescript";
import { DockerFile } from "../../types";

/**
 * Action helpers moved here for time being...
 */
 export const selectFile = async () :Promise<void> => {
  const response = await selectorModule.openFile();
  return response;
};

export const selectProjectRootDirectory = async () :Promise<void>=> {
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

export const grabImages = async (): Promise<string[]> => {
  console.log('grab Docker Images')
  const response = await dockController.getImages()
    console.log('exiting grabImages')
    return response
}

/**
 * Added these to test DockerController
 */
export const setDockerFile = (values: DockerFile) => {
  const response = dockController.createDockerfile(values);
  return response;
}