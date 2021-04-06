import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import UploadDocument from './index';

describe('UploadDocument Component', () => {
  it('trigger on change attribute', async () => {
    const fileChangeHandler = jest.fn();
    render(<UploadDocument id="upload-content" onChange={fileChangeHandler} />);
    const input = screen.getByLabelText('upload file input');

    expect(input).toBeInTheDocument();

    const file = new File(['File content'], 'filename.png', { type: 'image/png' });

    await waitFor(() => fireEvent.change(input, { target: { files: [file] } }));
    expect(fileChangeHandler).toBeCalledWith(file);
  });
});
