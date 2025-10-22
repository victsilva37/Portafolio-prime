import "./Experiencia.css";
import { useExperiencias, type Experiencia } from "./useExperiencia";

export default function Experiencias() {
  const experiencias = useExperiencias();

  return (
    <div id="exp-main-container">
      <h1>Experiencia</h1>

      <div id="exp-content">
        {experiencias.length > 0 ? (
          experiencias.map((exp: Experiencia) => (
            <div key={exp.id_experiencia} className="exp-item">

              {/* SECCIÓN INFO */}
              <h4>
                <strong>{exp.cargo_exp}</strong> - {exp.nombre_empresa}
              </h4>
              
              <small>
                {exp.direccion} |{" "}
                <strong>
                  {exp.fecha_inicio} - {exp.fecha_fin ?? "Actual"}
                </strong>
              </small>

              <p>{exp.desc_exp}</p>

              {/* SECCIÓN TECNOLOGÍAS */}
              {exp.tecnologias && exp.tecnologias.length > 0 && (
                <div id="tec-exp">
                  <ul>
                    {exp.tecnologias.map((tec) => (
                      <li key={tec.id_tecnologia}>

                        {/*Icono tecnología*/}
                        <img
                          src={`http://localhost:3000${tec.icono}`}
                          alt={tec.desc_tecnologia}
                          style={{ width: 20, height: 20, marginRight: 5 }}
                        />
                        
                        {/*Nombre tecnologia */}
                        <small>{tec.desc_tecnologia}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modalidad */}
              <div id="modalidad-exp">
                <ul>
                  <li id="li-modalidad">{exp.modalidad}</li>
                </ul>
              </div>
              <br />
            </div>
          ))
        ) : (
          <p>No hay experiencias registradas.</p>
        )}
      </div>
      <br />
    </div>
  );
}
