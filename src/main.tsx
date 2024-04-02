import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from 'react-redux'
import {store} from './store'
import {BrowserRouter} from 'react-router-dom'
import 'src/locales/i18n'

// global is not defined
if (typeof (window as any).global === 'undefined') {
  window.global = window
}

// buffer is not defined
import {Buffer} from 'buffer'
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

// process is not defined
import process from 'process'
import Updater from './updater'
import TanStackQueryProvider from './provider/TanStackQueryProvider.tsx'
import AppProvider from './provider/AppProvider.tsx'
if (typeof window !== 'undefined') {
  ;(window as any).process = process
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <TanStackQueryProvider>
        <AppProvider>
          <Updater />
          <App />
        </AppProvider>
      </TanStackQueryProvider>
    </Provider>
  </BrowserRouter>
)
