import { navigate } from "@reach/router";
import React from "react";
import { menuLinks } from "./drawer";
import "./footer.scoped.css";

function Footer() {
  return (
    <footer class="footer">
      <ul class="social-icon">
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-facebook" />
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-twitter" />
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-linkedin" />
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-instagram" />
          </a>
        </li>
      </ul>
      <ul class="menu">
        {menuLinks.map((link, index) => (
          <li key={index} class="menu__item">
            <a class="menu__link" onClick={() => navigate(link.path)}>
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
