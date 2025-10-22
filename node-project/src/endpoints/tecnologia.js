// IMPORTACIONES
const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const authenticateToken = require("./login_auth");

// --- CREAR TECNOLOGÍA ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { desc_tecnologia, categoria, icono } = req.body;

    const result = await pool.query(
      `INSERT INTO tecnologia (desc_tecnologia, categoria, icono)
       VALUES ($1, $2, $3) RETURNING *`,
      [desc_tecnologia, categoria, icono]
    );

    res.json({ message: "Tecnología insertada correctamente", tecnologia: result.rows[0] });
  } catch (error) {
    console.error("Error al insertar tecnología:", error);
    res.status(500).json({ error: "Error al insertar tecnología" });
  }
});

// --- OBTENER TODAS LAS TECNOLOGÍAS ---
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tecnologia ORDER BY id_tecnologia DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener tecnologías:", error);
    res.status(500).json({ error: "Error al obtener tecnologías" });
  }
});

// --- ACTUALIZAR TECNOLOGÍA ---
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { desc_tecnologia, categoria, icono } = req.body;

    const result = await pool.query(
      `UPDATE tecnologia
       SET desc_tecnologia=$1, categoria=$2, icono=$3
       WHERE id_tecnologia=$4
       RETURNING *`,
      [desc_tecnologia, categoria, icono, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Tecnología no encontrada" });

    res.json({ message: "Tecnología actualizada correctamente", tecnologia: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar tecnología:", error);
    res.status(500).json({ error: "Error al actualizar tecnología" });
  }
});

// --- ELIMINAR TECNOLOGÍA ---
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tecnologia WHERE id_tecnologia=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Tecnología no encontrada" });

    res.json({ message: "Tecnología eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tecnología:", error);
    res.status(500).json({ error: "Error al eliminar tecnología" });
  }
});

module.exports = router;
