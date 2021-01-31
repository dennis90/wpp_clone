import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  max-width: 330px;
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledLastMessage = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
`;
