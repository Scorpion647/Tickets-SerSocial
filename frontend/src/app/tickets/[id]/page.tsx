'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { Ticket, Comentario } from '@/types';
import { Button } from '@/components/UI/Button';
import Selecct from '@/components/UI/Selecct';
import Input from '@/components/UI/Input';
import TextArea from '@/components/UI/TextArea';
import { toast } from 'sonner';

export default function TicketDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [updating, setUpdating] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState({
    Titulo: '',
    Descripcion: '',
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await fetchAPI(`/Ticket/${id}/`);
        setTicket(data);
        setComentarios(data.Comentario || []);
      } catch (err) {
        toast.error("Error al cargar el ticket")
        console.error(err);
      }
    };
    fetchTicket();
  }, [id]);

  const handleUpdate = async (campo: string, valor: string) => {
    if (!ticket) return;
    setUpdating(true);
    try {
      await fetchAPI(`/Ticket/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ [campo]: valor }),
      });
      setTicket({ ...ticket, [campo]: valor });
    } catch (err) {
      toast.error("Error al actualizar")
      console.error('Error al actualizar:', err);
    } finally {
      toast.success("Valor actualizado con exito")
      setUpdating(false);
    }
  };

const handleComentarioSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {

    if(ticket){
      const data = await fetchAPI('/Comentario/', {
      method: 'POST',
      body: JSON.stringify({
        ticket: ticket.id,
        Titulo: nuevoComentario.Titulo,
        Descripcion: nuevoComentario.Descripcion
      }),
    });
    setComentarios([...comentarios, data]);
    setNuevoComentario({ Titulo: '', Descripcion: '' });
    }
  } catch (error) {
    console.error('Error al crear comentario:', error);
    toast.error("Error al crear comentario. Revisa los datos.")
  }
};



  if (!ticket) return <div className="text-center p-4">Ticket no encontrado</div>;

  return (
    <>
      <div className=' text-black '>
        <div className="max-w-4xl mx-auto p-4 ">
          <Button onClick={() => router.back()}>
            ← Volver
          </Button>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2 break-words whitespace-normal">{ticket.titulo}</h1>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap break-words">{ticket.descripcion}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-bold text-blue-600">Categoría</p>
                <p className="font-medium">{ticket.categoria}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-600">Creado</p>
                <p className="font-medium">{new Date(ticket.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="font-semibold mb-2">Cambiar estado / prioridad</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1 font-bold text-blue-600">Estado</label>
                  <Selecct
                    value={ticket.estado}
                    onChange={(e) => handleUpdate('estado', e.target.value)}
                    disabled={updating}
                  >
                    <option value="abierto">Abierto</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="resuelto">Resuelto</option>
                    <option value="cerrado">Cerrado</option>
                  </Selecct>
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1 font-bold text-blue-600">Prioridad</label>
                  <Selecct
                    value={ticket.prioridad}
                    onChange={(e) => handleUpdate('prioridad', e.target.value)}
                    disabled={updating}
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </Selecct>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Comentarios</h2>

            {comentarios.length === 0 ? (
              <p className="text-gray-500 mb-4">No hay comentarios aún.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {comentarios.map((com) => (
                  <div key={com.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-700">
                        {com.autor_nombre || 'Usuario anónimo'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(com.fecha_registro).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="font-medium">{com.Titulo}</h3>
                    <p className="text-gray-700 text-sm mt-1">{com.Descripcion}</p>
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleComentarioSubmit} className="border-t pt-4">
              <h3 className="font-medium mb-2">Agregar un comentario</h3>
              <div className="mb-3">
                <Input
                  type="text"
                  placeholder="Título"
                  value={nuevoComentario.Titulo}
                  onChange={(e: { target: { value: string; }; }) => setNuevoComentario({ ...nuevoComentario, Titulo: e.target.value })}
                  required
                  className='w-full'
                />
              </div>
              <div className="mb-3">
                <TextArea
                  placeholder="Descripción"
                  value={nuevoComentario.Descripcion}
                  onChange={(e: { target: { value: string; }; }) => setNuevoComentario({ ...nuevoComentario, Descripcion: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              <Button type="submit">
                Enviar comentario
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}