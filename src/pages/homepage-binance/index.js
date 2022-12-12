import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import React from "react";
import MenuDrawer, { menuLinks } from "./drawer";
import "./fonts/font.min.scoped.css";
import "./fonts/index.min.scoped.css";
import Footer from "./footer";
import "./styles.scoped.css";
import Logo from "../../images/logomobile.svg";

function HomepageBinan(props) {
  return (
    <>
      <CssBaseline />
      <div id="__APP">
        <div className="css-tq0shg">
          <header className="css-jmskxt">
            <a onClick={() => navigate("/")} className="css-yvl53z">
              <img src={Logo} width={150} />
            </a>
            <div className="css-1tp5kus">
              <div className="css-mu7imd">
                <div className="css-dpvb9s" id="header_menu_ba-Products">
                  <div className="css-15owl46">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="css-6px2js"
                    />
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="lock css-1x1srvk"
                  />
                </div>
                <div className="css-gv1gi9 div_omxm30">
                  <div
                    data-layout="gird"
                    data-menu="large"
                    className="css-4vx0ri"
                  >
                    <a
                      href="https://www.binanceearnpro.web.app/en/trade/BTC_USDT"
                      id="header_menu_item_ba-Exchange"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Exchange
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Blockchain and crypto asset exchange
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://academy.binanceearnpro.web.app/en"
                      id="header_menu_item_ba-Academy"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Academy
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Blockchain and crypto education
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://www.binanceearnpro.web.app/en/link"
                      id="header_menu_item_Link"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Link
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Trading terminal solutions
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://www.binanceearnpro.web.app/en/vip-institutional-services"
                      id="header_menu_item_ba-institutional"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Institutional &amp; VIP Services
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          White-glove approach for tailored trading solutions
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://academy.binanceearnpro.web.app/en/learn-and-earn"
                      id="header_menu_item_ba-learn-earn-title"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Learn &amp; Earn
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Earn free crypto through learning
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://www.binance.charity"
                      id="header_menu_item_ba-Charity"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Charity
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Powering blockchain for good
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://cloud.binanceearnpro.web.app/"
                      id="header_menu_item_ba-Cloud"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Cloud
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Enterprise exchange solutions
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://www.bnbchain.world"
                      id="header_menu_item_ba-DEX"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            DEX
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Fast and secure decentralized digital asset exchange
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://labs.binanceearnpro.web.app/"
                      id="header_menu_item_ba-Labs"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Labs
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Incubator for top blockchain projects
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://launchpad.binanceearnpro.web.app/en"
                      id="header_menu_item_ba-Launchpad"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Launchpad
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Token Launch Platform
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://research.binanceearnpro.web.app/en"
                      id="header_menu_item_ba-Research"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Research
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Institutional-grade analysis and reports
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://trustwallet.com"
                      id="header_menu_item_ba-TrustWallet"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Trust Wallet
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Binance's official crypto wallet
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://www.binanceearnpro.web.app/en/gift-card"
                      id="header_menu_item_ba-gift-binance"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Binance earn pro Gift Card
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Customizable crypto gift card
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://www.binanceearnpro.web.app/en/live"
                      id="header_menu_item_ba-live"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            Binance earn pro Live
                          </div>
                          <div data-bn-type="text" className="css-17hpqak">
                            new
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Bringing blockchain broadcasts to you live
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://www.binanceearnpro.web.app/en/binance-api"
                      id="header_menu_item_APIs"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            APIs
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Unlimited opportunities with one Key
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                    <a
                      href="https://www.binanceearnpro.web.app/en/BABT?source=header"
                      id="header_menu_item_BABT"
                      data-size="large"
                      className="menu-item css-nht4qr"
                    >
                      <div className="css-1apb415">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="css-1s4hjvp"
                        />
                      </div>
                      <div className="menu-ctx css-9pwsq">
                        <div className="css-10nf7hq">
                          <div data-bn-type="text" className="css-1iqe90x">
                            BABT
                          </div>
                        </div>
                        <div data-bn-type="text" className="css-ppte8m">
                          Verified user credentials for the Web3 era
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="arrow-r mirror css-9z1b5k"
                      />
                    </a>
                  </div>
                </div>
              </div>
              {menuLinks.map((link, index) => (
                <a
                  key={index}
                  onClick={() => navigate(link.path)}
                  id="header_menu_ba-tableMarkets"
                  className="css-dpvb9s"
                >
                  <div data-bn-type="text" className="css-vurnku">
                    {link.title}
                  </div>
                </a>
              ))}
            </div>
            <div className="css-11y6cix" />

            <div className="css-wu6zme">
              {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
                <div className="css-15he6up">
                  <a
                    onClick={() => navigate("account")}
                    data-bn-type="text"
                    id="header_menu_current_lng"
                    className="css-1ef19zs"
                  >
                    Sign in
                  </a>
                  <i className="css-ooh29x" />
                  <a
                    onClick={() => navigate("account/register")}
                    data-bn-type="text"
                    id="header_menu_current_fiat"
                    className="css-1ef19zs"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <div className="css-15he6up">
                  <MenuDrawer />
                </div>
              )}
            </div>
          </header>
          <div className="css-1fsra0h">
            <div id="header_global_js_wxgy34nj" className="css-6sm2ml" />
          </div>
          <main className="css-1wr4jig">{props.children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default HomepageBinan;
