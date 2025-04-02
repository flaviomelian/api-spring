import { UserProvider } from './Context/Context';
import router from './Routes/index'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  );
}

export default App;
