import { container, DockerFile, EnvConfig, LoadTable, StartUpObj ,image} from "../../types";


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


/**
 * Call electron to create a DockerFile with given details
 * @param {DockerFile} values
 * @returns {boolean}
 */
export const setDockerFile = async (values: DockerFile): Promise<boolean> => {
  return await dockController.createDockerfile(values);
}

/**
 * call electron to set rootDir env variable
 * @param {EnvConfig} values 
 * @returns {object}
 */
export const setProjectDirectory = async (values: EnvConfig): Promise<object> => {
  return await selectorModule.setProjectRoot(values.rootDir);
}

