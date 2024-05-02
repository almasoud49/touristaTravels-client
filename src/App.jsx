import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster />
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
