import { useEffect, useState } from "react";

export type Formacion = {
  id_formacion: number;
  nombre_formacion: string;
  sede: string;
  desc_formacion: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  img_formacion: string;
};

export function useFormacion() {
  const [formaciones, setFormaciones] = useState<Formacion[]>([]);

  useEffect(() => {
    const fetchFormacion = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/formacion");
        if (!res.ok) throw new Error("Error al traer formaciones");
        const data: Formacion[] = await res.json();
        setFormaciones(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFormacion();
  }, []);

  return formaciones;
}
