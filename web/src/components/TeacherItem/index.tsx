import React from 'react'

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'


function TeacherItem () {
    return (
        <article className="teacher-item">
        <header>
            <img src="https://avatars3.githubusercontent.com/u/55164405?s=460&u=624b1a16f23fbd8943719a202fcda826d7bbec7b&v=4" alt="foto"/>
            <div>
                <strong>Lucas lameira</strong>
                <span>Música</span>
            </div>
        </header>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br/>
             Distinctio dolore harum non laboriosam illo quae dicta esse, autem officia. <br/>
             Recusandae eaque aliquid omnis mollitia ullam officia nisi beatae ipsum laudantium?
        </p>

        <footer>
            <p>
                Preço/hora
                <strong>R$90</strong>
            </p>
            <button type="button">
                <img src={whatsappIcon} alt="whatsapp"/>
                Entrar em contato
            </button>
        </footer>
     </article>
    );
}

export default TeacherItem;