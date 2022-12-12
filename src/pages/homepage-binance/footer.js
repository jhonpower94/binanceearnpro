import { navigate } from "@reach/router";
import React from "react";
import { menuLinks } from "./drawer";
import "./footer.scoped.css";

function Footer() {
  return (
    <footer className="footer">
      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-facebook" />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-twitter" />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-linkedin" />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-instagram" />
          </a>
        </li>
      </ul>
      <ul className="menu">
        {menuLinks.map((link, index) => (
          <li key={index} className="menu__item">
            <a className="menu__link" onClick={() => navigate(link.path)}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      <p>&copy;2022 Binance earn pro | All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
