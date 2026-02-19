'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  children: React.ReactNode;
  user: { name: string } | null;
  onLogout: () => void;
  bg?: boolean
}

export default function Navbar({ children, user, bg = false, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full h-14 bg-blue-700 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {!bg ?
              <Link href="/tickets" className="text-white text-xl font-bold">
                Tickets SerSocial
              </Link>
              :
              <div className="text-white text-xl font-bold">
                Tickets SerSocial
              </div>
            }

            {user && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none"
                >
                  <span>{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                    <Link
                      href="/tickets"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Inicio
                    </Link>
                    <Link
                      href="/changepassword"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Cambiar contraseña
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      <main className={`flex-grow pt-5 pb-5 ${bg ? 'bg-cover bg-center bg-no-repeat' : 'bg-gray-100'}`} style={bg ? { backgroundImage: "url('/images/background.webp')" } : {}}>

          {children}

      </main>
      <footer className="bg-blue-800    text-white w-full h-12 flex items-center justify-center">
        <p className="text-sm">Tickets SerSocial © {year}</p>
      </footer>
    </div>
  );
}



