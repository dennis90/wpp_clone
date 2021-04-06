import AttachFileIcon from '@material-ui/icons/AttachFile';
import React from 'react';

import { StyledIconButton } from '../styles';

export const allImagesType = 'image/*';
export const allAudiosType = 'audio/*';
export const pdfDocumentType = 'application/pdf';
export const officeDocumentTypes = [
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  // Accept templates and documents with macros
  'application/vnd.openxmlformats-officedocument.*',
  'application/vnd.ms-excel.*',
  'application/vnd.ms-powerpoint.*',
  // Open office format
  'application/vnd.oasis.opendocument*',
];

export const defaultAcceptTypes = [...officeDocumentTypes, allImagesType, pdfDocumentType, allAudiosType];

export interface UploadDocumentProps {
  accept?: string;
  id: string;
  onChange?: (file: File) => void;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ accept = defaultAcceptTypes.join(', '), ...props }) => {
  const inputFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.files && props.onChange) {
      props.onChange(event.currentTarget.files[0]);
    }
  };

  return (
    <div>
      <input
        aria-label="upload file input"
        accept={accept}
        id={props.id}
        hidden={true}
        multiple={false}
        type="file"
        onChange={inputFileChangeHandler}
      />

      <label htmlFor={props.id}>
        <StyledIconButton aria-label="upload file" size="small">
          <AttachFileIcon fontSize="large" />
        </StyledIconButton>
      </label>
    </div>
  );
};

export default UploadDocument;
