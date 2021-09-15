import { Nav, Button } from 'react-bootstrap'
// import { Nav } from 'react-bootstrap'
// import styles from 'styles/modules/'
import Link from "next/dist/client/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faAt, faGem, faHome, faUser, faUsers, faSearch, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/modules/Sidenav.module.scss'

export default function Sidenav() {
  return (
    <Nav defaultActiveKey="/home" className={`flex-column ${styles.nav}`}>
      
      <Nav.Item as="li" className={styles.logo}>
        <Link href="/" passHref>
          <Nav.Link href="#">
            <FontAwesomeIcon size='2x' icon={faGem} />
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span className={styles.linkText}>Home</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className={styles.linkText}>Profile</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <span className={styles.linkText}>Groups</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faAt} />
            </div>
            <span className={styles.linkText}>Notifications</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <span className={styles.linkText}>Explore</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <span className={styles.linkText}>Messages</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faAddressBook} />
            </div>
            <span className={styles.linkText}>Lists</span>
          </Nav.Link>
        </Link>
      </Nav.Item>

      <Button size='lg' className={styles.postButton}>
        Post
      </Button>
      


    </Nav>
  );
}
