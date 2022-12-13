import { Grid } from "@material-ui/core";
import { PersonAddRounded } from "@material-ui/icons";
import { navigate } from "@reach/router";
import React from "react";
import CalculateInvestment from "./calculateinvest";
import "./fonts/font.min.scoped.css";
import "./fonts/index.min.scoped.css";
import AccesscontrolIcon from "./image/julia/new-hompage/svg-icons/access-control.svg";
import BlogIcon from "./image/julia/new-hompage/svg-icons/blog.svg";
import CommunityIcon from "./image/julia/new-hompage/svg-icons/community.svg";
import CsIcon from "./image/julia/new-hompage/svg-icons/cs.svg";
import KycIcon from "./image/julia/new-hompage/svg-icons/kyc.svg";
import SecureassetIcon from "./image/julia/new-hompage/svg-icons/secure-asset.svg";
import SpotIcon from "./image/julia/new-hompage/svg-icons/spot.svg";
import UnlockIcon from "./image/julia/new-hompage/svg-icons/unlock.svg";
import UserIcon from "./image/julia/new-hompage/svg-icons/user.svg";
import HumanIcon from "./image/register/human-icon.svg";
import Investments from "./investments";
import CardSliders from "./slider";
import "./styles.scoped.css";
import TransactionTable from "./tables";

