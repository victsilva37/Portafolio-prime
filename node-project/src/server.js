const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas

//LOGIN_AUTH*
const authRoutes = require("./endpoints/login_auth");
app.use("/api", authRoutes); // <- login ahora es POST /api/login

//TECNOLOGIA
const tecnologiaRoutes = require("./endpoints/tecnologia");
app.use("/api/tecnologias", tecnologiaRoutes);

//EXPERIENCIA
const experienciaRoutes = require("./endpoints/experiencia")
app.use("/api/experiencias", experienciaRoutes);

//EXPERIENCIA_TECNOLOGIA
const experienciaTecnologiaRoutes = require("./endpoints/experiencia_tecnologia");
app.use("/api/experiencia_tecnologia", experienciaTecnologiaRoutes);

//FORMACION
const formacionRoutes = require("./endpoints/formacion");
app.use("/api/formacion", formacionRoutes);

//PROYECTO
const proyectoRoutes = require("./endpoints/proyecto")
app.use("/api/proyectos", proyectoRoutes);

//PROYECTO_TECNOLOGIA
const proyectoTecnologiaRoutes = require("./endpoints/proyecto_tecnologia");
app.use("/api/proyecto_tecnologia", proyectoTecnologiaRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
