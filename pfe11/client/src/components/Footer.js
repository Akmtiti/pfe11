import React from 'react'

function Footer() {
  return (<footer id="footer">
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-sm-6">
        <div className="footer-info">
          <ul className="social-icon">
            <li>
              <a
                href="https://www.facebook.com/IssatSo"
                className="fa fa-facebook-square"
                attr="facebook icon"
              ></a>
            </li>
            <li>
              <a href="#" className="fa fa-twitter"></a>
            </li>
            <li>
              <a href="#" className="fa fa-instagram"></a>
            </li>
            <li>
              <a href="#" className="fa fa-youtube"></a>
            </li>
          </ul>
          <div className="copyright-text">
            <p>
              Copyright &copy; 2022 Institut Supérieur des Sciences
              Appliquées et de Technologie de Sousse
            </p>

            <p>Design: Akram Mourali</p>
          </div>
        </div>
        <div className="localisation">
          <a href="#" className="fa fa-map-marker" aria-hidden="true">
            {" "}
            &nbsp;&nbsp;ISSAT Sousse Cité Taffala (Ibn Khaldoun) 4003{" "}
            <br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sousse Tunisie
          </a>
        </div>
      </div>

      <div className="col-md-4 col-sm-6">
        <div className="footer-info">
          <div className="section-title">
            <h2>Contact Info</h2>
          </div>
          <address>
            <div className="social-icon">
              <p>
                {" "}
                <a href="#" className="fa fa-phone">
                  {" "}
                  +216 73 382 656
                </a>
              </p>
              <p>
                {" "}
                <a href="#" className="fa fa-fax">
                  {" "}
                  +216 73 382 658
                </a>
              </p>
            </div>
            <p>
              {" "}
              <a
                href="mailto: issatso@issatso.rnu.tn"
                className="fa fa-envelope"
              >
                {" "}
                issatso@issatso.rnu.tn
              </a>
            </p>
          </address>
          <div className="footer_menu">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="http://www.issatso.rnu.tn/fo/presentation/historique.php">
                  A propos de l'ISSAT
                </a>
              </li>
              <br></br>
              <li>
                <a href="http://www.mes.tn/">
                  Ministère Ens. Sup. Rech. Sc.
                </a>
              </li>{" "}
              <br></br>
              <li>
                <a href="https://www4.inscription.tn/">Inscription.tn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="col-md-4 col-sm-12">
        <div className="footer-info newsletter-form">
          <div className="section-title">
            <h2>Newsletter Signup</h2>
          </div>
          <div>
            <div className="form-group">
              <form action="#" method="get">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  required=""
                />
                <input
                  type="submit"
                  className="form-control"
                  name="submit"
                  id="form-submit"
                  value="Send me"
                />
              </form>
              <span>
                <sup>*</sup> Please note - we do not spam your email.
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  </div>
</footer>)
}

export default Footer