function Home() {
  return (
    <>
      <div className="css-1e4umbp">
        <div className="css-6sm2ml">
          <div className="css-1ig7ggv">
            <Grid container spacing={3}>
              <Grid className="intro-header" item xs={12} sm={6}>
                <div className="css-1lpyr85">
                  <h1 className="css-qmq7lv">
                    <div className="css-1obdq75">
                      Invest and earn from 300+ cryptocurrencies on Binance earn
                      pro
                    </div>
                  </h1>
                  <div className="css-j1fvrh">
                    <a
                      onClick={() => navigate("account/register")}
                      className="css-10nf7hq"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="css-kxtk92"
                      >
                        <path
                          d="M13.5 6.379V3h-3v3.379l-2.94-2.94-2.12 2.122L7.878 8H4v3h6.75V8h2.5v3H20V8h-3.879l2.44-2.44-2.122-2.12L13.5 6.378zM4 13.5V20h6.75v-6.5H4zM13.25 20H20v-6.5h-6.75V20z"
                          fill="currentColor"
                        />
                      </svg>
                      <div data-bn-type="text" className="css-1lonx59">
                        <div className="css-vurnku">
                          <div className="css-1obdq75">
                            Register to earn reward
                          </div>
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="css-199zucj"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.288 12l-3.89 3.89 1.768 1.767L15.823 12l-1.768-1.768-3.889-3.889-1.768 1.768 3.89 3.89z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <div className="css-byk2xc">
                      <div className="css-unyjhn">
                        <a
                          data-bn-type="button"
                          onClick={() => navigate("account")}
                          className="css-1ze0m0"
                        >
                          <img src={HumanIcon} className="css-1ddwk9a" />
                          <div data-bn-type="text" className="css-rjqmed">
                            Sign in
                          </div>
                        </a>
                        <div className="css-5nv61p">
                          <div className="css-19fuqbj" />
                          <div data-bn-type="text" className="css-16v162h">
                            already a member
                          </div>
                          <div className="css-19fuqbj" />
                        </div>
                        <div className="css-1n7u5cf">
                          <a
                            onClick={() => navigate("account/register")}
                            className="css-1pysja1"
                          >
                            <div className="css-cnwzzx">
                              <div className="css-qfts7w">
                                <PersonAddRounded />
                              </div>
                              <div className="css-ario60">Register</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid className="slide-tab" item xs={12} sm={6}>
                <CardSliders />
              </Grid>
            </Grid>
          </div>

          <div className="css-ezkr62">
            <div className="css-10htlqu">
              <div className="css-mvufc">
                <div data-bn-type="text" className="css-11nrmmq">
                  $76 billion
                </div>
                <div data-bn-type="text" className="css-14wkcvu">
                  24h trading volume on Binance earn pro exchange
                </div>
              </div>
            </div>
            <div className="css-10htlqu">
              <div className="css-mvufc">
                <div data-bn-type="text" className="css-11nrmmq">
                  350+
                </div>
                <div data-bn-type="text" className="css-14wkcvu">
                  Cryptocurrencies listed
                </div>
              </div>
            </div>
            <div className="css-10htlqu">
              <div className="css-mvufc">
                <div data-bn-type="text" className="css-11nrmmq">
                  120 million
                </div>
                <div data-bn-type="text" className="css-14wkcvu">
                  Registered users
                </div>
              </div>
            </div>
            <div className="css-10htlqu">
              <div className="css-mvufc">
                <div data-bn-type="text" className="css-11nrmmq">
                  &lt;0.10%
                </div>
                <div data-bn-type="text" className="css-14wkcvu">
                  Lowest transaction fees
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="css-e4rxck">
        <div className="css-6sm2ml">
          <div className="css-1leavdy">
            <div className="css-lzsise">
              <div data-bn-type="text" className="css-rlhgi">
                Current users transactions
              </div>
            </div>
          </div>

          <TransactionTable />

          <div className="css-vurnku">
            <div
              data-bn-type="text"
              style={{ marginTop: 40 }}
              className="css-xhdd21"
            >
              Sign up now to build your own portfolio for free!
            </div>
            <a
              data-bn-type="button"
              className="css-10hsupg"
              onClick={() => navigate("account/register")}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          marginBottom: 50,
        }}
      >
        <div className="css-1leavdy" data-v-329781c2="">
          <div className="css-lzsise" data-v-329781c2="">
            <div data-bn-type="text" className="css-rlhgi" data-v-329781c2="">
              Investment plans
            </div>
          </div>
        </div>
        <Investments />
      </div>

      <div
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          // marginBottom: 25,
        }}
      >
        <CalculateInvestment />
      </div>

      <div className="css-1u0smz3">
        <div className="css-6sm2ml">
          <div className="css-g7ybsr">
            <div className="css-zlr6nx">
              <img
                alt=""
                src={require("./image/julia/new-hompage/binance-earn.png")}
                className="mica-lazy-img css-nmpx7r"
              />
              <div className="css-1y58htc">
                <div data-bn-type="text" className="css-10idg9v">
                  Trade crypto with no stress
                </div>

                <div data-bn-type="text" className="css-1u4ulvl">
                  invest and earn from crypto exchange trading like a pro
                </div>

                <a
                  data-bn-type="button"
                  className="css-1mzui4g"
                  onClick={() => navigate("account/register")}
                >
                  Register and get bonus
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="css-1w4s86p">
        <div className="css-6sm2ml">
          <div className="css-u0o91h">
            <div className="css-1oko8w7">
              <div className="css-cahn1g">
                <div data-bn-type="text" className="css-rlhgi">
                  Build your crypto assets
                </div>
                <div data-bn-type="text" className="css-mc306l">
                  Start your invesatment with these easy steps.
                </div>
              </div>
              <div className="css-vurnku">
                <div className="css-1itzw64">
                  <div className="css-1rs1ks6">
                    <img
                      alt=""
                      src={KycIcon}
                      className="mica-lazy-img css-1epruf7"
                    />
                  </div>
                  <div className="css-1ozxht6">
                    <div data-bn-type="text" className="css-cdij5q">
                      Verify your identity
                    </div>
                    <div className="css-w90tn">
                      <div className="css-1obdq75">
                        Complete the identity verification process to secure
                        your account and transactions.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="css-1itzw64">
                  <div className="css-1rs1ks6">
                    <img
                      alt=""
                      src={UserIcon}
                      className="mica-lazy-img css-1epruf7"
                    />
                  </div>
                  <div className="css-1ozxht6">
                    <div data-bn-type="text" className="css-cdij5q">
                      Fund your account
                    </div>
                    <div className="css-w90tn">
                      <div className="css-1obdq75">
                        Add funds to your crypto account to start trading
                        crypto. You can add funds with a variety of payment
                        methods.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="css-1itzw64">
                  <div className="css-1rs1ks6">
                    <img
                      alt=""
                      src={SpotIcon}
                      className="mica-lazy-img css-1epruf7"
                    />
                  </div>
                  <div className="css-1ozxht6">
                    <div data-bn-type="text" className="css-cdij5q">
                      Invest and earn
                    </div>
                    <div className="css-w90tn">
                      <div className="css-1obdq75">
                        You're good to deposit, invest and withdraw your
                        investments, and discover what Binance earn pro has to
                        offer.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                data-bn-type="button"
                className="css-5bywlh"
                onClick={() => navigate("account/register")}
              >
                Get Started
              </a>
            </div>
            <div className="css-1uthklh">
              <img
                alt=""
                src={require("./image/julia/new-hompage/screen.png")}
                className="mica-lazy-img css-183xtba"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="css-1w4s86p">
        <div className="css-6sm2ml">
          <div className="css-1y4yp88">
            <div className="css-1m16b1t">
              <div data-bn-type="text" className="css-rlhgi">
                Your trusted crypto exchange
              </div>
              <div data-bn-type="text" className="css-mc306l">
                Here at Binance, we are committed to user protection with strict
                protocols and industry-leading technical measures.
              </div>
            </div>
            <a
              className="css-buqk49"
              href="https://www.binanceearnpro.web.app/en/event/user_protection"
            >
              <div data-bn-type="text" className="css-1c82c04">
                Learn more
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="css-1cizdsm"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.288 12l-3.89 3.89 1.768 1.767L15.823 12l-1.768-1.768-3.889-3.889-1.768 1.768 3.89 3.89z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
          <div className="css-u0o91h">
            <div className="css-1oko8w7">
              <div className="css-vurnku">
                <div className="css-1ssu05y">
                  <img
                    alt=""
                    src={SecureassetIcon}
                    className="mica-lazy-img css-jvfr7z"
                  />
                  <div className="css-nldshf">
                    <div data-bn-type="text" className="css-5ztzuu">
                      Secure Asset Fund for Users (SAFU)
                    </div>
                    <div className="css-w90tn">
                      <div className="css-1obdq75">
                        Binance earn pro stores 10% of all trading fees in a
                        secure asset fund to protect a share of user funds.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="css-1ssu05y">
                  <img
                    alt=""
                    src={AccesscontrolIcon}
                    className="mica-lazy-img css-jvfr7z"
                  />
                  <div className="css-nldshf">
                    <div data-bn-type="text" className="css-5ztzuu">
                      Personalised Access Control
                    </div>
                    <div className="css-w90tn">
                      <div className="css-1obdq75">
                        Personalized access control allows you to restrict
                        devices and addresses that can access your account, for
                        greater ease of mind.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="css-1ssu05y">
                  <img
                    alt=""
                    src={UnlockIcon}
                    className="mica-lazy-img css-jvfr7z"
                  />
                  <div className="css-nldshf">
                    <div data-bn-type="text" className="css-5ztzuu">
                      Advanced Data Encryption
                    </div>
                    <div className="css-w90tn">
                      <div className="css-1obdq75">
                        Your transaction data is secured via end-to-end
                        encryption, ensuring that only you have access to your
                        personal information.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="css-1bi7xa9">
              <img
                alt=""
                src={require("./image/julia/new-hompage/trusted-section.webp")}
                className="mica-lazy-img css-1lxqady"
              />
            </div>
          </div>
          <div className="css-4cffwv">
            <a
              data-bn-type="button"
              className="css-1vu4fga"
              onClick={() => navigate("account/register")}
            >
              Start Now
            </a>
          </div>
        </div>
      </div>
      <div className="css-1w4s86p">
        <div className="css-6sm2ml">
          <div className="css-rr25hw">
            <div data-bn-type="text" className="css-rlhgi">
              Need help?
            </div>
          </div>
          <div className="css-3gb8fv">
            <div
              id="horizontal_card_panel_exchange-home-new-46"
              className="css-yoi0l3"
            >
              <div className="css-u0o91h">
                <img alt="" src={CsIcon} className="mica-lazy-img css-z0xp9v" />
                <div className="css-gn00at">
                  <div className="css-1pysja1">
                    <div data-bn-type="text" className="css-695685">
                      24/7 Chat Support
                    </div>
                    <div className="css-1hbt1sb">
                      <div className="css-1obdq75">
                        Get 24/7 chat support with our friendly customer service
                        agents at your service.
                      </div>
                    </div>
                  </div>
                  <a
                    className="css-1fjmgpu"
                    onClick={() => navigate("account/register")}
                  >
                    <div data-bn-type="text" className="css-upf04h">
                      Chat now
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div
              id="horizontal_card_panel_exchange-home-new-49"
              className="css-yoi0l3"
            >
              <div className="css-u0o91h">
                <img
                  alt=""
                  src={CommunityIcon}
                  className="mica-lazy-img css-z0xp9v"
                />
                <div className="css-gn00at">
                  <div className="css-1pysja1">
                    <div data-bn-type="text" className="css-695685">
                      FAQs
                    </div>
                    <div className="css-1hbt1sb">
                      <div className="css-1obdq75">
                        View FAQs for detailed instructions on specific
                        features.
                      </div>
                    </div>
                  </div>
                  <a
                    className="css-1fjmgpu"
                    onClick={() => navigate("account/register")}
                  >
                    <div data-bn-type="text" className="css-upf04h">
                      Learn more
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div
              id="horizontal_card_panel_exchange-home-new-51"
              className="css-yoi0l3"
            >
              <div className="css-u0o91h">
                <img
                  alt=""
                  src={BlogIcon}
                  className="mica-lazy-img css-z0xp9v"
                />
                <div className="css-gn00at">
                  <div className="css-1pysja1">
                    <div data-bn-type="text" className="css-695685">
                      Blog
                    </div>
                    <div className="css-1hbt1sb">
                      <div className="css-1obdq75">
                        Stay up to date with the latest stories and commentary.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="css-s3hf92">
        <div className="css-6sm2ml">
          <div className="css-128y11d">
            <div data-bn-type="text" className="css-1ou3b17">
              Start earning today
            </div>
            <div className="css-1r4nzjd">
              <a
                data-bn-type="button"
                id="buttom_cta_trade_now"
                className="css-14p7txk"
                onClick={() => navigate("account/register")}
              >
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
