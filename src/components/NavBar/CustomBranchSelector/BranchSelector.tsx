import React from 'react';
import { Suggest } from '@blueprintjs/select';
import renderBranchTag from './BranchTagRenderer';

export interface IBranch {
  name: string;
  oid: string;
}

const BranchSuggest = Suggest.ofType<IBranch>();

export const BranchSelector = (props: { branches: IBranch[] }) => {
  return (
    <BranchSuggest
      inputValueRenderer={(branch: IBranch) => branch.name}
      itemRenderer={renderBranchTag}
      items={props.branches}
      onItemSelect={(branch: IBranch) => {
        console.log('Branch selected: ' + branch);
      }}
      popoverProps={{ minimal: true }}
    />
  );
};

export default BranchSelector;
