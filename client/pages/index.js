import React from "react";
import { ethers } from "ethers";
import * as dayjs from "dayjs";

import useMetamastWallet from "../src/middleware/wallet/useMetamaskWallet";

import abiJson from "../src/abi/WavePortal.json";
import Loading from "../src/components/Loading";
import FavoiteAnimalTable from "../src/components/FavoriteAnimalTable";

const contractAddress = "0x31032CB2cae5155182589d0B4833788f12d4046B";

const actions = {
  FETCHING_CURRENT_STATS: "FETCHING_CURRENT_DATA",
  FETCHING_CURRENT_STATS_COMPLETE: "FETCHING_CURRENT_STATS_COMPLETE",
  SUBMIT_STARTED: "SUBMIT_STARTED",
  SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
  SUBMIT_ERROR: "SUBMIT_ERROR",
  FAVORITE_ANIMAL_FIELD_UPDATED: "FAVORITE_ANIMAL_FIELD_UPDATED",
  FORM_ERROR: "FORM_ERROR",
  NEW_WAVE_RECEIVED: "NEW_WAVE_RECEIVED",
};

const initState = {
  numWaves: 0,
  favoriteAnimal: "",
  isMining: false,
  favoriteAnimalInputVal: "",
  allFavoriteAnimals: [],
  formError: false,
  submitError: false,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCHING_CURRENT_STATS:
      return { ...state, loading: true };
    case actions.FETCHING_CURRENT_STATS_COMPLETE:
      return {
        ...state,
        loading: false,
        numWaves: action.numWaves,
        favoriteAnimal: action.favoriteAnimal,
        allFavoriteAnimals: action.allFavoriteAnimals,
      };
    case actions.SUBMIT_STARTED:
      return { ...state, isMining: true, submitError: false, formError: false };
    case actions.SUBMIT_SUCCESS:
      return {
        ...state,
        isMining: false,
        numWaves: action.numWaves,
        favoriteAnimal: action.favoriteAnimal,
      };
    case actions.SUBMIT_ERROR:
      return { ...state, isMining: false, submitError: action.error };
    case actions.FORM_ERROR:
      return { ...state, submitError: false, formError: action.error };
    case actions.FAVORITE_ANIMAL_FIELD_UPDATED:
      return { ...state, favoriteAnimalInputVal: action.value };
    case actions.NEW_WAVE_RECEIVED:
      return {
        ...state,
        allFavoriteAnimals: [
          ...state.allFavoriteAnimals,
          action.newFavoriteAnimal,
        ],
      };
    default:
      return { ...state };
  }
};

