import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BotCont from "./BotCont";
import "../styles/Page3.css";
import "../styles/back.css";

function Page3() {
  const navigate = useNavigate();
  const [checked, setindexchecked] = useState(false);
  const [checkeds, setindexcheckeds] = useState(false);
  const [checkedth, setindexcheckedth] = useState(false);
  const location = useLocation();
  const [newprice, setnewprice]=useState()
  const price = location.state?.price || 0;
  const month = location.state?.month ?? true;
  const mOry = location.state?.mOry || "mo";
  const addtopriceService = month ? 1 : 10;
  const addtopriceStorage = month ? 2 : 20;
  const addtopriceCustom = month ? 2 : 20;
  useEffect(() => {
    // Restore persisted add-on selections (if any)
    const storedChecked = localStorage.getItem('checked');
    const storedCheckeds = localStorage.getItem('checkeds');
    const storedCheckedth = localStorage.getItem('checkedth');
    if (storedChecked !== null) setindexchecked(storedChecked === 'true');
    if (storedCheckeds !== null) setindexcheckeds(storedCheckeds === 'true');
    if (storedCheckedth !== null) setindexcheckedth(storedCheckedth === 'true');

    if (checked) {
      document.querySelector("#thirdone").style.border = "1px solid hsl(243, 100%, 62%)";
    } else {
      document.querySelector("#thirdone").style.border = "1px solid hsl(231, 11%, 63%)";
    }

    if (checkeds) {
      document.querySelector("#secondOP").style.border = "1px solid hsl(243, 100%, 62%)";
    } else {
      document.querySelector("#secondOP").style.border = "1px solid hsl(231, 11%, 63%)";
    }

    if (checkedth) {
      document.querySelector("#firstOp").style.border = "1px solid hsl(243, 100%, 62%)";
    } else {
      document.querySelector("#firstOp").style.border = "1px solid hsl(231, 11%, 63%)";
    }

    let total = price;
    if (checked) total += addtopriceCustom;
    if (checkeds) total += addtopriceService;
    if (checkedth) total += addtopriceStorage;
    
    setnewprice(total);
    console.log(total);
  }, [checked, checkeds, checkedth, price]);
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
          <div className="three" id="active">
            3
          </div>
          <div className="four">4</div>
        </div>
      </div>

      <div className="Card">
        <div className="wrapA">
          <div className="title">Pick add-ons</div>
        </div>
        <div className="desc">
          <p className="descp">Add-ons help enhance your gaming experience.</p>
        </div>
        <div className="plans">
          <div className="cont">
            <ul className="checkoption">
              <li className="itemcheck" id="secondOP">
                <input
                  type="checkbox"
                  name="addon1"
                  id="addon1"
                  className="checkinput"
                  checked={checkeds}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setindexcheckeds(val);
                    localStorage.setItem('checkeds', val.toString());
                  }}
                />

                <div className="restcont">
                  <div className="titleofcheck">online service</div>
                  <div className="decofcheck">Access to multiplayer games</div>
                </div>
                <div className="addtheprice">
                  +${addtopriceService}/{mOry}
                </div>
              </li>
              <li className="itemcheck" id="firstOp">
                <input
                  type="checkbox"
                  name="addon2"
                  id="addon2"
                  className="checkinput"
                  checked={checkedth}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setindexcheckedth(val);
                    localStorage.setItem('checkedth', val.toString());
                  }}
                />

                <div className="restcont">
                  <div className="titleofcheck">Larger Storage</div>
                  <div className="decofcheck">Extra 1TB of cloud save</div>
                </div>
                <div className="addtheprice">
                  +${addtopriceStorage}/{mOry}
                </div>
              </li>
              <li className="itemcheck" id="thirdone">
                <input
                  type="checkbox"
                  name="addon3"
                  id="addon3"
                  className="checkinput"
                  checked={checked}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setindexchecked(val);
                    localStorage.setItem('checked', val.toString());
                  }}
                />

                <div className="restcont">
                  <div className="titleofcheck">customizable profile</div>
                  <div className="decofcheck">
                    Change your profile picture and username
                  </div>
                </div>
                <div className="addtheprice">
                  +${addtopriceCustom}/{mOry}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <BotCont
        onNext={() => {
          sessionStorage.setItem("pageLoadTime", Date.now().toString());
          // also pass the add-on selections via navigation state
          navigate("/page4", { state: { 
            newprice: newprice,
            price: price,
            month: month,
            mOry: mOry,
            addons: {
              custom: checked,
              online: checkeds,
              storage: checkedth
            }
          }});
        }}
        buttonText="Next Step"
        onBack={() => (
          sessionStorage.setItem("pageLoadTime", Date.now().toString()),
          navigate("/page2")
        )}
        showBack={true}
      />
    </div>
  );
}

export default Page3;
