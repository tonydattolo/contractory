import ConnectButton from "../ConnectButton/ConnectButton"
import { Nav, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/dist/client/link"
import styles from "./RightNav.module.scss"
import { useSignupMutation } from "slices/authAPI"

export default function RightNav() {

  // const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const currentPublicAddress = useSelector(state => state.auth.currentAddress)
  const associatedENSname = useSelector(state => state.auth.ensName)
  const [
    signup, {
      isSuccess: signupSuccess,
      isLoading: signupLoading,
      isError: signupError,
      error: signupErrorMessage,
      data: signupResponseData
    }
   ] = useSignupMutation()

  const handleSignup = async () => {
    try {
      // send signup info to backend
      const signupAttempt = await signup({ currentPublicAddress })
      console.log(`signupAttempt: ${signupAttempt}`)
      if (signupSuccess) {
        console.log(`signupResponseData: ${signupResponseData.success}`)
      }
    } catch (error) {
      console.log(signupErrorMessage)
    }

    // handle is account is already registered and display alert to user

    // handle account signup confirmed and display success alert to user

  }
  const handleLogin = async () => {
    // get nonce associated with currentAddress from backend

    // sign message with nonce

    // authenticate on backend, return user

  }
  const handleLogout = () => {

  }

  const guestLinks = (
    <>
      <div>
        <Link href="login" passHref>
          <Button variant="outline-warning" className={styles.loginButton}>
            Login
          </Button>
        </Link>
        <Link href="signup" passHref>
          <Button onClick={handleSignup} variant="warning" className={styles.signupButton}>
            Signup
          </Button>
        </Link>
      </div>
    </>
  )
  const authLinks = (
    <>
      <div>
        <Link href="#" passHref>
          <Button variant="primary" className={styles.useProfileButton}>
            {/* {user.userdata.publicAddress} */}
            userInfo
          </Button>
        </Link>
        <Link href="#" passHref>
          <Button variant="light" onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </Button>
        </Link>
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