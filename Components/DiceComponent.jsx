import React from "react";

const DiceComponent = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  return (
    <>
      <div className="die" style={styles} onClick={props.holdDice}>
        <p className="dice-text">{props.number}</p>
      </div>
    </>
  );
};
export default DiceComponent;
