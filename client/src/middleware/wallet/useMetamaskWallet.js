import { useEffect, useReducer, useCallback } from "react";

const initState = {
  currentAccount: null,
  isConnecting: false,
  hasMetamask: false,
  error: false,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "WALLET_CONNECTED": {
      return {
        ...state,
        currentAccount: action.account,
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
        isConnecting: false,
        hasMetamask: true,
        error: "Unable to get your wallet. Please try again. ",
        loading: false,
      };
    }
    case "CONNECTING_WALLET":
    case "CONNECTING_ACCOUNT": {
      return {
        ...state,
        currentAccount: null,
        isConnecting: true,
        hasMetamask: true,
        error: false,
        loading: true,
      };
    }
    case "ACCOUNT_CONNECTED": {
      return {
        ...state,
        currentAccount: action.account,
        isConnecting: false,
        hasMetamask: true,
        error: false,
        loading: false,
      };
    }
    case "ERROR_CONNECTING_WALLET":
    case "ERROR_CONNECTING_ACCOUNT": {
      return {
        ...state,
        currentAccount: null,
        isConnecting: false,
        error: "Unable to connect to your wallet. Please try again. ",
        loading: false,
      };
    }
    case "ACCOUNT_DISCONNECTED": {
      return {
        ...state,
        currentAccount: null,
        isConnecting: false,
        error: false,
        loading: false,
      };
    }
    case "ACCOUNT_UPDATED": {
      return {
        ...state,
        currentAccount: action.account,
        isConnecting: false,
        hasMetamask: true,
        error: false,
        loading: false,
      };
    }
    case "METAMASK_ACCOUNT_NOT CONNECTED": {
      return {
        ...state,
        currentAccount: null,
        isConnecting: false,
        error: false,
        loading: false,
      };
    }
    case "METAMASK_NOT_FOUND": {
      return {
        ...state,
        currentAccount: null,
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

/**
 *
 * @param {boolean} doConnect Set to true to begin wallet connection. Usually triggered by a button click
 * @returns {object} metamaskWallet Metamask connection status and information
 * @returns {string} metamaskWallet.account The user's currently selected Metamask account
 * @returns {boolean} metamaskWallet.hasMetamask Whether metamask is installed
 * @returns {string} metamaskWallet.error Error message if an error is present. Is false if there is no error
 * @returns {boolean} metamaskWallet.loading When an operation is currently underway to connect to Metamask
 *
 */
const useMetamastWallet = (doConnect = false) => {
  const [
    { currentAccount, isConnecting, hasMetamask, error, loading },
    dispatch,
  ] = useReducer(reducer, initState);

  const checkHasMetamask = () => {
    // Metamask automatically injects an Ethereum object if it is connected
    const { ethereum } = window;

    return !!ethereum;
  };

  /**
   * Checks if the user's Metamask has been connected previously and will reconnect to account if it has been
   */
  const checkWalletConnected = useCallback(async () => {
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

      // Get the previously connected accounts from Metamask
      const accounts = await ethereum.request({ method: "eth_accounts" });

      const hasConnectedAccount = accounts.length !== 0;

      if (!hasConnectedAccount) {
        return dispatch({
          type: "METAMASK_ACCOUNT_NOT CONNECTED",
        });
      }

      const account = hasConnectedAccount ? accounts[0] : null;

      dispatch({
        type: "WALLET_CONNECTED",
        hasMetamask,
        account,
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: "ERROR_GETTING_WALLET",
      });
    }
  }, []);

  /**
   * Opens the Metamask prompt to the user to connect their account
   */
  const connectWallet = useCallback(async () => {
    try {
      dispatch({
        type: "CONNECTING_ACCOUNT",
      });

      const hasMetamask = checkHasMetamask();

      if (!hasMetamask) {
        return dispatch({
          type: "METAMASK_NOT_FOUND",
        });
      }

      // Open Metamask prompt for user to select account to connect
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      dispatch({
        type: "ACCOUNT_CONNECTED",
        account: accounts[0],
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "ERROR_CONNECTING_ACCOUNT",
      });
    }
  }, []);

  const onMetamaskAccountsChanged = useCallback(
    (accounts) => {
      if (accounts.length <= 0) {
        dispatch({
          type: "ACCOUNT_DISCONNECTED",
        });
      }

      if (accounts[0] !== currentAccount) {
        dispatch({
          type: "ACCOUNT_UPDATED",
          account: accounts[0],
        });
      }
    },
    [currentAccount]
  );

  useEffect(() => {
    checkWalletConnected();
  }, [checkWalletConnected]);

  useEffect(() => {
    if (doConnect && !isConnecting) {
      connectWallet();
    }
  }, [doConnect, isConnecting, connectWallet]);

  useEffect(() => {
    if (checkHasMetamask()) {
      ethereum.on("accountsChanged", onMetamaskAccountsChanged);
    }

    return () => {
      if (checkHasMetamask()) {
        ethereum.removeListener("accountsChanged", onMetamaskAccountsChanged);
      }
    };
  }, [onMetamaskAccountsChanged]);

  return {
    account: currentAccount,
    hasMetamask,
    error,
    loading,
  };
};

export default useMetamastWallet;
