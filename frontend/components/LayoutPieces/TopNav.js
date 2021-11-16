import { Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated, setLogout } from "slices/authSlice";
import { Button } from "react-bootstrap";
import Link from "next/dist/client/link";
import styles from "./TopNav.module.scss"
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function TopNav() {
  
  // const user = useSelector(selectCurrentUser)
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    dispatch(setLogout())
    router.push("login", undefined, { shallow: true })
  }
  
  return (
    <Navbar bg="primary" variant="light">
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <a className={styles.brandNameLinkStyling}>
              GEM
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Text>
          <small>drop a gem, earn a gem</small>
        </Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          
          <Navbar.Text>
            <small>fill</small>
          </Navbar.Text>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
