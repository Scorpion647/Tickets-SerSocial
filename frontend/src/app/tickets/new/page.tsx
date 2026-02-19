'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import Input from '@/components/UI/Input';
import Selecct from '@/components/UI/Selecct';
import { Button } from '@/components/UI/Button';
import TextArea from '@/components/UI/TextArea';
import Link from 'next/link';

export default function NewTicketPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'soporte',
    prioridad: 'media',
    estado: 'abierto',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchAPI('/Ticket/', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      router.push('/tickets');
    } catch (error) {
      console.error('Error al crear ticket:', error);
    }
  };

  return (
    <>
    <div className='bg-gray-100 text-black '>
 
        <div className="max-w-2xl mx-auto p-4   bg-white rounded-lg shadow-2xl">
          <div className=' pb-5'>
            <Link href={`/tickets`}>
          <Button>
            Regresar
          </Button>
          </Link>
          </div>
      <h1 className="text-2xl font-bold mb-4">Crear nuevo ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Título</label>
          <Input
          type="text"
            value={formData.titulo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, titulo: e.target.value })}
            required
            className='w-full'
          />
        </div>
        <div>
          <label className="block mb-1">Descripción</label>
          <TextArea
            value={formData.descripcion}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, descripcion: e.target.value })}
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Categoría</label>
          <Selecct
            value={formData.categoria}
            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
          >
            <option value="soporte">Soporte</option>
            <option value="ventas">Ventas</option>
            <option value="facturacion">Facturación</option>
            <option value="otros">Otros</option>
          </Selecct>
        </div>
        <div>
          <label className="block mb-1">Prioridad</label>
          <Selecct
          value={formData.prioridad}
            onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </Selecct>
        </div>
        <Button type="submit">
          Crear ticket
        </Button>
      </form>
    </div>

    </div>
    </>
  );
}