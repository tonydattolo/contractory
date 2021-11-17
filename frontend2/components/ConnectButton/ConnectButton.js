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
import { useAddWalletMutation, useLazyGetNonceQuery, useConfirmSignatureMutation } from "slices/walletsAPI";

import { utils } from 'ethers'
import router from "next/router";

export default function ConnectButton() {

  const dispatch = useDispatch()

  const { activateBrowserWallet, deactivate, account, library } = useEthers();
  const etherBalance = useEtherBalance(account);
  const ens = useLookupAddress()
  // const nonce = useSelector(state => state.auth.nonce)
  const access_token = useSelector(state => state.auth.access)
  
  const [isSigned, setIsSigned] = useState(false)
  const [signature, setSignature] = useState("")
  const [nonce, setNonce] = useState("")

  const currentUser = useSelector(state => state.auth.user)

  const [
    addWallet, {
      loading: addWalletLoading,
      error: addWalletError,
      data: addWalletData,
      isError: isAddWalletError,
      isLoading: isAddWalletLoading,
      isSuccess: isAddWalletSuccess
    }
  ] = useAddWalletMutation()

  const [
    getNonce, {
      loading: getNonceLoading,
      error: getNonceError,
      data: getNonceData,
      isError: isGetNonceError,
      isLoading: isGetNonceLoading,
      isSuccess: isGetNonceSuccess
    }
  ] = useLazyGetNonceQuery()

  const [
    confirmSignature, {
      loading: confirmSignatureLoading,
      error: confirmSignatureError,
      data: confirmSignatureData,
      isError: isConfirmSignatureError,
      isLoading: isConfirmSignatureLoading,
      isSuccess: isConfirmSignatureSuccess
    }
  ] = useConfirmSignatureMutation()



  // const handleSignedMessage = async e => {
  async function handleSignedMessage() {

    const nonce = getNonceData.nonce.nonce

    const signer = library.getSigner()
    const userAddress = await signer.getAddress()
    console.log(`userAddress: ${userAddress}`)
    // setSignature( await signer.signMessage(message) )
    const signature = await signer.signMessage(nonce)
    alert(`signature: ${signature}`)
    const signerAddress = utils.verifyMessage(nonce, signature)
    console.log(`signing address: ${signerAddress}`)
    if (account === signerAddress) {
      console.log('account equals signerAddress')
      setIsSigned(true)
    } else {
      console.log(`account and signer not equal: \n
      account: ${account} \n
      signerAddress: ${signerAddress}`)
    }

    await confirmSignature({ account, nonce, signature, access_token })
    
  }
  
  const handleVerify = async () => {
    try {
      handleGetNonce()
      console.log(`getNonceData.nonce ${getNonceData.nonce.nonce}`)
      handleSignedMessage()

      // handleConfirmSignature()
    } catch (error) {
      console.log(error)
    }
    
  }
  
  const handleGetNonce = async () => {
    try {
      await getNonce({ account, access_token })
      console.log(`getNonceData: ${getNonceData}`)
    } catch (error) {
      console.log(error)
    }
  }
  const handleConfirmSignature = async () => {
    try {
      await confirmSignature({ account, message: nonce, returnedSignature: signature, access_token })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isConfirmSignatureSuccess && !isConfirmSignatureError) {
      console.log(`isConfirmSignatureSuccess: ${isConfirmSignatureSuccess}`)
      alert('Signature confirmed')
      router.push('dashboard', undefined, { shallow: true })
    }
  }, [isConfirmSignatureSuccess])

  // listener for isSigned
  useEffect(() => {
    if (isSigned && signature !== "") {
      console.log(`is signed: ${isSigned}`)
      // handleGetUser()
    }
  }, [isSigned])

  useEffect(() => {
    // check if account is loaded successfully
    if (account !== null && library !== undefined) {
      // set address in redux state
      console.log(`userAddress: ${account}`)
      // dispatch(setCurrentAddress( account ))
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

  const handleAddWallet = async () => {
    try {
      console.log(`account in handleAddWallet: ${account}`)
      // await addWallet({ 
      //   variables: {
      //     address: account,
      //     access_token: access_token
      //  }
      // })
      await addWallet({ account, access_token })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isAddWalletSuccess && !isAddWalletError) {
      router.push(`/dashboard/${currentUser.userdata.email}`, undefined, { shallow: true })
    }
  }, [isAddWalletSuccess])

  return (
    
    
    <div>
      { account ? (
          // container for ethereum balance and account listing
          <>
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
          <Button variant="outline-success" onClick={handleVerify}>Verify</Button>
          <Button variant="outline-warning" onClick={handleAddWallet}>Add Wallet to SCaaS</Button>
        </>
      ) : (
        <Button className="mx-3"variant="success" onClick={handleConnectWallet}>Connect Wallet</Button>
        ) 
      }
  </div>
  )
}
