import * as ini from 'ini';
import { loadFileContentsFromPath } from './fileSystem';

interface Author {
  name?: string;
  email?: string;
  timestamp?: number;
  timezoneOffset?: number;
}

const getHomeDirectory = () => {
  return require('os').homedir();
};

export const getGitConfig = async (gitDir: string, attribute: string) => {
  const localSettings = await loadFileContentsFromPath(
    gitDir + '/.git/',
    'config'
  );
  const globalSettings = await loadFileContentsFromPath(
    getHomeDirectory(),
    '.gitconfig'
  );

  if (globalSettings === '' && localSettings === '') {
    throw new Error(
      `Could not find .gitconfig in home DIR: ${getHomeDirectory()} or in local git repo`
    );
  }

  const localIni = ini.parse(localSettings);
  const globalIni = ini.parse(globalSettings);

  if (localIni[attribute]) {
    return localIni;
  }

  if (globalIni[attribute]) {
    return globalIni;
  }

  throw new Error(
    `Neither the global or local settings had the attribute ${attribute}`
  );
};

export const getGitAuthor = async (gitDir: string): Promise<Author> => {
  const gitConfig = await getGitConfig(gitDir, 'user');
  return gitConfig.user;
};
