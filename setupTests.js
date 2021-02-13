import '@testing-library/jest-dom/extend-expect';

/* eslint-disable */

const streamMock = {
  getAudioTracks: jest.fn().mockReturnValue([]),
  getVideoTracks: jest.fn().mockReturnValue([]),
};

const mediaDevicesMock = {
  enumerateDevices: jest.fn(),
  getUserMedia: () => new Promise((resolve) => resolve(streamMock)),
};

global.navigator.mediaDevices = mediaDevicesMock;

HTMLCanvasElement.prototype.getContext = () => ({
  // return whatever getContext has to return
  drawImage: jest.fn(),
});

HTMLCanvasElement.prototype.toDataURL = (mime) => `${mime}-data-url`;

// https://github.com/testing-library/react-testing-library/issues/470
Object.defineProperty(HTMLVideoElement.prototype, 'muted', {
  set: () => {},
});
