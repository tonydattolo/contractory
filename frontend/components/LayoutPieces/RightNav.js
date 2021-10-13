import ConnectButton from "../ConnectButton/ConnectButton"
import { Nav, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import Link from "next/dist/client/link"
import styles from "./RightNav.module.scss"

export default function RightNav() {

  // const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const handleSignup = async () => {

  }
  const handleLogin = async () => {

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
          <Button variant="warning" className={styles.signupButton}>
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