import { Tabs, Tab } from "react-bootstrap"

export default function Contracts() {

  return (
    <>
      <h1>Contracts</h1>
      <br />


      <Tabs defaultActiveKey="Drafts" id="contract-tabs" className="mb-3">
        <Tab eventKey="home" title="Drafts">
          <p>placeholder</p>
        </Tab>
        <Tab eventKey="profile" title="Pending">
          <p>placeholder</p>
        </Tab>
        <Tab eventKey="contact" title="Live">
          <p>placeholder</p>
        </Tab>
      </Tabs>


    </>
  )
}