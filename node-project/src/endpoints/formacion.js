// formacion.js
const express = require("express");
const router = express.Router();
const supabase = require("../config/database");
const authenticateToken = require("./login_auth");

// Función auxiliar para formatear fecha
function formatFecha(fecha) {
  if (!fecha) return null;
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const d = new Date(fecha);
  return `${meses[d.getMonth()]} ${d.getFullYear()}`;
}

// --- CREAR FORMACIÓN ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { nombre_formacion, sede, desc_formacion, fecha_inicio, fecha_fin, img_formacion } = req.body;

    const { data, error } = await supabase
      .from("formacion")
      .insert([
        {
          nombre_formacion,
          sede,
          desc_formacion,
          fecha_inicio,
          fecha_fin: fecha_fin || null,
          img_formacion
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Formación insertada correctamente", formacion: data });
  } catch (error) {
    console.error("Error al insertar formación:", error);
    res.status(500).json({ error: "Error al insertar formación" });
  }
});

// --- OBTENER TODA LA FORMACIÓN ---
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("formacion")
      .select("*")
      .order("fecha_inicio", { ascending: false });

    if (error) throw error;

    const formaciones = data.map((f) => ({
      ...f,
      fecha_inicio: formatFecha(f.fecha_inicio),
      fecha_fin: f.fecha_fin ? formatFecha(f.fecha_fin) : null,
    }));

    res.json(formaciones);
  } catch (error) {
    console.error("Error al obtener formación:", error);
    res.status(500).json({ error: "Error al obtener formación" });
  }
});

// --- ACTUALIZAR FORMACIÓN ---
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_formacion, sede, desc_formacion, fecha_inicio, fecha_fin, img_formacion } = req.body;

    const { data, error } = await supabase
      .from("formacion")
      .update({
        nombre_formacion,
        sede,
        desc_formacion,
        fecha_inicio,
        fecha_fin: fecha_fin || null,
        img_formacion,
      })
      .eq("id_formacion", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Formación actualizada correctamente", formacion: data });
  } catch (error) {
    console.error("Error al actualizar formación:", error);
    res.status(500).json({ error: "Error al actualizar formación" });
  }
});

// --- ELIMINAR FORMACIÓN ---
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("formacion")
      .delete()
      .eq("id_formacion", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: "Formación no encontrada" });

    res.json({ message: "Formación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar formación:", error);
    res.status(500).json({ error: "Error al eliminar formación" });
  }
});

module.exports = router;
