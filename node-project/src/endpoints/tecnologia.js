// IMPORTACIONES
const express = require("express");
const router = express.Router();
const supabase = require("../config/database");
const authenticateToken = require("./login_auth");

// --- CREAR TECNOLOGÍA ---
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { desc_tecnologia, categoria, icono } = req.body;

    const { data, error } = await supabase
      .from("tecnologia")
      .insert([{ desc_tecnologia, categoria, icono }])
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: "Tecnología insertada correctamente",
      tecnologia: data,
    });
  } catch (error) {
    console.error("Error al insertar tecnología:", error);
    res.status(500).json({ error: "Error al insertar tecnología" });
  }
});

// --- OBTENER TODAS LAS TECNOLOGÍAS ---
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tecnologia")
      .select("*")
      .order("id_tecnologia", { ascending: false });

    if (error) throw error;

    res.json(data);
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

    const { data, error } = await supabase
      .from("tecnologia")
      .update({ desc_tecnologia, categoria, icono })
      .eq("id_tecnologia", id)
      .select()
      .single();

    if (error) throw error;

    if (!data)
      return res.status(404).json({ error: "Tecnología no encontrada" });

    res.json({
      message: "Tecnología actualizada correctamente",
      tecnologia: data,
    });
  } catch (error) {
    console.error("Error al actualizar tecnología:", error);
    res.status(500).json({ error: "Error al actualizar tecnología" });
  }
});

// --- ELIMINAR TECNOLOGÍA ---
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("tecnologia")
      .delete()
      .eq("id_tecnologia", id);

    if (error) throw error;

    res.json({ message: "Tecnología eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tecnología:", error);
    res.status(500).json({ error: "Error al eliminar tecnología" });
  }
});

module.exports = router;
