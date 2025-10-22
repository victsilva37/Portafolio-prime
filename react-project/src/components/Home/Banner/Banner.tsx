//Importar CSS
import './Banner.css'

//Importar imágenes
import foto_perfil from '../../../assets/img/Banner/foto_perfil.jpg'

export default function Banner(){
    return(
        <div id="main-banner-container">

        {/*FOTO PERFIL*/}

            <img src={foto_perfil} alt="" id='logo_perfil'/>
            

        {/*DESCRIPCIÓN*/}

            <div id="IAM-content">
                <h1>Víctor Silva Muñoz</h1>
                <span>Ingeniero en Informática</span>
            </div>
            


        </div>
    )
}