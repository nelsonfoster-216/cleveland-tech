'use client';

import { useState } from 'react';
import './globals.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col h-full bg-gray-100`}>
        <header className="bg-blue-900 text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">Cleveland Tech</Link>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
              
              {/* Desktop navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="hover:text-blue-200 transition">Home</Link>
                <Link href="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
                <Link href="/organizations" className="hover:text-blue-200 transition">Organizations</Link>
                <Link href="/groups" className="hover:text-blue-200 transition">Groups</Link>
                <Link href="/events" className="hover:text-blue-200 transition">Events</Link>
                <Link href="/industry-research" className="hover:text-blue-200 transition">Industry Research</Link>
              </nav>
            </div>
            
            {/* Mobile menu */}
            <div className={`mt-4 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
              <nav className="flex flex-col space-y-3">
                <Link href="/" className="hover:text-blue-200 transition">Home</Link>
                <Link href="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
                <Link href="/organizations" className="hover:text-blue-200 transition">Organizations</Link>
                <Link href="/groups" className="hover:text-blue-200 transition">Groups</Link>
                <Link href="/events" className="hover:text-blue-200 transition">Events</Link>
                <Link href="/industry-research" className="hover:text-blue-200 transition">Industry Research</Link>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto px-4">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Cleveland Tech Dashboard</h3>
                <p className="text-gray-400">
                  A visualization of Cleveland's tech ecosystem
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-semibold mb-2">Resources</h4>
                <ul className="space-y-1 text-gray-400">
                  <li>
                    <a 
                      href="https://github.com/mrfright/cleveland-tech" 
                      className="hover:text-blue-300 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source Data - GitHub
                    </a>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-blue-300 transition">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-700 text-gray-400 text-sm">
              <p className="text-center">
                © {new Date().getFullYear()} Cleveland Tech Dashboard. 
                Organization, Event and Group Data Source: <a 
                  href="https://github.com/mrfright/cleveland-tech" 
                  className="text-blue-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cleveland-tech
                </a>. 
                Made with Robots and Soul by <a 
                  href="https://www.prokofa.com" 
                  className="text-blue-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ProKofa Solutions
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
