import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/stack-sans-headline/300.css';
import '@fontsource/stack-sans-headline/400.css';
import '@fontsource/stack-sans-headline/500.css';
import '@fontsource/stack-sans-headline/600.css';
import '@fontsource/stack-sans-headline/700.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
