import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
