import { combineReducers } from 'redux';
import commit from './commit.reducer';
import { GitCommitLog } from '../git/git';
import { FileStatusChanges } from '../git/git';
import getGitDiff from './gitDiff.reducer';
import setNewWorkingDirectory from './working.reducer';
import getGitBranches from './branches.reducer';
import { IBranch } from '../components/NavBar/CustomBranchSelector/BranchSelector';

export interface State {
  gitCommitLog: Array<GitCommitLog>;
  gitDiff: Array<FileStatusChanges>;
  workingDir: string;
  selectedBranches: Array<IBranch>;
  availableBranches: Array<IBranch>;
}

export const rootReducers = combineReducers<State>({
  gitCommitLog: commit,
  gitDiff: getGitDiff,
  workingDir: setNewWorkingDirectory,
  selectedBranches: getGitBranches,
  availableBranches: getGitBranches, // TODO
});
