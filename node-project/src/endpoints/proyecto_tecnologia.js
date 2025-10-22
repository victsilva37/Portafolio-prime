const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const authenticateToken = require("./login_auth");

// --- ASIGNAR TECNOLOGÍAS A UN PROYECTO ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { id_proyecto, id_tecnologias } = req.body;

    if (!Array.isArray(id_tecnologias) || id_tecnologias.length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un id_tecnologia" });
    }

    await Promise.all(
      id_tecnologias.map(id_tecnologia =>
        pool.query(
          "INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [id_proyecto, id_tecnologia]
        )
      )
    );

    res.json({ message: "Tecnologías asignadas correctamente al proyecto" });
  } catch (error) {
    console.error("Error al asignar tecnologías:", error);
    res.status(500).json({ error: "Error al asignar tecnologías" });
  }
});

// --- OBTENER TECNOLOGÍAS DE UN PROYECTO ---
router.get("/:id_proyecto", async (req, res) => {
  try {
    const { id_proyecto } = req.params;
    const result = await pool.query(
      `SELECT t.id_tecnologia, t.desc_tecnologia, t.categoria, t.icono
       FROM tecnologia t
       JOIN proyecto_tecnologia pt ON t.id_tecnologia = pt.id_tecnologia
       WHERE pt.id_proyecto = $1`,
      [id_proyecto]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener tecnologías del proyecto:", error);
    res.status(500).json({ error: "Error al obtener tecnologías" });
  }
});

module.exports = router;
