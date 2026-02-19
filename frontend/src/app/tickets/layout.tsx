'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Navbar from '@/components/Navbar';
import { fetchAPI } from '@/lib/api';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; rol: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/');
      return;
    }
   try {
      jwtDecode(token); 
      fetchAPI('/auth/profile/')
        .then(data => {
          setUser({ 
            name: data.first_name,
            rol: data.rol 
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener perfil:', error);
          localStorage.removeItem('access_token');
          router.push('/');
        });
    } catch {
      localStorage.removeItem('access_token');
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/');
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <Navbar user={user} onLogout={handleLogout} bg={false}>
        {children}
    </Navbar>
  );
}