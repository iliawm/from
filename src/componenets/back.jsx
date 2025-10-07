import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BotCont from "./BotCont";

// LocalStorage helper functions (more persistent than cookies)
const setStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

const getStorage = (name) => {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : "";
};

function Background() {
  const navigate = useNavigate();
  const [Title, settitle] = useState("Personal info");
  const [desc, setdesc] = useState(
    "Please provide your name, email address, and phone number. Personal info"
  );
  const [statement, setstate] = useState("this field is required");
  const [error, seterror] = useState();
  const [isname, setisname] = useState("");
  const [ismail, setisemail] = useState("");
  const [status, setstat] = useState([]);

  // Handle refresh detection and data restoration
  useEffect(() => {
    const hasName = localStorage.getItem("formName");
    const hasEmail = localStorage.getItem("formEmail");
    const pageLoadTime = sessionStorage.getItem("pageLoadTime");
    const now = Date.now();

    if (
      (hasName || hasEmail) &&
      (!pageLoadTime || now - parseInt(pageLoadTime) > 100)
    ) {
      // Page was refreshed (no timestamp or old timestamp), clear data
      localStorage.removeItem("formName");
      localStorage.removeItem("formEmail");
      localStorage.removeItem("formStatus");
      setisname("");
      setisemail("");
      setstat([]);
    } else if (pageLoadTime) {
      // Normal navigation (recent timestamp), restore data
      setisname(hasName ? JSON.parse(hasName) : "");
      setisemail(hasEmail ? JSON.parse(hasEmail) : "");
      setstat(
        localStorage.getItem("formStatus")
          ? JSON.parse(localStorage.getItem("formStatus"))
          : []
      );
    }

    sessionStorage.setItem("pageLoadTime", now.toString());
  }, []);

  useEffect(() => {
    // Warn before page refresh/close
    const handleBeforeUnload = (e) => {
      if (isname || ismail) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isname, ismail]);
  return (
    <>
    <div className="pageback">
      <div className="nav">
        <div className="nums">
          <div
            className="one"
            id="active"
            onClick={() => {
              document
                .querySelectorAll(".nums div")
                .forEach((div) => div.removeAttribute("id"));

              document.querySelector(".one").id = "active";
              sessionStorage.setItem("pageLoadTime", Date.now().toString());
              navigate("/");
            }}
          >
            1
          </div>
          <div
            className="two"
            onClick={() => {
              if (isname?.length >= 1 && ismail) {
                document
                  .querySelectorAll(".nums div")
                  .forEach((div) => div.removeAttribute("id"));

                document.querySelector(".two").id = "active";
                sessionStorage.setItem("pageLoadTime", Date.now().toString());
                navigate("/page2");
              } else {
                window.alert("fill in the blanks");
              }
            }}
          >
            2
          </div>
          <div
            className="three"
            onClick={() => {
              document
                .querySelectorAll(".nums div")
                .forEach((div) => div.removeAttribute("id"));

              document.querySelector(".three").id = "active";
            }}
          >
            3
          </div>
          <div
            className="four"
            onClick={() => {
              document
                .querySelectorAll(".nums div")
                .forEach((div) => div.removeAttribute("id"));

              document.querySelector(".four").id = "active";
            }}
          >
            4
          </div>
        </div>
      </div>

      <div className="Card">
        <div className="wrapA">
          <div className="title">{Title}</div>
        </div>
        <div className="desc">
          <p className="descp">{desc}</p>
        </div>
        <div className="Namecont">
          <h1 className="headName">
            <div className="elemOne">Name</div>
            <div className="elemtwo" id="Name">
              {statement}
              {error}
            </div>
          </h1>
          <input
            className="headinput"
            type="text"
            placeholder="e.g. Stephen King"
            value={isname || ""}
            onChange={(e) => {
              const Vname = e.target.value;
              const namebrder = document.querySelector(".headinput:focus");
              const namenorm = document.querySelector(".headinput");

              if (Vname.length >= 1) {
                namebrder.style.outline = "1px solid green";
                namenorm.style.border = "1px solid transparent";
                document.querySelector("#Name").style.display = "none";

                setisname(Vname);
                setStorage("formName", Vname);
              } else {
                namebrder.style.outline = "1px solid red";
                namenorm.style.border = "1px solid transparent";
                document.querySelector("#Name").style.display = "block";
                setisname(Vname);
                setStorage("formName", Vname);
              }
            }}
          />
        </div>
        <div className="Emailcont">
          <h1 className="headEmail">
            <div className="elemOne">Email Address</div>
            <div className="elemtwo" id="Email">
              {statement}
              {error}
            </div>
          </h1>
          <input
            className="emailinput"
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            value={ismail || ""}
            onChange={(e) => {
              const Vemail = e.target.value;
              setisemail(Vemail); // Add this line here
              const embrder = e.target;
              const postem = axios.get(
                `https://www.disify.com/api/email/${Vemail}`
              );
              postem.then((response) => {
                const isValid =
                  !response.data.disposable && response.data.format;

                if (isValid) {
                  embrder.style.outline = "1px solid green";
                  document.querySelector("#Email").style.display = "none";
                  setStorage("formEmail", Vemail);
                } else {
                  embrder.style.outline = "1px solid red";
                  document.querySelector("#Email").style.display = "block";
                  setStorage("formEmail", "");
                }
              });
            }}
          />
        </div>
        <div className="Phonecont">
          <h1 className="headPhone">
            <div className="elemOne">Phone Number</div>
            <div className="elemtwo" id="PhoneNumber">
              {statement}
              {error}
            </div>
          </h1>
          <input
            className="phoneinput"
            type="tel"
            placeholder="e.g. +1 234 567 890(optional)"
            onChange={() => {
              const Vname = e.target.value;
            }}
          />
        </div>
      </div>
      <BotCont
        onNext={() => {
          if (isname?.length >= 1 && ismail) {
            setstat([1]);
            setStorage("formStatus", [1]);
            sessionStorage.setItem("pageLoadTime", Date.now().toString());
            navigate("/page2");
          } else {
            setstat([]);
            setStorage("formStatus", []);
            window.alert("fill in the blanks");
          }
        }}
      />
      </div>
    </>
  );
}
export default Background;
