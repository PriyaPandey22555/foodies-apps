import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-center">
      <div className="container p-4 pb-0">
        <section className="mb-4">

          <a className="btn text-white rounded-circle m-1"
            style={{backgroundColor: "#3b5998"}}
            href="https://www.facebook.com/" role="button">
            <i className="fab fa-facebook-f"></i>
          </a>

          <a className="btn text-white rounded-circle m-1"
            style={{backgroundColor: "#55acee"}}
            href="https://x.com/?lang=en-in" role="button">
            <i className="fab fa-twitter"></i>
          </a>

          <a className="btn text-white rounded-circle m-1"
            style={{backgroundColor: "#dd4b39"}}
            href="https://www.google.com/" role="button">
            <i className="fab fa-google"></i>
          </a>

          <a className="btn text-white rounded-circle m-1"
            style={{backgroundColor: "#ac2bac"}}
            href="https://www.instagram.com/" role="button">
            <i className="fab fa-instagram"></i>
          </a>

          <a className="btn text-white rounded-circle m-1"
            style={{backgroundColor: "#0082ca"}}
            href="https://www.linkedin.com/" role="button">
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a className="btn text-white rounded-circle m-1"
            style={{backgroundColor: "#333333"}}
            href="https://github.com/" role="button">
            <i className="fab fa-github"></i>
          </a>

        </section>
      </div>

      <div className="text-center p-3"
        style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
        © 2026 Copyright: <strong>Foodies</strong>
      </div>

    </footer>
  )
}

export default Footer;