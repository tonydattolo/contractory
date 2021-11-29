import { Spinner, Button, Alert, Card, ListGroup, Modal, Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useGetContractDetailsQuery } from "slices/contractsAPI"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

export default function ContractDetail() {

  const router = useRouter()
  // router.prefetch("/contracts/detail/[contract_id]")
  const { contract_id } = router.query
  const access_token = useSelector(state => state.auth.access)
  const currentUser = useSelector(state => state.auth.user)
  const {
    data: contractData,
    loading: contractLoading,
    error: contractError,
    isLoading: contractIsLoading,
    isError: contractIsError,
    isSuccess: contractIsSuccess
  } = useGetContractDetailsQuery({ contract_id, access_token })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false)
  const handleShowDeleteConfirm = () => setShowDeleteConfirm(true)

  const handleDeleteContract = async () => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddParty = () => {
    router.push(
      `/contracts/detail/add_party/${contract_id}`,
      undefined,
      { shallow: true }
    )
  }

  return (
    <>
      {contractIsLoading && <Spinner animation="border" variant="primary" />}
      {contractIsError && <Alert variant="danger">{contractError.data.message}</Alert>}
      {contractIsSuccess && contractData && (
        <>
          <Card className={`mt-4`}>
            <Card.Header>
              <h3>Contract name: {contractData.contract.name}</h3>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Created by: {contractData.contract.owner}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created at: {new Date(contractData.contract.created_at).toLocaleString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {contractData.contract.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Status: {contractData.contract.status}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Header>
              <Row>
                <Col>
                  <h3>Contract Parties</h3>
                </Col>
                <Col>
                  <Button 
                    variant="primary"
                    style={{ float: "right", }}
                    onClick={handleAddParty}
                  >
                    Add Party
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {contractData.parties.map(party => (
                <ListGroup key={party.id} horizontal>
                  <ListGroup.Item>{party.partyEmail}</ListGroup.Item>
                  <ListGroup.Item>{party.role}</ListGroup.Item>
                  <ListGroup.Item>{party.description}</ListGroup.Item>
                  <Button variant="danger">Delete Party</Button>
                </ListGroup>
              ))}
            </Card.Body>
            <Card.Header>
              <h3>Contract clauses</h3>
            </Card.Header>
            <Card.Body>
              {contractData.clauses.length === 0 && ( 
                <Alert variant="info">No clauses found</Alert>
              )}
              {contractData.clauses.map(clause => (
                <ListGroup key={clause.id}>
                  <ListGroup.Item>
                    {clause.description}
                  </ListGroup.Item>
                </ListGroup>
              ))}

            </Card.Body>
          </Card>
          <Button variant="primary" onClick={() => 
            {
              router.push(`/contracts/edit/${contract_id}`, undefined, { shallow: true })
            }}>Edit</Button>
          <Button variant="danger" onClick={handleShowDeleteConfirm}>Delete</Button>
        </>
      )}

      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
        <Modal.Header>
          <Modal.Title>Delete contract</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this contract?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteContract}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}