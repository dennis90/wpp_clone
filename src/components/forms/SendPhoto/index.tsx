import Button from '@material-ui/core/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import ActionModalHeader from 'components/Conversation/ActionModal/Header';
import { actions as actionPanelActions } from 'store/actionPanel';
import { ActionTypes } from 'types/Conversation';

const PHOTO_WIDTH = 640;
const PHOTO_HEIGHT = 480;

const PHOTO_MIME = 'image/png';

const SendPhoto: React.FC = () => {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream>();
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

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
      canvas.width = PHOTO_WIDTH;
      canvas.height = PHOTO_HEIGHT;
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
      dispatch(
        actionPanelActions.setPanelInfo({
          actionType: ActionTypes.SendFile,
          documentType: PHOTO_MIME,
          documentName: `photo_${new Date().toISOString()}.png`,
          documentPath: photo,
          initialMessage: '',
        }),
      );
    }
  };

  useEffect(() => {
    getStream();

    return () => {
      stopMediaStream();
    };
  }, []);

  return (
    <div>
      <ActionModalHeader>Tire uma foto</ActionModalHeader>

      <div>
        {!photo && (
          <video
            aria-label="Camera input"
            autoPlay={true}
            height={PHOTO_HEIGHT}
            muted={true}
            playsInline={true}
            ref={videoElementRef}
            width={PHOTO_WIDTH}
          />
        )}

        {photo && <img src={photo} alt="Camera capture" />}
      </div>

      {!photo && (
        <Button color="primary" onClick={takePhotoClickHandler}>
          Tirar foto
        </Button>
      )}

      {photo && (
        <>
          <Button color="primary" onClick={sendPhotoClickHandler}>
            Enviar foto
          </Button>

          <Button color="secondary" onClick={takePhotoAgainClickHandler}>
            Tirar outra foto
          </Button>
        </>
      )}
    </div>
  );
};

export default SendPhoto;
