import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';

// Если нужно измерять производительность приложения:

// import reportWebVitals from './reportWebVitals';

// передайте функцию для регистрации результатов
// например: reportWebVitals(console.log)
// или отправте их на конечную точку аналитики.
// Узнайте больше: https://bit.ly/CRA-vitals



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// reportWebVitals(console.log);
