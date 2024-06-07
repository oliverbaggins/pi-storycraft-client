import React from 'react'
import circulo from '../Assets/circulo.svg'
import { Link } from 'react-router-dom';
import './NewProject.css'
import Logo from "../Assets/Logo.svg";

function NewProject() {
  return (
      <div className='Content-inside'>
        
            <img className='logoIgm2' src={Logo} alt='Logo'/>
          
        <Link className='add-new' to="/new-new-project">
          <p className='add-new-text'>
            Clique aqui para criar um novo projeto
          </p>
          <img src={circulo} alt='circulo' />
        </Link>
      </div>
  )
}

export default NewProject