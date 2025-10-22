import { useEffect, useState } from 'react';

export type Tecnologia = {
  id_tecnologia: number;
  desc_tecnologia: string;
  categoria: string;
  icono: string;
};

export function useTecnologias() {
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTecnologias = async () => {
      try {
        const res = await fetch("https://portafolio-prime-back.vercel.app/api/tecnologias", {
          headers: {
            Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error("Error al traer tecnologías");

        const data: Tecnologia[] = await res.json();
        setTecnologias(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTecnologias();
  }, []);

  const tecnologiasPorCategoria = (categoria: string) =>
    tecnologias.filter((tec) => tec.categoria === categoria);

  return { tecnologias, tecnologiasPorCategoria, loading, error };
}
