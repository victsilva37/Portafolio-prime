// proyecto_tecnologia.js
const express = require("express");
const router = express.Router();
const supabase = require("../config/database");
const authenticateToken = require("./login_auth");

// --- ASIGNAR TECNOLOGÍAS A UN PROYECTO ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { id_proyecto, id_tecnologias } = req.body;

    if (!Array.isArray(id_tecnologias) || id_tecnologias.length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un id_tecnologia" });
    }

    // Insertar cada relación proyecto-tecnología
    const inserts = await Promise.all(
      id_tecnologias.map(async (id_tecnologia) => {
        const { error } = await supabase
          .from("proyecto_tecnologia")
          .upsert({ id_proyecto, id_tecnologia }, { onConflict: ["id_proyecto", "id_tecnologia"] });

        if (error) throw error;
      })
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

    const { data, error } = await supabase
      .from("proyecto_tecnologia")
      .select(`
        tecnologia(id_tecnologia, desc_tecnologia, categoria, icono)
      `)
      .eq("id_proyecto", id_proyecto);

    if (error) throw error;

    // Extraemos solo la tecnología
    const tecnologias = data.map((pt) => pt.tecnologia);

    res.json(tecnologias);
  } catch (error) {
    console.error("Error al obtener tecnologías del proyecto:", error);
    res.status(500).json({ error: "Error al obtener tecnologías" });
  }
});

module.exports = router;
