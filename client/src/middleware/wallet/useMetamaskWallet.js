import { useEffect, useReducer, useCallback } from "react";

const initState = {
  currentAccount: null,
  isConnected: false,
  isConnecting: false,
  hasMetamask: false,
  error: false,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_WALLET_COMPLETE": {
      return {
        ...state,
        currentAccount: action.account,
        isConnected: action.isConnected,
        isConnecting: false,
        hasMetamask: true,
        error: false,
        loading: false,
      };
    }
    case "ERROR_GETTING_WALLET": {
      return {
        ...state,
        currentAccount: null,
        isConnected: false,
        isConnecting: false,
        hasMetamask: false,
        error: "Unable to get your wallet. Please try again. ",
        loading: false,
      };
    }
    case "CONNECTING_WALLET": {
      return {
        ...state,
        currentAccount: null,
        isConnected: false,
        isConnecting: true,
        hasMetamask: true,
        error: false,
        loading: true,
      };
    }
    case "WALLET_CONNECTED": {
      return {
        ...state,
        currentAccount: action.account,
        isConnected: true,
        isConnecting: false,
        hasMetamask: true,
        error: false,
        loading: false,
      };
    }
    case "ERROR_CONNECTING_WALLET": {
      console.log("ERROR CONNECTING WALLET");
      return {
        ...state,
        currentAccount: null,
        isConnected: false,
        isConnecting: false,
        error: "Unable to connect to your wallet. Please try again. ",
        loading: false,
      };
    }
    case "METAMASK_NOT_FOUND": {
      return {
        ...state,
        currentAccount: null,
        isConnected: false,
        isConnecting: false,
        hasMetamask: false,
        error: false,
        loading: false,
      };
    }
    default:
      return { ...state };
  }
};

const useMetamastWallet = (doConnect = false) => {
  const [
    { currentAccount, isConnected, isConnecting, hasMetamask, error, loading },
    dispatch,
  ] = useReducer(reducer, initState);

  const checkHasMetamask = () => {
    // Metamask automatically injects an Ethereum object if it is connected
    const { ethereum } = window;

    return !!ethereum;
  };

  const checkWalletConnected = useCallback(async () => {
    try {
      const hasMetamask = checkHasMetamask();

      if (!hasMetamask) {
        return dispatch({
          type: "METAMASK_NOT_FOUND",
        });
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      const isConnected = accounts.length !== 0;
      const account = isConnected ? accounts[0] : null;

      dispatch({
        type: "GET_WALLET_COMPLETE",
        hasMetamask,
        isConnected,
        account,
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: "ERROR_GETTING_WALLET",
      });
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      dispatch({
        type: "CONNECTING_WALLET",
      });

      const hasMetamask = checkHasMetamask();

      if (!hasMetamask) {
        return dispatch({
          type: "METAMASK_NOT_FOUND",
        });
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);

      dispatch({
        type: "WALLET_CONNECTED",
        account: accounts[0],
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "ERROR_CONNECTING_WALLET",
      });
    }
  }, []);

  useEffect(() => {
    checkWalletConnected();
  }, [checkWalletConnected]);

  useEffect(() => {
    if (doConnect && !isConnecting) {
      connectWallet();
    }
  }, [doConnect, isConnecting, connectWallet]);

  return {
    ...initState,
    account: currentAccount,
    isConnected,
    hasMetamask,
    error,
    loading,
  };
};

export default useMetamastWallet;
