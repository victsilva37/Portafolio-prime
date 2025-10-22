const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const authenticateToken = require("./login_auth");

// --- CREAR PROYECTO ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { nombre_proyecto, desc_proyecto, img_proyecto, link_repo } = req.body;
    const result = await pool.query(
      `INSERT INTO proyecto (nombre_proyecto, desc_proyecto, img_proyecto, link_repo)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre_proyecto, desc_proyecto, img_proyecto, link_repo]
    );
    res.json({ message: "Proyecto creado correctamente", proyecto: result.rows[0] });
  } catch (error) {
    console.error("Error al crear proyecto:", error);
    res.status(500).json({ error: "Error al crear proyecto" });
  }
});

// --- OBTENER TODOS LOS PROYECTOS ---
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*,
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
      FROM proyecto p
      LEFT JOIN proyecto_tecnologia pt ON p.id_proyecto = pt.id_proyecto
      LEFT JOIN tecnologia t ON t.id_tecnologia = pt.id_tecnologia
      GROUP BY p.id_proyecto
      ORDER BY p.id_proyecto DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
});

// --- ACTUALIZAR PROYECTO ---
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_proyecto, desc_proyecto, img_proyecto, link_repo } = req.body;
    const result = await pool.query(
      `UPDATE proyecto
       SET nombre_proyecto=$1, desc_proyecto=$2, img_proyecto=$3, link_repo=$4
       WHERE id_proyecto=$5 RETURNING *`,
      [nombre_proyecto, desc_proyecto, img_proyecto, link_repo, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    res.json({ message: "Proyecto actualizado correctamente", proyecto: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar proyecto:", error);
    res.status(500).json({ error: "Error al actualizar proyecto" });
  }
});

// --- ELIMINAR PROYECTO ---
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM proyecto WHERE id_proyecto=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    res.json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
    res.status(500).json({ error: "Error al eliminar proyecto" });
  }
});

module.exports = router;
