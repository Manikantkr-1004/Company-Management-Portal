import './App.css'
import { ToastContainer } from 'react-toastify';
import AllRoutes from './routes/AllRoutes';

function App() {

  return (
    <>
      <AllRoutes />
      <ToastContainer position="top-right" pauseOnHover pauseOnFocusLoss />
    </>
  )
}

export default App
