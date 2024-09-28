import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import router from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);