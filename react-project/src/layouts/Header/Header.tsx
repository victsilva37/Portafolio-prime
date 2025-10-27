//Importar CSS
import './Header.css'

//Importar Hook
import { useHeader } from './useHeader';

//Importar imágenes
import icono_menu from '../../assets/img/Menu/icono_menu.png'

export default function Menu(){

    const { menuActive, toggleMenu } = useHeader();

    return(
        <div id='menu-main-container'>

            {/*BOTÓN MENÚ HAMBURGUESA*/}

                <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
                    <img src={icono_menu} alt="" />
                </div>


            {/*MENÚ NAVEGACIÓN*/}

                <ul id="menuNav" className={menuActive ? "active" : ""}>
                    <li><a href="#banner">INICIO</a></li>
                    <li><a href="#sobre-mi">SOBRE MÍ</a></li>
                    <li><a href="#tecnologias">TECNOLOGÍAS</a></li>
                    <li><a href="#experiencia">EXPERIENCIA</a></li>
                    <li><a href="#formacion">FORMACIÓN</a></li>
                    <li><a href="#proyectos">PROYECTOS</a></li>
                </ul>
        </div>
    )
}