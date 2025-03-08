import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useState, SetStateAction } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App setUserRole={setUserRole} />
  </StrictMode>,
)
function setUserRole(value: SetStateAction<string | null>): void {
  const [, setUserRoleState] = useState<string | null>(null);
  setUserRoleState(value);
}

