import React from "react";
import Investments from "./investments";
import "./fonts/index.min.scoped.css";
import "./fonts/font.min.scoped.css";
import "./styles.scoped.css";

function InvestmentPage() {
  return (
    <>
      <section class="pagetitle">
        <div class="title">
          <h2>Our investment plans</h2>
        </div>
      </section>

      <section class="bodycontent">
        <Investments />
      </section>
    </>
  );
}

export default InvestmentPage;
