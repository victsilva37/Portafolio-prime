// experiencia_tecnologia.js
const express = require("express");
const router = express.Router();
const supabase = require("../config/database");
const authenticateToken = require("./login_auth");

// --- ASIGNAR TECNOLOGÍAS A UNA EXPERIENCIA ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { id_experiencia, id_tecnologias } = req.body; // id_tecnologias es un array de ids

    if (!Array.isArray(id_tecnologias) || id_tecnologias.length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un id_tecnologia" });
    }

    // Insertar cada tecnología para la experiencia (evitando duplicados con upsert)
    const { error } = await supabase
      .from("experiencia_tecnologia")
      .upsert(
        id_tecnologias.map((id_tecnologia) => ({ id_experiencia, id_tecnologia })),
        { onConflict: ["id_experiencia", "id_tecnologia"] }
      );

    if (error) throw error;

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

    const { data, error } = await supabase
      .from("experiencia_tecnologia")
      .select("tecnologia(id_tecnologia, desc_tecnologia, categoria, icono)")
      .eq("id_experiencia", id_experiencia);

    if (error) throw error;

    // Extraemos los objetos de tecnología del array
    const tecnologias = data.map((item) => item.tecnologia);

    res.json(tecnologias);
  } catch (error) {
    console.error("Error al obtener tecnologías de la experiencia:", error);
    res.status(500).json({ error: "Error al obtener tecnologías" });
  }
});

module.exports = router;
