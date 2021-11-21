import React from "react";
import Head from "next/head";
import { ethers } from "ethers";

import useMetamastWallet from "../src/middleware/wallet/useMetamaskWallet";

import abiJson from "../src/abi/WavePortal.json";

const contractAddress = "0x77Dd8048b76f4671e12BF1099F4264eD7Daca8e0";

export default function App() {
  const contractABI = abiJson.abi;

  const [doConnectMetamaskAccount, setDoConnectMetamaskAccount] =
    React.useState(false);

  const metamaskInfo = useMetamastWallet(doConnectMetamaskAccount);
  const {
    account,
    error: metamaskError,
    hasMetamask,
    isConnected,
    loading: metamaskLoading,
  } = metamaskInfo;

  React.useEffect(() => {
    setDoConnectMetamaskAccount(false);
  }, [metamaskInfo]);

  /* if (!hasMetamask) {
    console.log("Make sure your Metamask account is connected!");
  } else {
    console.log("You have metamask! Ethereum info: ", ethereum);
  }

  if (isConnected) {
    console.log("Found authorizd account: ", account);
  } else {
    console.log("No authorized account found :(");
  } */

  const wave = React.useCallback(async () => {
    try {
      if (hasMetamask) {
        const { ethereum } = window;

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const count = await wavePortalContract.getTotalWaves();
        console.log("Total wave count is: ", count.toNumber());
      }
    } catch (error) {
      console.error(error);
    }
  }, [hasMetamask, contractABI]);

  return (
    <>
      <Head>
        <title>What is your favorite animal on the blockchain? </title>
      </Head>
      <div className="mainContainer">
        <div className="dataContainer card">
          {!account ? (
            <>
              <div className="header">👋 Hey there!</div>

              <p>
                Connect your Ethereum wallet tell me about your favorite animal!
              </p>

              <p>
                This simple app allows you to connect your MetaMask wallet and
                enter your favorite animal. It will then be saved to the
                blockchain!
              </p>
              <h3>Getting started</h3>
              <p>
                The first step is to connect your Metamask wallet. Click the
                button below to get started!
              </p>
              <button
                className="button"
                onClick={() => setDoConnectMetamaskAccount(true)}
              >
                Connect wallet!
              </button>
            </>
          ) : (
            <>
              <div className="header">Your Metamask wallet is connected!</div>

              <p>Go ahead and tell me about your favorite animal! </p>

              <button className="button" onClick={wave}>
                What is your favorite animal? (Wave)
              </button>
            </>
          )}

          {metamaskError && <span className="error">{metamaskError}</span>}
        </div>
      </div>
    </>
  );
}
