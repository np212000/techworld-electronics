import  {StrictMode}  from 'react';
import  {createRoot}  from 'react-dom/client';
import App from './App.jsx';

//Global shopping context
//this makes cart and wishlist available throught the entire application
import ShopProvider from './context/ShopContext.jsx';
import AuthProvider from './context/AuthContext.jsx';

//Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Bootstrap Icons.
import 'bootstrap-icons/font/bootstrap-icons.css';

//Global styles.
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    {/* ShpProvider wraps the complete  application.
    Thesefore every component inside App can access cart and wishlist data. */}
    <ShopProvider>
      <App />
    </ShopProvider>
    </AuthProvider>
  </StrictMode>,
);
