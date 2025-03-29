import { ThemeProvider } from './components/theme-provider.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
 <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
)
