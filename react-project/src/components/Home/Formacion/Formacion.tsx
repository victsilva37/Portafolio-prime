import "./Formacion.css";
import { useFormacion, type Formacion as FormacionType } from "./useFormacion";

export default function Formacion() {
  const formaciones = useFormacion();

  return (
    <div id="form-main-container">
      <h1>Formación</h1>

      <div id="form-content">
        {formaciones.length > 0 ? (
          formaciones.map((form: FormacionType) => (
            <div key={form.id_formacion} className="form-item">
              <div className="form-details">
                <h4>
                  <strong>{form.nombre_formacion}</strong> - {form.sede}
                </h4>
                <small>
                  (<strong>{form.fecha_inicio} - {form.fecha_fin ?? "Actual"}</strong>)
                </small>
              </div>

              <div className="form-logo">
                <p>{form.desc_formacion}</p>
                <img
                  src={`http://localhost:3000${form.img_formacion}`}
                  alt={`Logo ${form.sede}`}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No hay formaciones registradas.</p>
        )}
      </div>
    </div>
  );
}
