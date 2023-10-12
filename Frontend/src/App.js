import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query'
import './App.css';
import Login from './components/Login';
import "./assets/style.css"
import Signup from './components/Signup';
import ChatRoom from './components/ChatRoom';
import Protected from './components/Protected';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css"
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={ queryClient }>
      <PrimeReactProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Signup /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/dashboard' element={ <Protected Component={ ChatRoom } /> } />
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;