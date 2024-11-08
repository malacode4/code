import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/segment.css';
import SaveSegment from './Segment/SaveSegment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SaveSegment />
  </React.StrictMode>
);
reportWebVitals();
