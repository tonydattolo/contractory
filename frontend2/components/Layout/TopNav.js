import { Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated, setLogout } from "slices/authSlice";
import { Button } from "react-bootstrap";
import Link from "next/dist/client/link";
import styles from "./TopNav.module.scss"
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import DarkModeButton from "../DarkModeButton/DarkModeButton";

export default function TopNav() {
  
  // const user = useSelector(selectCurrentUser)
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    dispatch(setLogout())
    router.push("/", undefined, { shallow: true })
  }
  
  return (
    <Navbar bg="light" variant="light" className={styles.navBar}>
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <a className={styles.brandNameLinkStyling}>
              SCaaS MVP v0
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Text>
          <small>tagline</small>
        </Navbar.Text>
        
        

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <>
          {user && isAuthenticated ? (
            <Navbar.Text>
              <Link href={`/profile/${user.userdata.email}`} passHref>
                <Button variant="light" className={styles.useProfileButton}>
                  {user.userdata.email}
                </Button>
              </Link>
              <Link href="login" passHref>
                <Button variant="light" onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </Button>
              </Link>
            </Navbar.Text>
          ) : (
            <Navbar.Text>
              <Link href="/login" passHref>
                <Button variant="light" className={styles.loginButton}>
                  Login
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button variant="light" className={styles.signupButton}>
                  Signup
                </Button>
              </Link>
            </Navbar.Text>
          )}
          
          <DarkModeButton />
          
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
