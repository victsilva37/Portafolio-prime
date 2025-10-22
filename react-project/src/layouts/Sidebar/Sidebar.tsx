import "./Sidebar.css";

import logo_CV from '../../assets/img/Sidebar/logo_CV.png'
import logo_linkedin from '../../assets/img/Sidebar/logo_linkedin.png'
import logo_gmail from '../../assets/img/Sidebar/logo_gmail.png'

import cvPDF from "../../assets/img/Sidebar/CV_VictorSilvaM.pdf";

export default function Sidebar() {
  return (
    <div id="sidebar">
      <ul>
        <li>
          <a
            href={cvPDF}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo_CV} alt="CV de Víctor Silva" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/victsilva37"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo_linkedin} alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=victormau.sm2@gmail.com&su=Contacto&body=Hola, Víctor. Me gustaría ponerme en contacto contigo."
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo_gmail} alt="Enviar correo a Víctor" />
          </a>
        </li>
      </ul>
    </div>
  );
}
