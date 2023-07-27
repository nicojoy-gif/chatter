import Index from './Routes/Index';
import "firebase/compat/analytics";
import { UserContextProvider } from './context/UserContext';


function App() {
  return (
    <div>
    <UserContextProvider>
  <Index />
  </UserContextProvider>
    </div>
  );
}

export default App;
