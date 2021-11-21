import * as React from "react";
import Head from "next/head";
import { ethers } from "ethers";

export default function App() {
  const wave = () => {};

  return (
    <>
      <Head>
        <title>What is your favorite animal on the blockchain? </title>
      </Head>
      <div className="mainContainer">
        <div className="dataContainer card">
          <div className="header">👋 Hey there!</div>

          <div className="bio">
            Connect your Ethereum wallet tell me about your favorite animal!
          </div>

          <div className="bio">
            This simple app allows you to connect your MetaMask wallet and enter
            your favorite animal. It will then be saved to the blockchain!
          </div>

          <button className="waveButton" onClick={wave}>
            What is your favorite animal?
          </button>
        </div>
      </div>
    </>
  );
}
