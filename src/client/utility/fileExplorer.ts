
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
  console.log(table,schema)
  const response = await psUploadData.uploadData(table,schema)
  console.log('exiting uploadTableData')
  return response;



}

interface image {
  constainers: number
  repoTags: string[]
  id: string
}

export const destructureImageList = (arr:[]): string[] => {
  console.log('destructure')
  const newImageList :string[] = []
  arr.forEach((ele)=>{
    const curTag: image = ele['repoTags']
    if(curTag!==null){
   
    const string: string = curTag[0].substring(0,curTag[0].lastIndexOf(":"));
    newImageList.push(string);
    
  }
  })
  
  return newImageList
}

// export const runNewContainer = async (image:string, containerName:string, port:string): Promise<string> => {

//   console.log('runNewContainer')
  
// }

// export const grabImages = async (): Promise<string[]> => {
//   console.log('grab Docker Images')
//   const response = await dockController.getImagesList()
//     console.log('exiting grabImages')
//     return response
// }
