import React from "react";
import "./fonts/index.min.scoped.css";
import "./fonts/font.min.scoped.css";
import "./styles.scoped.css";

function AboutUs() {
  return (
    <>
      <section class="pagetitle">
        <div class="title">
          <h2>About Us</h2>
        </div>
      </section>

      <section class="bodycontent">
        <p>
          Established at block height 433179, Unchained Traded is the world’s
          premier bitcoin financial services company.
          <br />
          <br />
          Our mission is to build a bitcoin-native ecosystem that ensures
          everyone can secure and maximize the value of their bitcoin holdings
          over multiple generations.
          <br />
          <br />
          We believe bitcoin provides infrastructure for a free and open
          financial system far superior to current fiat standards. Our
          self-custody vaults and financial services leverage the bitcoin
          protocol to deliver safe, easy-to-use, and transparent products that
          empower clients to hold private keys. Our company is made up of a
          diverse, multi-disciplinary group of individuals with high standards
          for excellence. All of our clients receive a premium support
          experience, and we respect client privacy by collecting only essential
          personal and financial information. Our team is committed to our
          vision of bitcoin ubiquity and a future financial system built on the
          right values and principles.
        </p>
      </section>
    </>
  );
}

export default AboutUs;
