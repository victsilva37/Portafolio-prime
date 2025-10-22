const express = require("express");
const router = express.Router();
const pool = require("../config/database");
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
    const result = await pool.query(
      `INSERT INTO formacion 
       (nombre_formacion, sede, desc_formacion, fecha_inicio, fecha_fin, img_formacion)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nombre_formacion, sede, desc_formacion, fecha_inicio, fecha_fin || null, img_formacion]
    );
    res.json({ message: "Formación insertada correctamente", formacion: result.rows[0] });
  } catch (error) {
    console.error("Error al insertar formación:", error);
    res.status(500).json({ error: "Error al insertar formación" });
  }
});

// --- OBTENER TODA LA FORMACIÓN ---
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM formacion ORDER BY fecha_inicio DESC");

    // Formatear fechas antes de enviar al frontend
    const formaciones = result.rows.map(f => ({
      ...f,
      fecha_inicio: formatFecha(f.fecha_inicio),
      fecha_fin: f.fecha_fin ? formatFecha(f.fecha_fin) : null
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

    const result = await pool.query(
      `UPDATE formacion
       SET nombre_formacion=$1, sede=$2, desc_formacion=$3, fecha_inicio=$4, fecha_fin=$5, img_formacion=$6
       WHERE id_formacion=$7 RETURNING *`,
      [nombre_formacion, sede, desc_formacion, fecha_inicio, fecha_fin || null, img_formacion, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Formación no encontrada" });

    res.json({ message: "Formación actualizada correctamente", formacion: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar formación:", error);
    res.status(500).json({ error: "Error al actualizar formación" });
  }
});

// --- ELIMINAR FORMACIÓN ---
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM formacion WHERE id_formacion=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Formación no encontrada" });

    res.json({ message: "Formación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar formación:", error);
    res.status(500).json({ error: "Error al eliminar formación" });
  }
});

module.exports = router;
