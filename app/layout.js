// app/layout.js
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';
import { Wallet } from './Wallet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen ">
        <Wallet>
        <ToastContainer theme="dark" />
          <Header />
          <main className="flex-grow">{children}</main>
          {/* <Footer /> */}
        </Wallet>
      </body>
    </html>
  );
}
