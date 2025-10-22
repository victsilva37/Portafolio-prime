import { useEffect, useState } from "react";

export type Tecnologia = {
  id_tecnologia: number;
  desc_tecnologia: string;
  categoria: string;
  icono: string;
};

export type Experiencia = {
  id_experiencia: number;
  cargo_exp: string;
  desc_exp: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  modalidad: string;
  nombre_empresa: string;
  direccion: string;
  tecnologias: Tecnologia[];
};

export const useExperiencias = () => {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);

  useEffect(() => {
    const fetchExperiencias = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/experiencias", {
          headers: {
            Authorization: `Bearer ${import.meta.env.REACT_APP_API_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error("Error al traer experiencias");

        const data: Experiencia[] = await res.json();
        setExperiencias(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExperiencias();
  }, []);

  return experiencias;
};
