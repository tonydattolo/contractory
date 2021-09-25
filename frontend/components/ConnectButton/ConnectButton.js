import { Button } from "react-bootstrap";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'
import Jazzicon from "@metamask/jazzicon";
// import Identicon from "./Identicon";
import styles from './ConnectButton.module.scss'
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop, faBan } from '@fortawesome/free-solid-svg-icons'


export default function ConnectButton() {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  const acctIconRef = useRef()

  useEffect(() => {
    if (account && acctIconRef.current) {
      acctIconRef.current.innerHTML = "";
      acctIconRef.current.append(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account])

  return account ? (
    // container for ethereum balance and account listing
    <div className={styles.buttonContainer}>
      <div className={styles.ethBalance}>
        {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
      </div>
      <div className={styles.accountInfo}>
        {account &&
          `${account.slice(0, 6)}...${account.slice(
            account.length - 4,
            account.length
          )}`}
          {/* <Identicon /> */}
          <div ref={acctIconRef} className={styles.accountIconStyle}>
          </div>
      </div>
      <Button variant="link" className={styles.disconnectButton}>
        <FontAwesomeIcon className={styles.disconnectIcon} icon={faBan} onClick={deactivate} />
      </Button>
    </div>
  ) : (
    <Button onClick={handleConnectWallet}>Connect Wallet</Button>
  );
}
