import React from 'react'
import './Footer.css'
import image from '../../images/Amazin.png'

export default function Footer() {
  return (
    <div>
      <div className="footer-container">
        <div className="back-to-top-btn" onClick={() => document.body.scrollTop = document.documentElement.scrollTop = 0}>Back to top</div>
        <div className="footer-links">
          <img
            className="footer-logo"
            src={image}
          />
          <div className="footer-social-links">
            <a className="social-link" href="https://www.linkedin.com/in/angel-mendez-731928224/" target="_blank"><i className="fab fa-linkedin"></i></a>
            <a className="social-link" href="https://github.com/mendezangel" target="_blank"><i className="fab fa-github-square"></i></a>
          </div>
        </div>
        <div className="footer-credits">
          Amazin.com is a clone of Amazon.com. Created by Angel Mendez 2022.
        </div>
      </div>
    </div>
  )
}
