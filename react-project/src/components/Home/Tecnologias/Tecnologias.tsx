import './Tecnologias.css'
import { useTecnologias } from './useTecnologias';

export default function Tecnologias() {
  const { tecnologiasPorCategoria, loading, error } = useTecnologias();

  const categorias = ["Lenguajes", "Bases de datos", "Frameworks/Librerías", "Herramientas"];

  return (
    <div id="tecno-container">

      {/* TÍTULO */}

        <h1>Tecnologías</h1>

      {/* MENSAJES DE CARGA O ERROR */}
      {loading ? (
        <p>Cargando tecnologías...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        categorias.map((cat) => {
          const tecs = tecnologiasPorCategoria(cat);

          return (
            <div key={cat}>

              {/* NOMBRE CATEGORÍA */}
              
                <h4>{cat}</h4>


              {/*NOMBRE TECNOLOGÍAS*/}

                {tecs.length > 0 ? (
                    <div className="tec-contenedor">
                    {tecs.map((tec) => (
                        <div key={tec.id_tecnologia} className="card-tecno-leng">
                        <img
                            id="img_tecno"
                            src={`https://portafolio-prime-back.vercel.app${tec.icono}`}
                            alt={`${tec.desc_tecnologia} icono`}
                        />
                        <h3>{tec.desc_tecnologia}</h3>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p>No hay tecnologías registradas.</p>
                )}
                <br />

            </div>
            
          );
        })
      )}
    </div>
  );
}