export default function App() {
  const contractABI = abiJson.abi;

  const [
    {
      loading,
      numWaves,
      favoriteAnimal,
      allFavoriteAnimals,
      isMining,
      favoriteAnimalInputVal,
      formError,
      submitError,
    },
    dispatch,
  ] = React.useReducer(reducer, initState);

  const [doConnectMetamaskAccount, setDoConnectMetamaskAccount] =
    React.useState(false);

  const metamaskInfo = useMetamastWallet(doConnectMetamaskAccount);
  const {
    account,
    error: metamaskError,
    hasMetamask,
    loading: metamaskLoading,
  } = metamaskInfo;

  const connectToContact = React.useCallback(
    (ethereum) => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      return wavePortalContract;
    },
    [contractABI]
  );

  React.useEffect(() => {
    setDoConnectMetamaskAccount(false);
  }, [metamaskInfo]);

  const getCurrentStats = React.useCallback(async () => {
    try {
      if (hasMetamask && account) {
        dispatch({ type: actions.FETCHING_CURRENT_STATS });

        const { ethereum } = window;

        const wavePortalContract = connectToContact(ethereum);

        const count = await wavePortalContract.getTotalWaves();

        const favoriteAnimal = await wavePortalContract.getFavoriteAnimal();

        const allFavoriteAnimalsResp =
          await wavePortalContract.getAllFavoriteAnimals();

        const allFavoriteAnimals = allFavoriteAnimalsResp.map(
          (animalEntry) => ({
            sender: animalEntry.sender,
            animal: animalEntry.animal,
            timestamp: dayjs(animalEntry.timestamp * 1000).format(
              "MMMM D, YYYY h:mm A"
            ),
          })
        );

        dispatch({
          type: actions.FETCHING_CURRENT_STATS_COMPLETE,
          favoriteAnimal,
          numWaves: count.toNumber(),
          allFavoriteAnimals,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [hasMetamask, account, connectToContact]);

  React.useEffect(() => {
    getCurrentStats();
  }, [getCurrentStats]);

  const submitFavoriteAnimal = React.useCallback(async () => {
    if (favoriteAnimalInputVal === "") {
      return dispatch({
        type: actions.FORM_ERROR,
        error: "Hey! Don't forget to enter your favorite animal! ",
      });
    }

    try {
      if (hasMetamask) {
        dispatch({ type: actions.SUBMIT_STARTED });

        const { ethereum } = window;

        const wavePortalContract = connectToContact(ethereum);

        // Get total waves from contract
        let count = await wavePortalContract.getTotalWaves();

        // Add a wave
        const waveTxn = await wavePortalContract.wave(favoriteAnimalInputVal, {
          gasLimit: 300000,
        });
        console.log("Mining... ", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();

        const newFavoriteAnimal = await wavePortalContract.getFavoriteAnimal();

        dispatch({
          type: actions.SUBMIT_SUCCESS,
          numWaves: count.toNumber(),
          favoriteAnimal: newFavoriteAnimal,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.FORM_ERROR,
        error: "Error sending transaction through Metamask. Sorry :( ",
      });
    }
  }, [hasMetamask, favoriteAnimalInputVal, connectToContact]);

  React.useEffect(() => {
    let wavePortalContract;

    const onNewAnimalSubmission = (from, timestamp, animal) => {
      console.log("New animal submission: ", from, timestamp, animal);
      dispatch({
        type: actions.NEW_WAVE_RECEIVED,
        newFavoriteAnimal: {
          sender: from,
          animal,
          timestamp: dayjs(timestamp * 1000).format("MMMM D, YYYY h:mm A"),
        },
      });
    };

    if (hasMetamask) {
      const { ethereum } = window;

      wavePortalContract = connectToContact(ethereum);
      wavePortalContract.on("NewFavoriteAnimal", onNewAnimalSubmission);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewFavoriteAnimal", onNewAnimalSubmission);
      }
    };
  }, [hasMetamask, connectToContact]);

  if (!hasMetamask) {
    return (
      <div className="dataContainer card">
        <div className="header">😱 Metamask not found </div>

        <p>
          For this application to work you need to have the Metamask browser
          extension installed
        </p>

        <p>
          You can download Metamask from their{" "}
          <a href="https://metamask.io/">official website</a>
        </p>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="dataContainer card">
        <div className="header">👋 Hey there!</div>

        <p>Connect your Ethereum wallet tell me about your favorite animal!</p>

        <p>
          This simple app allows you to connect your MetaMask wallet and enter
          your favorite animal. It will then be saved to the blockchain!
        </p>
        <h3>Getting started</h3>
        <p>
          The first step is to connect your Metamask wallet. Click the button
          below to get started!
        </p>
        {metamaskLoading ? (
          <>
            <Loading />
            <p>Connecting Metamask account...</p>
          </>
        ) : (
          <button
            className="button"
            onClick={() => setDoConnectMetamaskAccount(true)}
          >
            Connect wallet!
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="dataContainer card">
        <>
          <div className="header">Your Metamask wallet is connected!</div>

          {loading ? (
            <>
              <Loading />
              <p>Fetching data from the blockchain...</p>
            </>
          ) : (
            <>
              <p>
                Currently {numWaves} people have submitted their favorite animal
              </p>

              {favoriteAnimal !== "" ? (
                <p>Your favorite animal seems to be the {favoriteAnimal}</p>
              ) : (
                <p>
                  You don&apos;t seem to have mentionned your favorite animal
                  yet. Go ahead and tell me what your favorite animal is!
                </p>
              )}

              <input
                type="text"
                value={favoriteAnimalInputVal}
                onChange={(e) =>
                  dispatch({
                    type: actions.FAVORITE_ANIMAL_FIELD_UPDATED,
                    value: e.target.value,
                  })
                }
                placeholder={`Enter the name of your ${
                  favoriteAnimal ? "new " : ""
                }favorite animal`}
              />

              {formError && <span className="error">{formError}</span>}

              <button
                className="button"
                onClick={() => {
                  !isMining && submitFavoriteAnimal();
                }}
                disabled={isMining}
              >
                Submit your favorite animal!
              </button>

              {isMining && (
                <>
                  <Loading />
                  <p>
                    Currently mining your transaction on the Ethereum
                    blockchain...
                  </p>
                </>
              )}

              {submitError && <span className="error">{submitError}</span>}
            </>
          )}
        </>

        {metamaskError && <span className="error">{metamaskError}</span>}
      </div>

      {allFavoriteAnimals.length > 0 && (
        <div id="tableContainer" className="dataContainer card">
          <FavoiteAnimalTable data={allFavoriteAnimals} />
        </div>
      )}
    </>
  );
}
