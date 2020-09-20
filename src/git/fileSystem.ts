import * as fs from 'fs';

/**
 * Reads the contents of a file at the filePath provided
 *
 * @param {string} gitDir The filePath to the repo
 * @param {string} filePath The path to the file relative to the gitDir
 *
 * @return {Promise<string>}
 */
export const loadFileContentsFromPath = async (
  gitDir: string,
  filePath: string
) => {
  try {
    const contents = fs.readFileSync(gitDir + '/' + filePath);
    return new TextDecoder().decode(contents);
  } catch (err) {
    console.error(
      `Failed to load file ${filePath} as it likely does not exist`
    );
    return '';
  }
};
