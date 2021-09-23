import { Navbar, Container } from "react-bootstrap";
import ConnectButton from "../ConnectButton/ConnectButton";
import styles from './Topnav.module.scss'

export default function Topnav() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">
          <span className={styles.brandFont}>GEM</span>
        </Navbar.Brand>
        <Navbar.Text>
          <small>drop a gem, earn a gem</small>
        </Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <ConnectButton />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
