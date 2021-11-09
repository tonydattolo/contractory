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

  // const [
  //   getNonce,
  //   { 
  //     data: nonceData, 
  //     loading: nonceLoading, 
  //     error: nonceError,
  //     isError: nonceIsError,
  //     isLoading: nonceIsLoading,
  //     isSuccess: nonceIsSuccess
  //   }
  //  ] = useLazyGetNonceQuery()

  const handleLogin = async () => {
    // get nonce associated with currentAddress from backend
    try {
      // await getNonce(currentPublicAddress)

      // console.log(`nonceData: ${nonceData}`)
    } catch (error) {
      console.log(nonceErrorMessage)
    }
      
    // sign message with nonce

    // authenticate on backend, return user

  }
  // useEffect(() => {
  //   if (nonceIsSuccess && nonceData !== null && nonceData !== undefined) {
  //     console.log(`nonceData.nonce: ${nonceData.nonce}`)
  //     dispatch(setNonce(nonceData.nonce))
  //   }
  // }, [nonceIsSuccess])

  const handleLogout = async () => {
    // logout on backend
    // clear user from redux store
  }
  
  useEffect(() => {
    if (isAuthenticated && user !== null && user !== undefined) {
      console.log(`isAuthenticated: ${isAuthenticated}`)
      console.log(`user: ${user}`)
    } 
  }, [user])

  const guestLinks = (
    <>
      <div>
        <Button variant="outline-warning" className={styles.loginButton} onClick={handleLogin}>
          Connect to Site
        </Button>
      </div>
    </>
  )
  const authLinks = (
    <>
      <div>
        <Button variant="primary" className={styles.useProfileButton}>
          {/* {user.userdata.publicAddress} */}
          userInfo
        </Button>
        <Button variant="light" onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </Button>
      </div>
    </>
  )

  return (

    // <Nav className={`flex-column justify-content-end ${styles.nav}`}>
    <div className={styles.accountInfoGrouping}>
      <div>
        <small>site info:</small>    
        {isAuthenticated ? authLinks : guestLinks}
      </div>
      
      <div>
        <small>wallet info:</small>
        <ConnectButton />
      </div>      

    </div>
  )
}