import { BaseAction, actionIds } from '.';
import { IBranch } from '../components/NavBar/CustomBranchSelector/BranchSelector';

export const getGitBranchesAction = (): BaseAction => ({
  type: actionIds.GET_GIT_BRANCHES,
});

export const getGitBranchesCompletedAction = (
  branches: Array<IBranch>
): BaseAction => ({
  type: actionIds.GET_GIT_BRANCHES_COMPLETED,
  payload: branches,
});
