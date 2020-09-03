import styled from 'styled-components';

// boxShadow: '2px 2px 9px 0px rgba(50, 50, 50, 0.4)',
// borderRadius: '5px',
// backgroundColor: '#ffffff',
// marginBottom: '6px',

export const CardStyle = styled.div`
  box-shadow: 2px 2px 9px 0px rgba(50, 50, 50, 0.4);
  borderRadius: 5px;
  background-color: ${(props) => props.theme.mainColor}
  margin-bottom: 6px
`;
