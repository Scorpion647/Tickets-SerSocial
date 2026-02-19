"use client"
import { Ticket } from "@/types";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/lib/api"
import Link from 'next/link';
import { Button } from "@/components/UI/Button";
import { MdOutlineModeEdit } from "react-icons/md";
import Selecct from "@/components/UI/Selecct";
import Input from "@/components/UI/Input";
import { toast } from 'sonner';
import { truncateText } from "@/lib/utils";


export default function TicketsPage() {
    const [Tickets, setTickets] = useState<Ticket[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filtro, setfiltro] = useState({
        estado: '',
        prioridad: '',
        categoria: '',
        busqueda: '',
    });



    const fetchTickets = useCallback(async (page: number) => {
        try {
            const params = new URLSearchParams();
            if (filtro.estado) params.append('estado', filtro.estado);
            if (filtro.prioridad) params.append('prioridad', filtro.prioridad);
            if (filtro.categoria) params.append('categoria', filtro.categoria);
            if (filtro.busqueda) params.append('search', filtro.busqueda);
            params.append('page', page.toString());

            const data = await fetchAPI(`/Ticket/?${params.toString()}`);
            setTickets(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch {

        }
    }, [filtro]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setfiltro(prev => ({ ...prev, [name]: value }));
        console.log(name, value)
        console.log(filtro)
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfiltro(prev => ({ ...prev, busqueda: e.target.value }));
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(p => p + 1);
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(p => p - 1);
        }
    };


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1);
    }, [filtro]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTickets(currentPage);
    }, [currentPage, fetchTickets]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
            <div className="flex justify-between items-center pb-4 ">
                <h1 className="text-black text-3xl  ">Lista de Tickets</h1>
                <Link href="/tickets/new">
                    <Button>Nuevo Ticket</Button>
                </Link>
            </div>
            <div className=" overflow-x-auto bg-white rounded-lg shadow-2xl">
                <div className=" flex mt-2 justify-center ">
                    <Input
                        type="text"
                        placeholder="Buscar por referencia..."
                        value={filtro.busqueda}
                        onChange={handleSearchChange}
                        className="w-[98.5%] text-black"
                    />
                </div>
                <div className="flex gap-4 m-2">
                    <Selecct className="flex-1 text-black" name="categoria" value={filtro.categoria} onChange={handleFilterChange}>
                        <option value="">Todas las categorias</option>
                        <option value="soporte">Soporte</option>
                        <option value="ventas">Ventas</option>
                        <option value="facturacion">Facturación</option>
                        <option value="otros">Otros</option>
                    </Selecct>
                    <Selecct className="flex-1 text-black" name="prioridad" value={filtro.prioridad} onChange={handleFilterChange}>
                        <option value="">Todas las prioridades</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </Selecct>
                    <Selecct className="flex-1 text-black" name="estado" value={filtro.estado} onChange={handleFilterChange}>
                        <option value="">Todos los estados</option>
                        <option value="abierto">Abierto</option>
                        <option value="en_proceso">En proceso</option>
                        <option value="resuelto">Resuelto</option>
                    </Selecct>
                </div>
                {Tickets.length > 0 && (
                    <>
                        <table className=" table-auto w-full border-collapse ">
                            <thead>
                                <tr className="bg-blue-500">
                                    <th className=" p-2">Referencia</th>
                                    <th className=" p-2">Titulo</th>
                                    <th className=" p-2">Categoria</th>
                                    <th className=" p-2">Prioridad</th>
                                    <th className=" p-2">Estado</th>
                                    <th className=" p-2">Creado</th>
                                    <th className=" p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Tickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td className=" text-black p-2 truncate text-center underline cursor-pointer hover:text-blue-600"
                                            onClick={() => {
                                                navigator.clipboard.writeText(ticket.referencia)
                                                toast.success('¡Referencia copiada al portapapeles!');
                                            }}
                                            title="Copiar"
                                        >
                                            {ticket.referencia}</td>
                                        <td className=" text-black p-2 truncate text-center">{truncateText(ticket.titulo, 30)}</td>
                                        <td className=" text-black p-2 truncate text-center">{ticket.categoria}</td>
                                        <td className=" text-black p-2 truncate text-center">{ticket.prioridad}</td>
                                        <td className="text-center p-2">
                                            <span className={`inline-block px-3 py-1 rounded-2xl text-white ${ticket.estado === "abierto" ? "bg-blue-500" : ticket.estado === "resuelto" ? "bg-green-500" : "bg-yellow-500 "}`}>
                                                {ticket.estado}
                                            </span>
                                        </td>
                                        <td className=" text-black p-2 truncate text-center">{new Date(ticket.created_at).toLocaleString()}</td>
                                        <td className=" text-center px-2.5" title="Detalles">
                                            <Link href={`/tickets/${ticket.id}`}>
                                                <div className="flex items-center justify-center  ">
                                                    <MdOutlineModeEdit className="text-blue-600 w-6 h-6" />
                                                </div>

                                            </Link>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-4 pb-4">
                                <Button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded ${currentPage === 1
                                        ? 'bg-gray-300 hover:bg-gray-300'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    Anterior
                                </Button>
                                <span className="text-black">
                                    Página {currentPage} de {totalPages}
                                </span>
                                <Button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={` ${currentPage === totalPages
                                        ? 'bg-gray-300 hover:bg-gray-300'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    Siguiente
                                </Button>
                            </div>
                        )}
                    </>
                )}
                {Tickets.length === 0 && (
                    <div className=" w-full border-collapse text-center justify-center "><p className=" text-black">No hay tickets</p></div>
                )}
            </div>
        </div>
    );
}