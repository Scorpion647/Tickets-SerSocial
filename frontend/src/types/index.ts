export interface Ticket {
  id: number;
  referencia: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: string;
  estado: string;
  created_at: string;
  updated_at: string;
}

export interface Comentario {
  id: number;
  ticket: number;
  Titulo: string;
  Descripcion: string;
  fecha_registro: string;
  autor_nombre: string;
}
