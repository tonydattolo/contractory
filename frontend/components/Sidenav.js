import { Nav, Button } from 'react-bootstrap'
// import { Nav } from 'react-bootstrap'
// import styles from 'styles/modules/'
import Link from "next/dist/client/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faAt, faHouseUser } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/modules/Sidenav.module.scss'

export default function Sidenav() {
  return (
    <Nav defaultActiveKey="/home" className={`flex-column ${styles.nav}`}>
      
      <Nav.Item as="li">
        <Link href="/" passHref>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faHouseUser} />
            Home
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li">
        <Link href="/" passHref>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faAddressBook} />
            Profile
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li">
        <Link href="/" passHref>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faAddressBook} />
            Groups
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li">
        <Link href="/" passHref>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faAt} />
            Notifications
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li">
        <Link href="/" passHref>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faAddressBook} />
            Explore
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li">
        <Link href="/" passHref>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faAddressBook} />
            Messages
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li">
        <Link href="/" passHref>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faAddressBook} />
            Lists
          </Nav.Link>
        </Link>
      </Nav.Item>

      <Button size='lg' className={styles.btn}>
        Post
      </Button>
      


    </Nav>
  );
}
