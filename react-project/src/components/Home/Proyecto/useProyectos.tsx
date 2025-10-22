import { useState, useEffect } from "react";

export interface Tecnologia {
  id_tecnologia: number;
  desc_tecnologia: string;
  categoria: string;
  icono: string;
}

export interface Proyecto {
  id_proyecto: number;
  nombre_proyecto: string;
  desc_proyecto: string;
  img_proyecto: string;
  link_repo: string;
  tecnologias: Tecnologia[];
}

export function useProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    async function fetchProyectos() {
      try {
        const response = await fetch("http://localhost:3000/api/proyectos");
        const data = await response.json();
        setProyectos(data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    }

    fetchProyectos();
  }, []);

  return proyectos;
}
