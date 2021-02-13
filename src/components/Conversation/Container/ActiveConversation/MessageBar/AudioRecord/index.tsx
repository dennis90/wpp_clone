import CircularProgress from '@material-ui/core/CircularProgress';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import MicIcon from '@material-ui/icons/Mic';
import React, { useEffect, useRef, useState } from 'react';

import { StyledIconButton } from '../styles';

export interface AudioRecordProps {
  onAudioRecorded: (audio: string) => void;
}

const AudioRecord: React.FC<AudioRecordProps> = (props) => {
  const { onAudioRecorded } = props;

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioResolver, setAudioResolver] = useState<'send' | 'discard' | undefined>(undefined);

  useEffect(() => {
    if (audioChunks.length > 0 && audioResolver !== undefined) {
      if (audioResolver === 'send') {
        const audioURL = URL.createObjectURL(new Blob(audioChunks));
        onAudioRecorded(audioURL);
      }

      setAudioChunks([]);
      setAudioResolver(undefined);
    }
  }, [audioChunks, audioChunks.length, audioResolver, onAudioRecorded]);

  const startClickHandler = async (): Promise<void> => {
    try {
      setLoading(true);
      setAudioResolver(undefined);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      mediaRecorderRef.current = new MediaRecorder(stream);
      const recordedChunks: Blob[] = [];

      mediaRecorderRef.current.addEventListener('dataavailable', (event: BlobEvent) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      });

      mediaRecorderRef.current.addEventListener('stop', () => {
        setAudioChunks(recordedChunks);
        mediaRecorderRef.current?.stream.getAudioTracks().map((track) => track.stop());
      });

      mediaRecorderRef.current.start();
    } finally {
      setLoading(false);
    }
  };

  const sendAudioClickHandler = (): void => {
    setAudioResolver('send');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const cancelRecordingClickHandler = (): void => {
    setAudioResolver('discard');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const recordingStatus = loading ? 'loading' : mediaRecorderRef.current?.state;

  return (
    <>
      {loading && (
        <StyledIconButton aria-label="Record audio loading" size="small" onClick={() => setLoading((val) => !val)}>
          <CircularProgress size={30} thickness={8} />
        </StyledIconButton>
      )}

      {['inactive', undefined].includes(recordingStatus) && (
        <StyledIconButton aria-label="Record audio" size="small" onClick={startClickHandler}>
          <MicIcon fontSize="large" />
        </StyledIconButton>
      )}

      {recordingStatus === 'recording' && (
        <>
          <StyledIconButton
            aria-label="Cancel audio record"
            size="small"
            color="secondary"
            onClick={cancelRecordingClickHandler}
          >
            <ClearIcon fontSize="large" />
          </StyledIconButton>
          <StyledIconButton
            aria-label="Send recorded audio"
            size="small"
            color="primary"
            onClick={sendAudioClickHandler}
          >
            <DoneIcon fontSize="large" />
          </StyledIconButton>
        </>
      )}
    </>
  );
};

export default AudioRecord;
