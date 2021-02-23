import { Repository } from 'nodegit';

let cache: Repository | null = null;

export const nodeGit = async () => {
  if (cache === null) {
    cache = await Repository.open('./');
    return cache;
  }

  return cache;
};
