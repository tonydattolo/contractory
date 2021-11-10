import ConnectButton from "../ConnectButton/ConnectButton"
import { Nav, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/dist/client/link"
import styles from "./RightNav.module.scss"
import { useLazyGetNonceQuery } from "slices/authAPI"
import { useEffect } from "react"
import { setNonce } from "slices/authSlice"

export default function RightNav() {

  const dispatch = useDispatch()
  // const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const currentPublicAddress = useSelector(state => state.auth.currentAddress)
  const associatedENSname = useSelector(state => state.auth.ensName)


  return (

    // <Nav className={`flex-column justify-content-end ${styles.nav}`}>
    <div className={styles.accountInfoGrouping}>
      {/* <div>
        <small>site info:</small>
        <Button variant="outline-warning" className={styles.loginButton} onClick={handleLogin}>
          Connect to Site
        </Button>
      </div> */}
      
      <div>
        <small>selected MetaMask account info:</small>
        <ConnectButton />
      </div>      

    </div>
  )
}