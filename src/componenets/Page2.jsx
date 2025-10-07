import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BotCont from "./BotCont";
import "../styles/page2.css";
import "../styles/back.css";

function Page2() {
  const navigate = useNavigate();
  const [price, setprice] = useState();
  const [indexactive, setindexactive] = useState(null);
  const [month, setmonth] = useState(true);
  const [mOry, setstat] = useState("mo");
  const arcade = month ? 9 : 90;
  const Advanced = month ? 12 : 120;
  const Pro = month ? 15 : 150;
  // Handle refresh detection and data restoration
  useEffect(() => {
    const hasData = localStorage.getItem('indexactive');
    const pageLoadTime = sessionStorage.getItem('pageLoadTime');
    const now = Date.now();
    
    if (hasData && (!pageLoadTime || now - parseInt(pageLoadTime) > 100)) {
      // Page was refreshed (no timestamp or old timestamp), clear data
      localStorage.removeItem('indexactive');
      setindexactive(null);
    } else if (hasData) {
      // Normal navigation (recent timestamp), restore data
      setindexactive(parseInt(hasData));
    }
    
    sessionStorage.setItem('pageLoadTime', now.toString());
    // Restore persisted month setting (don't clear on refresh)
    const storedMonth = localStorage.getItem('month');
    if (storedMonth !== null) {
      const isMonthly = storedMonth === 'true';
      setmonth(isMonthly);
      // sync the UI labels if they exist
      const monthlyEl = document.querySelector('.montlyset');
      const yearlyEl = document.querySelector('.yearlyset');
      if (monthlyEl && yearlyEl) {
        if (isMonthly) {
          monthlyEl.id = 'activemonth';
          yearlyEl.removeAttribute('id');
        } else {
          yearlyEl.id = 'activemonth';
          monthlyEl.removeAttribute('id');
        }
      }
    }
  }, []);

  useEffect(() => {
    indexactive == 0
      ? document.querySelector("#ones").classList.add("active")
      : document.querySelector("#ones").classList.remove("active");
    indexactive == 1
      ? document.querySelector("#twos").classList.add("active")
      : document.querySelector("#twos").classList.remove("active");
    indexactive == 2
      ? document.querySelector("#threes").classList.add("active")
      : document.querySelector("#threes").classList.remove("active");
    month ? setstat("mo") : setstat("yr");
    // persist month selection so it survives navigation
    localStorage.setItem('month', month);
    // ensure the label highlighting matches the selection
    const monthlyEl = document.querySelector('.montlyset');
    const yearlyEl = document.querySelector('.yearlyset');
    if (monthlyEl && yearlyEl) {
      if (month) {
        monthlyEl.id = 'activemonth';
        yearlyEl.removeAttribute('id');
      } else {
        yearlyEl.id = 'activemonth';
        monthlyEl.removeAttribute('id');
      }
    }
    if (indexactive != null) {
      if (indexactive == 0) {
        setprice(arcade);
      } else if (indexactive == 1) {
        setprice(Advanced);
      } else if (indexactive == 2) {
        setprice(Pro);
      }
      localStorage.setItem('indexactive', indexactive);
    }
  }, [indexactive, month]);
 
  return (
    <div className="pageback">
      <div className="nav">
        <div className="nums">
          <div
            className="one"
            onClick={() => {
              document
                .querySelectorAll(".nums div")
                .forEach((div) => div.removeAttribute("id"));
              document.querySelector(".one").id = "active";
              sessionStorage.setItem('pageLoadTime', Date.now().toString());
              navigate("/");
            }}
          >
            1
          </div>
          <div className="two" id="active">
            2
          </div>
          <div className="three">3</div>
          <div className="four">4</div>
        </div>
      </div>

      <div className="Card">
        <div className="wrapA">
          <div className="title">Select your plan</div>
        </div>
        <div className="desc">
          <p className="descp">
            You have the option of monthly or yearly billing.
          </p>
        </div>
        <div className="plan">
          <div
            className="stept"
            id="ones"
            onClick={() => {
              setindexactive(0);
            }}
          >
            <img src="icon-arcade.svg" alt="" className="image" />{" "}
            <div className="restcont">
              <div className="wrapper">
                <div className="toprest">Arcade</div>
                <div className="botrest">
                  ${arcade}/{mOry}
                </div>
                <div
                  className="ifmonth"
                  style={{ display: month ? "none" : "block" }}
                >
                  2 months free
                </div>
              </div>
            </div>
          </div>
          <div
            className="stept"
            id="twos"
            onClick={() => {
              setindexactive(1);
            }}
          >
            <img src="icon-advanced.svg" alt="" className="image" />{" "}
            <div className="restcont">
              <div className="wrapper">
                <div className="toprest">Advanced</div>
                <div className="botrest">
                  ${Advanced}/{mOry}
                </div>
                <div
                  className="ifmonth"
                  style={{ display: month ? "none" : "block" }}
                >
                  2 months free
                </div>
              </div>
            </div>
          </div>
          <div
            className="stept"
            id="threes"
            onClick={() => {
              setindexactive(2);
            }}
          >
            <img src="icon-pro.svg" alt="" className="image" />{" "}
            <div className="restcont">
              <div className="wrapper">
                <div className="toprest">Pro</div>
                <div className="botrest">
                  ${Pro}/{mOry}
                </div>

                <div
                  className="ifmonth"
                  style={{ display: month ? "none" : "block" }}
                >
                  2 months free
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btncont">
          <div className="montlyset" id = "activemonth">Monthly</div>
          <label className="switchsetstat">
            <input
              type="checkbox"
              checked={!month}
              onChange={(e) => {
                const checked = e.target.checked;
                // checked means yearly (month=false)
                setmonth(!checked);
                localStorage.setItem('month', (!checked).toString());
                const monthlyEl = document.querySelector('.montlyset');
                const yearlyEl = document.querySelector('.yearlyset');
                if (monthlyEl && yearlyEl) {
                  if (!checked) {
                    monthlyEl.id = 'activemonth';
                    yearlyEl.removeAttribute('id');
                  } else {
                    yearlyEl.id = 'activemonth';
                    monthlyEl.removeAttribute('id');
                  }
                }
              }}
            />
            <span className="slideswitch"></span>
          </label>
          <div className="yearlyset">Yearly</div>
        </div>
      </div>
      <BotCont
        onNext={() => {
          if (indexactive != null) {
            sessionStorage.setItem('pageLoadTime', Date.now().toString());
            navigate("/page3", { state: { price: price, month: month, mOry: mOry } });
          } else {
            window.alert("PLEASE CHOOSE AN OPTION");
          }
        }}
        buttonText="Next Step"
        onBack={() => {
          sessionStorage.setItem('pageLoadTime', Date.now().toString());
          navigate("/");
        }}
        showBack={true}
      />
    </div>
  );
}

export default Page2;
