import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* Column 1 */}
          <div className="footer-col">
            <h4>Brains Behind the Project</h4>
            <ul>
              <li>Barak Pearlmutter</li>
              <li><a href="mailto:barak.pearlmutter@mu.ie">barak.pearlmutter@mu.ie</a></li>
              <li><a href="mailto:osaze.irhue.2022@mumail.ie">osaze.irhue.2022@mumail.ie</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4>Maynooth Computer Science Dept.</h4>
            <ul>
              <li>Maynooth, Co. Kildare</li>
              <li>(01) 708 3847</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li><a href="mailto:computerscience.department@mu.ie">computerscience.department@mu.ie</a></li>
              <li><a href="https://twitter.com/MU_CompSci" target="_blank">@MU_CompSci</a></li>
              <li><a href="https://instagram.com/MaynoothUni" target="_blank">@MaynoothUni</a></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Math-You-Goo | All Rights Reserved | <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

  