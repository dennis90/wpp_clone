import { Theme } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';

import { MEDIUM_RULE } from 'config/media-queries';

export const PHOTO_WIDTH = 640;
export const PHOTO_HEIGHT = 480;

const mediaStyles = css`
  margin: 0 auto;
  max-height: ${PHOTO_HEIGHT}px;
  max-width: ${PHOTO_WIDTH}px;
  width: 100%;
  height: 100%;

  @media ${MEDIUM_RULE} {
    margin: 10px auto;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContent = styled.div`
  display: flex;
  margin: auto;
  flex: 1;
`;

export const StyledVideo = styled.video`
  ${mediaStyles}
`;

export const StyledPhoto = styled.img`
  ${mediaStyles}
`;

export const StyledFooter = styled.div`
  display: flex;
  height: 70px;
  bottom: 0;
  width: 100%;
  flex-direction: column;
  position: relative;
`;

export const StyledActionsContainer = styled.div`
  margin: auto;
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.background.default};
  display: flex;
  flex-direction: row;
  z-index: 2;
`;

export const StyledDivider = styled.div`
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.grey[300]};
  display: block;
  height: 1px;
  width: 100%;
  top: 50%;
  position: absolute;
  z-index: 1;
`;
