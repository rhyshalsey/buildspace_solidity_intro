import * as React from "react";
import { ethers } from "ethers";

export default function App() {
  const wave = () => {};

  return (
    <div className="mainContainer">
      <div className="dataContainer card">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          Connect your Ethereum wallet tell me about your favorite animal!
        </div>

        <button className="waveButton" onClick={wave}>
          What is your favorite animal?
        </button>
      </div>
    </div>
  );
}
