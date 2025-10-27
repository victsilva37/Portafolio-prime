import "./Proyectos.css";
import { useProyectos, type Proyecto } from "./useProyectos";


export default function Proyectos() {
  const proyectos = useProyectos();

  return (
    <div id="proy-main-container">
      <h1>Proyectos</h1>
      <div id="proyectos-content">
        {proyectos.length > 0 ? (
          proyectos.map((proyecto: Proyecto) => (
            <div key={proyecto.id_proyecto} className="proyecto-item">

              {/* BANNER DEL PROYECTO */}
              <div id="banner_img_proyecto">
                <img
                  src={`https://portafolio-prime-back.vercel.app/${proyecto.img_proyecto}`}
                  alt={proyecto.nombre_proyecto}
                />
              </div>

              {/* INFORMACIÓN DEL PROYECTO */}
              <h4>{proyecto.nombre_proyecto}</h4>
              <p>{proyecto.desc_proyecto}</p>

              {/* TECNOLOGÍAS */}
              {proyecto.tecnologias && proyecto.tecnologias.length > 0 && (
                <ul id="tec-pro">
                  {proyecto.tecnologias.map((tec) => (
                    <li key={tec.id_tecnologia}>
                      <img
                        id="icon_tecnolo"
                        src={`https://portafolio-prime-back.vercel.app${tec.icono}`}
                        alt={tec.desc_tecnologia}
                        title={tec.desc_tecnologia}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {/* LINK DE REPOSITORIO */}
              <div id="a-link-repo">
                <strong>
                  <a href={proyecto.link_repo} target="_blank">
                    Ver detalle
                  </a>
                </strong>
              </div>
            </div>
          ))
        ) : (
          <p>No hay proyectos registrados.</p>
        )}
      </div>
    </div>
  );
}
