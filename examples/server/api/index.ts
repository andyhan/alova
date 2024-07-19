import { createAlovaMockAdapter } from '@alova/mock';
import { createAlova } from 'alova';
import mock from './mock';

// mock adapter
export const mockRequestAdapter = createAlovaMockAdapter([mock], {
  delay: 100,
  mockRequestLogger: false
});

// create a alova instance
export const alova = createAlova({
  baseURL: 'http://example.com',
  requestAdapter: mockRequestAdapter,
  responded: response => {
    if (response.status !== 200) {
      throw new Error(`[${response.status}]${response.statusText}`);
    }
    return response.json();
  }
});
