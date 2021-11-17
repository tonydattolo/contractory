import { Nav, Button } from 'react-bootstrap'
// import { Nav } from 'react-bootstrap'
// import styles from 'styles/modules/'
import Link from "next/dist/client/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faWallet, faFileContract, faFileSignature } from '@fortawesome/free-solid-svg-icons'

import styles from './LeftSideNav.module.scss'
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function LeftSideNav() {

  const router = useRouter();

  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const authLinks = () => (
    <>
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={router.pathname === '/' ? ` ${styles.navLink} ${styles.activeNavLink}` : `${styles.navLink}`}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span className={styles.linkText}>Home</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href={`/dashboard/${user.userdata.email}`} passHref>
          <Nav.Link className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className={styles.linkText}>Dashboard</span>
          </Nav.Link>
        </Link>
      </Nav.Item>

      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/wallets" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <span className={styles.linkText}>Wallets</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/contracts" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faFileContract} />
            </div>
            <span className={styles.linkText}>Contracts</span>
          </Nav.Link>
        </Link>
      </Nav.Item>

      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/contracts/new_contract" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faFileSignature} />
            </div>
            <span className={styles.linkText}>Create New Contract</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
    </>
  )
  const guestLinks = () => (
    // <>
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href='login' passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            Login to View
            {/* <span className={styles.linkText}>Login to View</span> */}
          </Nav.Link>
        </Link>
      </Nav.Item>
    // </>
  )

  return (
    <Nav defaultActiveKey="/home" className={`flex-column ${styles.nav}`}>
      {user !== null && isAuthenticated !== false ? authLinks() : guestLinks()}
      

    </Nav>
  );
}
