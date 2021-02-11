import { render, screen } from '@testing-library/react';

import AppProviders from '__mocks__/appProviders';
import ImageMediaType from './index';

const mockFile = {
  name: 'image.png',
  path: 'http://localhost:3000/image.png',
};

describe('ImageMediaType component', () => {
  it('Display image preview and file name if component isn\'t downloadable', () => {
    render(
      <AppProviders>
        <ImageMediaType file={mockFile} downloadable={false}/>
      </AppProviders>
    );

    expect(screen.getByAltText(mockFile.name)).toBeInTheDocument();
    const fileNameElement = screen.getByText(mockFile.name);
    expect(fileNameElement.tagName.toLowerCase()).toBe('span');
  });

  it('Display icon and file download link if component is downloadable', () => {
    render(
      <AppProviders>
        <ImageMediaType file={mockFile} downloadable={true}/>
      </AppProviders>
    );
    expect(screen.getByAltText(mockFile.name)).toBeInTheDocument();
    const fileNameElement = screen.getByText(mockFile.name);
    expect(fileNameElement.tagName.toLowerCase()).toBe('a');
    expect((fileNameElement as HTMLAnchorElement).href).toBe(mockFile.path);
  });
})
