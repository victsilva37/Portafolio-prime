import Banner from "../components/Home/Banner/Banner";
import Experiencia from "../components/Home/Experiencia/Experiencia";
import Formacion from "../components/Home/Formacion/Formacion";
import Proyectos from "../components/Home/Proyecto/Proyectos";
import SobreMi from "../components/Home/SobreMi/SobreMi";
import Tecnologias from "../components/Home/Tecnologias/Tecnologias";
import Footer from "../layouts/Footer/Footer";
import Header from "../layouts/Header/Header";
import Sidebar from "../layouts/Sidebar/Sidebar";

export default function Home(){
    return(

        <div>
            
            {/* Layout: Header */}
            <Header/>

            {/* Layout: Sidebar */}
            <Sidebar/>

            {/* Component: Banner */}
            <section id="banner">
                <Banner />
            </section>

            {/* Component: SobreMi */}
            <section id="sobre-mi">
                <SobreMi />
            </section>

            {/* Component: Tecnologias */}
            <section id="tecnologias">
                <Tecnologias />
            </section>

            {/* Component: Experiencia */}
            <section id="experiencia">
                <Experiencia />
            </section>

            {/* Component: Formacion */}
            <section id="formacion">
                <Formacion />
            </section>

            {/* Component: Proyectos */}
            <section id="proyectos">
                <Proyectos />
            </section>


            {/* Layout: Footer */}
            <Footer/>

        </div>
        
    )
}