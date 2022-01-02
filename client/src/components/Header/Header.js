import React from "react";

import useMetamastWallet from "../../middleware/wallet/useMetamaskWallet";

export default function Header() {
  const [doConnectMetamaskAccount, setDoConnectMetamaskAccount] =
    React.useState(false);

  const metamaskInfo = useMetamastWallet(doConnectMetamaskAccount);
  const { hasMetamask, account, loading, error } = metamaskInfo;

  React.useEffect(() => {
    setDoConnectMetamaskAccount(false);
  }, [metamaskInfo]);

  if (!hasMetamask) {
    return null;
  }

  return (
    <header id="header">
      {!account ? (
        <button
          className="button small"
          onClick={() => setDoConnectMetamaskAccount(true)}
          disabled={loading}
        >
          Connect Wallet
        </button>
      ) : (
        <div className="connected-message">Connected to {account}</div>
      )}
    </header>
  );
}
