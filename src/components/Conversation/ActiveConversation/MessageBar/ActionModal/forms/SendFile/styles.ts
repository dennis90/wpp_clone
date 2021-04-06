import styled from 'styled-components';

export const StyledPanelContent = styled.div`
  overflow: auto;
  margin: auto;
  flex: 1;
  display: flex;

  > div {
    margin: auto;
  }
`;

export const StyledPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledPanelFooter = styled.div`
  height: 60px;
  display: flex;
`;
