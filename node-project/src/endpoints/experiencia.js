// experiencia.js
const express = require("express");
const router = express.Router();
const supabase = require("../config/database"); // 👈 Importa el cliente de Supabase
const authenticateToken = require("./login_auth");

// Función auxiliar para formatear fecha
function formatFecha(fecha) {
  if (!fecha) return null;
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const d = new Date(fecha);
  const mes = meses[d.getMonth()];
  const anio = d.getFullYear();
  return `${mes} ${anio}`;
}

// --- CREAR EXPERIENCIA ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { cargo_exp, empresa, desc_exp, fecha_inicio, fecha_fin, modalidad, direccion } = req.body;

    const { data, error } = await supabase
      .from("experiencia")
      .insert([
        { cargo_exp, empresa, desc_exp, fecha_inicio, fecha_fin: fecha_fin || null, modalidad, direccion },
      ])
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Experiencia insertada correctamente", experiencia: data });
  } catch (error) {
    console.error("Error al insertar experiencia:", error);
    res.status(500).json({ error: "Error al insertar experiencia" });
  }
});

// --- OBTENER EXPERIENCIAS ---
router.get("/", async (req, res) => {
  try {
    // Obtenemos las experiencias
    const { data: experiencias, error: expError } = await supabase
      .from("experiencia")
      .select("*")
      .order("fecha_inicio", { ascending: false });

    if (expError) throw expError;

    // Para cada experiencia, obtenemos sus tecnologías relacionadas
    const experienciasConTecnologias = await Promise.all(
      experiencias.map(async (exp) => {
        const { data: tecnologias, error: tecError } = await supabase
          .from("experiencia_tecnologia")
          .select(
            `
            id_tecnologia,
            tecnologia (
              id_tecnologia,
              desc_tecnologia,
              categoria,
              icono
            )
            `
          )
          .eq("id_experiencia", exp.id_experiencia);

        if (tecError) throw tecError;

        return {
          ...exp,
          fecha_inicio: formatFecha(exp.fecha_inicio),
          fecha_fin: exp.fecha_fin ? formatFecha(exp.fecha_fin) : null,
          tecnologias: tecnologias?.map((t) => t.tecnologia) || [],
        };
      })
    );

    res.json(experienciasConTecnologias);
  } catch (error) {
    console.error("Error al obtener experiencias:", error);
    res.status(500).json({ error: "Error al obtener experiencias" });
  }
});

// --- ACTUALIZAR EXPERIENCIA ---
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { cargo_exp, empresa, desc_exp, fecha_inicio, fecha_fin, modalidad, direccion } = req.body;

    const { data, error } = await supabase
      .from("experiencia")
      .update({
        cargo_exp,
        empresa,
        desc_exp,
        fecha_inicio,
        fecha_fin: fecha_fin || null,
        modalidad,
        direccion,
      })
      .eq("id_experiencia", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Experiencia actualizada correctamente", experiencia: data });
  } catch (error) {
    console.error("Error al actualizar experiencia:", error);
    res.status(500).json({ error: "Error al actualizar experiencia" });
  }
});

// --- ELIMINAR EXPERIENCIA ---
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("experiencia")
      .delete()
      .eq("id_experiencia", id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0)
      return res.status(404).json({ error: "Experiencia no encontrada" });

    res.json({ message: "Experiencia eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar experiencia:", error);
    res.status(500).json({ error: "Error al eliminar experiencia" });
  }
});

module.exports = router;
