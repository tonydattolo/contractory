import { Button } from "react-bootstrap";
import { useEthers, useEtherBalance, useLookupAddress, shortenAddress } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'
import Jazzicon from "@metamask/jazzicon";
// import Identicon from "./Identicon";
import styles from './ConnectButton.module.scss'
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop, faBan } from '@fortawesome/free-solid-svg-icons'

import { utils } from 'ethers'

export default function ConnectButton() {
  const { activateBrowserWallet, deactivate, account, library } = useEthers();
  const etherBalance = useEtherBalance(account);
  const ens = useLookupAddress()
  
  const handleSignedMessage = async e => {
    const message = "message to sign"
    const signer = library.getSigner()
    const userAddress = await signer.getAddress()
    const signature = await signer.signMessage(message)
    alert(`signature: ${signature}`)
    console.log(`signed message with signature: ${signature}`)
    const signerAddress = utils.verifyMessage(message, signature)
    console.log(`signing address: ${signerAddress}`)
    if (account === signerAddress) {
      console.log('account equals signerAddress')
    } else {
      console.log(`account and signer not equal: \n
                  account: ${account} \n
                  signerAddress: ${signerAddress}`)
    }
  }


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

  return (
    
    
    <div>
      <Button onClick={handleSignedMessage}>Sign Test</Button>
      { account ? (
        // container for ethereum balance and account listing
        <div className={styles.buttonContainer}>
          <div className={styles.ethBalance}>
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
          </div>
          <div className={styles.accountInfo}>

            {account && ens ? `${ens}` : account &&
              `${shortenAddress(account)}`}

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
      ) 
    }
  </div>
  )
}
