"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [login, setlogin] = useState(true)
  const router = useRouter();
  const [formDatalogin, setFormDatalogin] = useState({
    email: '',
    contraseña: '',
  });
  const [formDataregister, setFormDataregister] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    repcontraseña: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const promise = fetchAPI('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({
      username: formDatalogin.email,
      password: formDatalogin.contraseña,
    }),
  });

  toast.promise(promise, {
    loading: 'Iniciando sesión...',
    success: (data) => {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      router.push('/tickets');
      return '¡Bienvenido!';
    },
    error: (err) => {
      return err.message || 'Credenciales inválidas';
    },
  });
};

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formDataregister.contraseña !== formDataregister.repcontraseña) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const promise = fetchAPI('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({
        username: formDataregister.email,
        email: formDataregister.email,
        password: formDataregister.contraseña,
        first_name: formDataregister.nombre,
        rol: 'solicitante',
      }),
    });

    toast.promise(promise, {
      loading: 'Registrando...',
      success: () => {
        setlogin(true);
        setFormDatalogin({ email: formDataregister.email, contraseña: '' });
        setFormDataregister({ nombre: '', email: '', contraseña: '', repcontraseña: '' });
        return 'Registro exitoso. Inicia sesión.';
      },
      error: 'Error en el registro. El email puede ya existir.',
    });
  };

    const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/');
  };

  return (
    <Navbar user={null} onLogout={handleLogout} bg={true}>
      <div className="h-full flex justify-center sm:justify-end items-center">
        <div className={` bg-white/90 rounded-lg shadow-2xl sm:w-1/4  px-10 py-10 sm:mr-24 text-center text-black flex flex-col gap-5 ${login ? "sm:mt-28 mt-16" : "sm:mt-20 mt-12"}`}>
          {login ?
            <>
              <h1 className="font-extrabold text-blue-700">INICIAR SESIÓN</h1>
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <Input value={formDatalogin.email} onChange={(e: { target: { value: string; }; }) => setFormDatalogin({ ...formDatalogin, email: e.target.value })}
                type="email" placeholder="Email" />
                <Input value={formDatalogin.contraseña} onChange={(e: { target: { value: string; }; }) => setFormDatalogin({ ...formDatalogin, contraseña: e.target.value })}
                type="password" placeholder="Contraseña" />
                <p className="text-blue-700  cursor-pointer hover:underline">¿Olvidaste tu contraseña?</p>
                <Button type="submit">Iniciar sesión</Button>
              </form>
              <div>
                <p className="text-black ">¿No estas registrado?</p>
                <p onClick={() => { setlogin(false) }} className=" text-blue-700 cursor-pointer hover:underline">Registrese aqui</p>
              </div>
            </>
            :
            <>
              <h1 className="font-extrabold text-blue-700">REGISTRO</h1>
              <form onSubmit={handleRegister} className="flex flex-col gap-5">
                <Input value={formDataregister.nombre} onChange={(e: { target: { value: string; }; }) => setFormDataregister({ ...formDataregister, nombre: e.target.value })}
                type="text" placeholder="Nombre" />
                <Input value={formDataregister.email} onChange={(e: { target: { value: string; }; }) => setFormDataregister({ ...formDataregister, email: e.target.value })}
                type="email" placeholder="Email" />
                <Input value={formDataregister.contraseña} onChange={(e: { target: { value: string; }; }) => setFormDataregister({ ...formDataregister, contraseña: e.target.value })}
                type="password" placeholder="Contraseña" />
                <Input value={formDataregister.repcontraseña} onChange={(e: { target: { value: string; }; }) => setFormDataregister({ ...formDataregister, repcontraseña: e.target.value })}
                type="password" placeholder="Confirmar Contraseña" />
                <div>
                  <p>¿Ya estas registrado?</p>
                  <p onClick={() => { setlogin(true) }} className="text-blue-700  cursor-pointer hover:underline">Inicie sesion aqui</p>
                </div>
                <Button type="submit">Registrar</Button>
              </form>
            </>
          }
        </div>
      </div>
    </Navbar>
  );
}