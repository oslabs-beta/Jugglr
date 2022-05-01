/**
 * Action helpers moved here for time being...
 */
export const handleClick = async () => {
  const response = await selectorModule.openFile();
  console.log("Electron's Response:", response);
  // setPath(response);
  console.log("New Path:", path);
};