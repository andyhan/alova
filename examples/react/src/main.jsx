import '@nordhealth/components';
import '@nordhealth/css';
import { bootSilentFactory } from 'alova/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { alova } from './api';
import './index.css';
import Layout from './Layout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);

// need to boot silent factory before using useSQRequest
bootSilentFactory({
  alova,
  delay: 500,

  // set the request delay
  requestWait: [
    {
      queue: 'note',
      wait: silentMethod => silentMethod.entity.meta?.silentDelay
    }
  ]
});
