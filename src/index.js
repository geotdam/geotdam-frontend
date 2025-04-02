import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/setting/_common.css'; //기초 css 세팅, 화면 width 설정 필요
import './assets/css/setting/_resets.css'; //공백 초기화
import './assets/css/setting/_vars.css'; //색상 변수

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
