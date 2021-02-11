import { render, screen } from '@testing-library/react';

import AppProviders from '__mocks__/appProviders';
import UnknownMediaType from './index';

const mockFile = {
  name: 'document.pdf',
  path: 'http://localhost:3000/document.pdf',
};

describe('UnknownMediaType component', () => {
  it("Display icon and file name if component isn't downloadable", () => {
    render(
      <AppProviders>
        <UnknownMediaType file={mockFile} downloadable={false} />
      </AppProviders>,
    );

    expect(screen.getByLabelText('Attachment icon')).toBeInTheDocument();
    const fileNameElement = screen.getByText(mockFile.name);
    expect(fileNameElement.tagName.toLowerCase()).toBe('span');
  });

  it('Display icon and file download link if component is downloadable', () => {
    render(
      <AppProviders>
        <UnknownMediaType file={mockFile} downloadable={true} />
      </AppProviders>,
    );
    expect(screen.getByLabelText('Attachment icon')).toBeInTheDocument();
    const fileNameElement = screen.getByText(mockFile.name);
    expect(fileNameElement.tagName.toLowerCase()).toBe('a');
    expect((fileNameElement as HTMLAnchorElement).href).toBe(mockFile.path);
  });
});
