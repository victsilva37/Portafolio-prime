const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const authenticateToken = require("./login_auth");

// --- ASIGNAR TECNOLOGÍAS A UNA EXPERIENCIA ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { id_experiencia, id_tecnologias } = req.body; 
    // id_tecnologias es un array de ids

    if (!Array.isArray(id_tecnologias) || id_tecnologias.length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un id_tecnologia" });
    }

    // Insertar cada tecnología para la experiencia
    const inserts = await Promise.all(
      id_tecnologias.map((id_tecnologia) =>
        pool.query(
          "INSERT INTO experiencia_tecnologia (id_experiencia, id_tecnologia) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [id_experiencia, id_tecnologia]
        )
      )
    );

    res.json({ message: "Tecnologías asignadas correctamente" });
  } catch (error) {
    console.error("Error al asignar tecnologías:", error);
    res.status(500).json({ error: "Error al asignar tecnologías" });
  }
});

// --- OBTENER TECNOLOGÍAS DE UNA EXPERIENCIA ---
router.get("/:id_experiencia", async (req, res) => {
  try {
    const { id_experiencia } = req.params;

    const result = await pool.query(
      `SELECT t.id_tecnologia, t.desc_tecnologia, t.categoria, t.icono
       FROM tecnologia t
       JOIN experiencia_tecnologia et ON t.id_tecnologia = et.id_tecnologia
       WHERE et.id_experiencia = $1`,
      [id_experiencia]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener tecnologías de la experiencia:", error);
    res.status(500).json({ error: "Error al obtener tecnologías" });
  }
});

module.exports = router;
