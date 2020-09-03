import styled from 'styled-components';
import { COLORS } from './style';

export const StyledCard = styled.div`
  box-shadow: 2px 2px 9px 0px rgba(50, 50, 50, 0.4);
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  margin-bottom: 6px;
`;

export const StyledStyleCard = styled(StyledCard)`
  background-color: ${COLORS.PRIMARY};
`;
