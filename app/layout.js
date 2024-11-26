'use client';
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { Wallet } from "./Wallet";
import { ToastContainer } from "react-toastify";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "react-toastify/dist/ReactToastify.css";
import { appWithTranslation } from "next-i18next";

function RootLayout({ children }) {
  return (
    <html lang="en"> {/* or dynamically set based on context */}
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
        <Wallet>
          <ToastContainer theme="dark" />
          <Header />
          <LanguageSwitcher />
          <main className="flex-grow">{children}</main>
          {/* Uncomment Footer if needed */}
          {/* <Footer /> */}
        </Wallet>
      </body>
    </html>
  );
}

// Export with `appWithTranslation`
export default appWithTranslation(RootLayout);
