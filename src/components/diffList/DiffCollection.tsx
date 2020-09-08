import React from 'react';
import DiffList, { DiffTypeEnum } from './DiffList';
import { CollapseHeader } from './CollapseHeader';
import styled from 'styled-components';
import { COLORS } from '../../styles/style';
import { CommitDiff } from './type';

const StyledDiv = styled.div`
  padding-left: 10px;
  background-color: ${COLORS.TRIM};
`;

const StyledContainer = styled.div`
  padding-bottom: 20px;
`;

interface DiffCollectionProps {
  title: string;
  diffs: Array<CommitDiff>;
  diffType: DiffTypeEnum;
}

export const DiffCollection = ({
  title,
  diffs,
  diffType,
}: DiffCollectionProps) => {
  return (
    <StyledContainer>
      <CollapseHeader title={title}>
        <StyledDiv>
          <DiffList items={diffs} diffType={diffType} />
        </StyledDiv>
      </CollapseHeader>
    </StyledContainer>
  );
};
