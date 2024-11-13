// app/components/Footer.js

export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-700 p-4 mt-10 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Staking Project. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> | 
          <a href="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</a>
        </p>
      </footer>
    );
  }
  