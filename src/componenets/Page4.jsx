import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BotCont from "./BotCont";
import "../styles/Page4.css";
import "../styles/back.css";

function Page4() {
  const navigate = useNavigate();
  const location = useLocation();
  const newprice = location.state?.newprice || 0;
  const price = location.state?.price || 0;
  const month = location.state?.month ?? true;
  const mOry = location.state?.mOry || "mo";
  const arcade = month ? 9 : 90;
  const Advanced = month ? 12 : 120;
  const Pro = month ? 15 : 150;
  const indexactive = localStorage.getItem("indexactive")
    ? parseInt(localStorage.getItem("indexactive"))
    : null;
  // read addons from navigation state first, otherwise fallback to localStorage
  const navAddons = location.state?.addons;
  const storedAddons = {
    custom: localStorage.getItem('checked') === 'true',
    online: localStorage.getItem('checkeds') === 'true',
    storage: localStorage.getItem('checkedth') === 'true'
  };
  const addons = navAddons ?? storedAddons;
  // addon prices
  const addonPriceService = month ? 1 : 10; // online service
  const addonPriceStorage = month ? 2 : 20; // larger storage
  const addonPriceCustom = month ? 2 : 20; // customizable profile
  useEffect(()=>{

  },[month])
  // determine total price: prefer newprice passed via navigation, otherwise compute
  const navNewprice = typeof location.state?.newprice === 'number' ? location.state.newprice : null;
  const computedNewprice = price
    + (addons.online ? addonPriceService : 0)
    + (addons.storage ? addonPriceStorage : 0)
    + (addons.custom ? addonPriceCustom : 0);
  const finalPrice = navNewprice ?? computedNewprice;
  return (
    <div className="pageback">
      <div className="nav">
        <div className="nums">
          <div
            className="one"
            onClick={() => (
              sessionStorage.setItem("pageLoadTime", Date.now().toString()),
              navigate("/")
            )}
          >
            1
          </div>
          <div
            className="two"
            onClick={() => (
              sessionStorage.setItem("pageLoadTime", Date.now().toString()),
              navigate("/page2")
            )}
          >
            2
          </div>
          <div
            className="three"
            onClick={() => (
              sessionStorage.setItem("pageLoadTime", Date.now().toString()),
              navigate("/page3")
            )}
          >
            3
          </div>
          <div className="four" id="active">
            4
          </div>
        </div>
      </div>

      <div className="Card">
        <div className="wrapA">
          <div className="title">Finishing up</div>
        </div>
        <div className="desc">
          <p className="descp">
            Double-check everything looks OK before confirming.
          </p>
        </div>
        <div className="plan">
          <div className="mainplan">
            <div className="waparound">{indexactive === 0 && (
              <div>
                Arcade ({ month ? "Monthly" : "Yearly" })
              </div>
            )}
            {indexactive === 1 && (
              <div>
                Advanced ({ month ? "Monthly" : "Yearly" })
              </div>
            )}
            {indexactive === 2 && (
              <div>
                Pro ({ month ? "Monthly" : "Yearly" })
              </div>
            )}
            <Link to={"/page2"}  className="linked" >change</Link>
            </div>
            <div className="pricemain">
                          {indexactive === 0 && (
              <div>
                 ${arcade}/{mOry}
              </div>
            )}
            {indexactive === 1 && (
              <div>
                ${Advanced}/{mOry}
              </div>
            )}
            {indexactive === 2 && (
              <div>
                ${Pro}/{mOry}
              </div>
            )}
            </div>
          </div>
          <div className="alterplans">
            {addons.online && (
              <div className="addonLine">
                <div className="addontitled">Online service</div>
                <div className="addonprice">+${addonPriceService}/{mOry}</div>
              </div>
            )}
            {addons.storage && (
              <div className="addonLine">
                <div className="addontitled">Larger Storage</div>
                <div className="addonprice">+${addonPriceStorage}/{mOry}</div>
              </div>
            )}
            {addons.custom && (
              <div className="addonLine">
                <div className="addontitled">Customizable profile</div>
                <div className="addonprice">+${addonPriceCustom}/{mOry}</div>
              </div>
            )}
          </div>
        </div>
        <div className="totalofall">
          <div className="totaltitle">
            total ({ month ? "Monthly" : "Yearly" })
          </div>
          <div className="totalprice">
              ${finalPrice}/{mOry}
          </div>
        </div>
      </div>
      <BotCont
        onNext={() => window.alert("not in the mood to code and i dont have an api to send info to server")}
        buttonText="Confirm"
        onBack={() => (
          sessionStorage.setItem("pageLoadTime", Date.now().toString()),
          navigate("/page3")
        )}
        showBack={true}
      />
    </div>
  );
}

export default Page4;
