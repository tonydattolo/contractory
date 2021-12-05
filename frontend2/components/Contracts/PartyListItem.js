import { ListGroup, Modal, Button, Alert, Row, Col } from "react-bootstrap"
import { useDeletePartyFromContractMutation } from "slices/contractsAPI"
import { useSelector } from "react-redux"
import { useState } from "react"

export default function PartyListItem({ party, contract_id }) {

  const access_token = useSelector(state => state.auth.access)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false)
  const handleShowDeleteConfirm = () => setShowDeleteConfirm(true)


  const [
    deletePartyFromContract, {
      loading: deletePartyFromContractLoading,
      error: deletePartyFromContractError,
      data: deletePartyFromContractData,
      isLoading: deletePartyFromContractIsLoading,
      isError: deletePartyFromContractIsError,      
    }
  ] = useDeletePartyFromContractMutation()

  const handleDeleteParty = async () => {
    try {
      await deletePartyFromContract({ access_token, party_id: party.id, contract_id })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {deletePartyFromContractIsError && (
        <Alert variant="danger">
          {deletePartyFromContractError.data.message ?? "error deleting party"}
        </Alert>
      )}

      <ListGroup key={party.id} horizontal>
        <ListGroup.Item>{party.partyEmail}</ListGroup.Item>
        <ListGroup.Item>{party.role}</ListGroup.Item>
        <ListGroup.Item>{party.description}</ListGroup.Item>
        <Button
          variant="danger"
          onClick={handleShowDeleteConfirm}
        >
          Delete Party
        </Button>
      </ListGroup>

      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
        <Modal.Header>
          <Modal.Title>Delete contract</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this party?
          <br />
          <br />
          {party.partyEmail}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteParty} disabled={deletePartyFromContractIsLoading}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}