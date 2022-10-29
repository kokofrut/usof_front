import React from 'react'
import "../css/footer.css"
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <div className="foot-wraper">
        {/* <div className="foot-container">
            <div className="foot-social">
                <nav className="foot-nav">
                    <div className="foot-nav-el foot-github">
                        <img src="/icon-github.svg"></img>
                        <like className="foot-li">Github</like>
                    </div>
                    <div className="foot-nav-el foot-telegram">
                        <img src="/icon-telegram.svg"></img>
                        <like className="foot-li">Telegram</like>
                    </div>
                    <div className="foot-nav-el foot-instagram">
                        <img src="/icon-instagram.svg"></img>
                        <like className="foot-li">Instagram</like>
                    </div>
                    
                </nav>
            </div>
            <div className="foot-contact">
                <h3>Contacts</h3>
                <p><del>arseniynikolenko07@gmail.com</del></p>
                <p>share.your.pain@gmail.com</p>
            </div>
        </div> */}
        <div className="foot-cont-left">
            <div className="foot-social">
                <nav className="foot-nav">
                    <div className="foot-nav-el foot-github">
                    <a href="https://github.com/kokofrut">
                        <img src="/icon-github.svg" style={{cursor: 'pointer'}}></img>
                    </a>
                    <a href="https://github.com/kokofrut">
                        <like className="foot-li" style={{cursor: 'pointer'}}>Github</like>
                    </a>
                    </div>
                    <div className="foot-nav-el foot-telegram">
                        <a href="https://t.me/XA12z">
                            <img src="/icon-telegram.svg" style={{cursor: 'pointer'}}></img>
                        </a>
                        <a href="https://t.me/XA12z">
                            <like className="foot-li" style={{cursor: 'pointer'}}>Telegram</like>
                        </a>
                    </div>
                    <div className="foot-nav-el foot-instagram">
                        <a href="https://instagram.com/jebaited_by">
                            <img src="/icon-instagram.svg" style={{cursor: 'pointer'}}></img>
                        </a>
                        <a href="https://instagram.com/jebaited_by">
                            <like className="foot-li" style={{cursor: 'pointer'}}>Instagram</like>
                        </a>
                    </div> 
                </nav>
            </div>
        </div>
        <div className="foot-cont-center">
            <div className="foot-copyright">&copy; Kokofrut.inc || 2022</div>
        </div>
        <div className="foot-cont-right">
            <div className="foot-contact">
                <h3>Contacts</h3>
                <p><del>arseniynikolenko07@gmail.com</del></p>
                <a href="mailto:share.your.pain@gmail.com" target="_blank">
                    <p>share.your.pain@gmail.com</p>
                </a>
            </div>
        </div>
    </div>
  )
}
