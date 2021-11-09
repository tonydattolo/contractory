import { Button } from "react-bootstrap";
import { useEthers, useEtherBalance, useLookupAddress, shortenAddress } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'
import Jazzicon from "@metamask/jazzicon";
// import Identicon from "./Identicon";
import styles from './ConnectButton.module.scss'
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop, faBan } from '@fortawesome/free-solid-svg-icons'
import { setCurrentAddress, setENSname, setUser } from "slices/walletsSlice"
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetUserQuery } from "slices/authAPI";

import { utils } from 'ethers'

export default function ConnectButton() {

  const dispatch = useDispatch()

  const { activateBrowserWallet, deactivate, account, library } = useEthers();
  const etherBalance = useEtherBalance(account);
  const ens = useLookupAddress()
  const nonce = useSelector(state => state.auth.nonce)
  
  const [isSigned, setIsSigned] = useState(false)
  const [signature, setSignature] = useState("")

  // const [
  //   getUser, {
  //     data: userData,
  //     loading: userLoading,
  //     error: userError
  //   }
  // ] = useLazyGetUserQuery()

  // const handleSignedMessage = async e => {
  async function handleSignedMessage() {

    const message = nonce
    const signer = library.getSigner()
    const userAddress = await signer.getAddress()
    console.log(`userAddress: ${userAddress}`)
    // setSignature( await signer.signMessage(message) )
    const returnedSignature = await signer.signMessage(message)
    console.log(`returnedSignature: ${returnedSignature}`)
    setSignature(returnedSignature)
    alert(`returnedSignature: ${returnedSignature}`)
    console.log(`signed message with signature: ${returnedSignature}`)
    const signerAddress = utils.verifyMessage(message, returnedSignature)
    console.log(`signing address: ${signerAddress}`)
    if (account === signerAddress) {
      console.log('account equals signerAddress')
      setIsSigned(true)
    } else {
      console.log(`account and signer not equal: \n
      account: ${account} \n
      signerAddress: ${signerAddress}`)
    }
    
  }
  
  const handleGetUser = async () => {
    try {
      await getUser({ account, nonce, signature })
    } catch (error) {
      console.log(`${error}`)
      console.log(`${userError}`)
    }
  }

  // listener for isSigned
  useEffect(() => {
    if (isSigned && signature !== "") {
      console.log(`is signed: ${isSigned}`)
      handleGetUser()
    }
  }, [isSigned])

  // listener for user data returned from server
  // useEffect(() => {
  //   if (userData) {
  //     console.log(`userData: ${userData}`)
  //     console.log(`userData.publicAddress: ${userData.publicAddress}`)

  //     dispatch(setUser(userData))
  //     // dispatch(setENSname(userData.name))
  //   }
  // }, [userData])

  // listener for account
  useEffect(() => {
    // check if account is loaded successfully
    if (account !== null && library !== undefined) {
      // set address in redux state
      // const { userAddress } = await library.getSigner().getAddress().then(result => result.data)
      console.log(`userAddress: ${account}`)
      dispatch(setCurrentAddress( account ))

      // grab nonce from backend for publicAddress

      // handle signing message on frontend
      // handleSignedMessage()

      // post signed message to backend to authenticate

      // handle returning 
    }
  }, [account])

  // listener for ENS name
  useEffect(() => {
    console.log(`ens: ${ens}`)
    if (ens !== undefined && ens !== null) {
      dispatch(setENSname(ens))
    }
  }, [ens])
  
  function handleConnectWallet() {
    activateBrowserWallet()
  }

  const handleDeactivate = () => {
    deactivate()
    dispatch(setCurrentAddress(null))
    dispatch(setENSname(null))
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
      <Button variant="outline-success" onClick={handleSignedMessage}>Sign Test</Button>
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
            <FontAwesomeIcon className={styles.disconnectIcon} icon={faBan} onClick={handleDeactivate} />
          </Button>
        </div>
      ) : (
        <Button className="mx-3"variant="success" onClick={handleConnectWallet}>Connect Wallet</Button>
      ) 
    }
  </div>
  )
}
