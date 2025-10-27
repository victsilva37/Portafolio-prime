// proyecto.js
const express = require("express");
const router = express.Router();
const supabase = require("../config/database");
const authenticateToken = require("./login_auth");

// --- CREAR PROYECTO ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { nombre_proyecto, desc_proyecto, img_proyecto, link_repo } = req.body;

    const { data, error } = await supabase
      .from("proyecto")
      .insert([{ nombre_proyecto, desc_proyecto, img_proyecto, link_repo }])
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Proyecto creado correctamente", proyecto: data });
  } catch (error) {
    console.error("Error al crear proyecto:", error);
    res.status(500).json({ error: "Error al crear proyecto" });
  }
});

// --- OBTENER TODOS LOS PROYECTOS ---
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("proyecto")
      .select(`
        *,
        proyecto_tecnologia!inner(
          tecnologia(id_tecnologia, desc_tecnologia, categoria, icono)
        )
      `)
      .order("id_proyecto", { ascending: false });

    if (error) throw error;

    // Extraemos las tecnologías de cada proyecto
    const proyectos = data.map((p) => ({
      ...p,
      tecnologias: p.proyecto_tecnologia?.map((pt) => pt.tecnologia) || [],
      proyecto_tecnologia: undefined, // eliminamos la propiedad intermedia
    }));

    res.json(proyectos);
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

    const { data, error } = await supabase
      .from("proyecto")
      .update({ nombre_proyecto, desc_proyecto, img_proyecto, link_repo })
      .eq("id_proyecto", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Proyecto actualizado correctamente", proyecto: data });
  } catch (error) {
    console.error("Error al actualizar proyecto:", error);
    res.status(500).json({ error: "Error al actualizar proyecto" });
  }
});

// --- ELIMINAR PROYECTO ---
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("proyecto")
      .delete()
      .eq("id_proyecto", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: "Proyecto no encontrado" });

    res.json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
    res.status(500).json({ error: "Error al eliminar proyecto" });
  }
});

module.exports = router;
