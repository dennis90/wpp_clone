import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useRef, useState } from 'react';

import {
  StyledActionsContainer,
  StyledContainer,
  StyledContent,
  StyledDivider,
  StyledFooter,
  StyledPhoto,
  StyledVideo,
} from './styles';

export const PHOTO_MIME = 'image/png';

export interface SendPhotoProps {
  onPhotoTaken: (photoData: string) => void;
}

const SendPhoto: React.FC<SendPhotoProps> = (props) => {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream>();
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  const getStream = (): void => {
    navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'user' } }).then((mediaStream) => {
      mediaStreamRef.current = mediaStream;

      if (videoElementRef.current) {
        videoElementRef.current.srcObject = mediaStream;
      }
    });
  };

  const stopMediaStream = (): void => {
    if (mediaStreamRef.current && (mediaStreamRef.current.getVideoTracks || mediaStreamRef.current.getAudioTracks)) {
      mediaStreamRef.current.getVideoTracks().map((track) => track.stop());
      mediaStreamRef.current.getAudioTracks().map((track) => track.stop());
    }

    if (videoElementRef.current) {
      videoElementRef.current.srcObject = null;
    }
  };

  const takePhotoClickHandler = (): void => {
    if (videoElementRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElementRef.current.clientWidth;
      canvas.height = videoElementRef.current.clientHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoElementRef.current, 0, 0, canvas.width, canvas.height);

      setPhoto(canvas.toDataURL(PHOTO_MIME));
      stopMediaStream();
    }
  };

  const takePhotoAgainClickHandler = (): void => {
    setPhoto(undefined);
    getStream();
  };

  const sendPhotoClickHandler = (): void => {
    if (photo) {
      props.onPhotoTaken(photo);
    }
  };

  useEffect(() => {
    getStream();

    return () => {
      stopMediaStream();
    };
  }, []);

  return (
    <StyledContainer>
      <StyledContent>
        {!photo && (
          <StyledVideo
            aria-label="Camera input"
            autoPlay={true}
            muted={true}
            playsInline={true}
            ref={videoElementRef}
          />
        )}

        {photo && <StyledPhoto src={photo} alt="Camera capture" />}
      </StyledContent>

      <StyledFooter>
        <StyledDivider />
        <StyledActionsContainer>
          {photo && (
            <>
              <IconButton color="secondary" onClick={takePhotoAgainClickHandler} aria-label="Take another photo">
                <FlipCameraIosIcon fontSize="large" />
              </IconButton>

              <IconButton color="primary" onClick={sendPhotoClickHandler} aria-label="Send photo">
                <SendIcon fontSize="large" />
              </IconButton>
            </>
          )}
          {!photo && (
            <IconButton color="primary" onClick={takePhotoClickHandler} aria-label="Take photo">
              <PhotoCameraIcon fontSize="large" />
            </IconButton>
          )}
        </StyledActionsContainer>
      </StyledFooter>
    </StyledContainer>
  );
};

export default SendPhoto;
