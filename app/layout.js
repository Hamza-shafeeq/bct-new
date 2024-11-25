// app/layout.js
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { Wallet } from "./Wallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageProvider from './utilities/LanguageProvider'; // Import LanguageProvider
import './utilities/i18n';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen font-poppins">
        <LanguageProvider> {/* Wrap everything inside LanguageProvider */}
          <Wallet>
            <ToastContainer theme="dark" />
            <Header />
            <main className="flex-grow">{children}</main>
            {/* Uncomment Footer if needed */}
            {/* <Footer /> */}
          </Wallet>
        </LanguageProvider>
      </body>
    </html>
  );
}
