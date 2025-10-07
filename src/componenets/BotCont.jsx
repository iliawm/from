import { useEffect } from "react";

function BotCont({ onNext, buttonText = "Next Step", onBack, showBack = false }) {
  useEffect(()=>{
    
  },[])
  return (
    <div className="botcont">
      <button className="buttonback" onClick={onBack} style={{visibility: showBack ? "visible" : "hidden"}}>Go Back</button>
      <button className="buttonmob" onClick={onNext}>
        {buttonText}
      </button>
    </div>
  );
}

export default BotCont;