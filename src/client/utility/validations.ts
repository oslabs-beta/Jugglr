/**
 * File contains validators for various components,
 * determines whether to submit entries to electron
 */

const dockerClone = {
  rootDir: "",
  schema: "",
  user: "",
  database: "",
  password: ""
};

/**
 * Validate
 * @param {ReduxState} state
 * @returns {boolean}
 */
const dockerReadyValidation = (state: object): boolean => {
  for (const key in dockerClone) {
    if (!state[key].trim()) return false;
  }
  return true;
};

const isEmptyObject = (record: object) => Object.keys(record).length == 0;

export { dockerReadyValidation, isEmptyObject };
