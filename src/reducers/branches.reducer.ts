import { BaseAction, actionIds } from '../actions';
import { IBranch } from '../components/NavBar/CustomBranchSelector/BranchSelector';

export const getGitBranches = (
  state: Array<IBranch> = Array<IBranch>(),
  action: BaseAction
) => {
  switch (action.type) {
    case actionIds.GET_GIT_BRANCHES_COMPLETED:
      return [...state, ...action.payload];
  }

  return state;
};

export default getGitBranches;
