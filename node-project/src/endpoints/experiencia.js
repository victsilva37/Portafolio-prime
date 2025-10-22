const express = require("express");
const router = express.Router();
const pool = require("../config/database");
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
    const result = await pool.query(
      `INSERT INTO experiencia 
       (cargo_exp, empresa, desc_exp, fecha_inicio, fecha_fin, modalidad, direccion)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [cargo_exp, empresa, desc_exp, fecha_inicio, fecha_fin || null, modalidad, direccion]
    );
    res.json({ message: "Experiencia insertada correctamente", experiencia: result.rows[0] });
  } catch (error) {
    console.error("Error al insertar experiencia:", error);
    res.status(500).json({ error: "Error al insertar experiencia" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'id_tecnologia', t.id_tecnologia,
              'desc_tecnologia', t.desc_tecnologia,
              'categoria', t.categoria,
              'icono', t.icono
            )
          ) FILTER (WHERE t.id_tecnologia IS NOT NULL), '[]'
        ) AS tecnologias
      FROM experiencia e
      LEFT JOIN experiencia_tecnologia et ON e.id_experiencia = et.id_experiencia
      LEFT JOIN tecnologia t ON t.id_tecnologia = et.id_tecnologia
      GROUP BY e.id_experiencia
      ORDER BY e.fecha_inicio DESC
    `);

    // Formatear las fechas antes de enviar
    const experienciasFormateadas = result.rows.map(exp => ({
      ...exp,
      fecha_inicio: formatFecha(exp.fecha_inicio),
      fecha_fin: exp.fecha_fin ? formatFecha(exp.fecha_fin) : null
    }));

    res.json(experienciasFormateadas);
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

    const result = await pool.query(
      `UPDATE experiencia
       SET cargo_exp=$1, empresa=$2, desc_exp=$3, fecha_inicio=$4, fecha_fin=$5, modalidad=$6, direccion=$7
       WHERE id_experiencia=$8 RETURNING *`,
      [cargo_exp, empresa, desc_exp, fecha_inicio, fecha_fin || null, modalidad, direccion, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Experiencia no encontrada" });

    res.json({ message: "Experiencia actualizada correctamente", experiencia: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar experiencia:", error);
    res.status(500).json({ error: "Error al actualizar experiencia" });
  }
});

// --- ELIMINAR EXPERIENCIA ---
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM experiencia WHERE id_experiencia=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Experiencia no encontrada" });

    res.json({ message: "Experiencia eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar experiencia:", error);
    res.status(500).json({ error: "Error al eliminar experiencia" });
  }
});

module.exports = router;
