import { ListGroup, Modal, Button, Alert, Row, Col } from "react-bootstrap"
import { useDeleteClauseFromContractMutation } from "slices/contractsAPI"
import { useSelector } from "react-redux"
import { useState } from "react"

export default function ClauseListItem({ clause, contract_id }) {

  const access_token = useSelector(state => state.auth.access)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false)
  const handleShowDeleteConfirm = () => setShowDeleteConfirm(true)

  const [
    deleteClauseFromContract, {
      loading: deleteClauseFromContractLoading,
      error: deleteClauseFromContractError
    }
  ] = useDeleteClauseFromContractMutation()

  const handleDeleteClause = async () => {
    try {
      await deleteClauseFromContract({ access_token, contract_id, clause_id: clause.id })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <ListGroup key={clause.id} style={{ border: "1px lightgrey solid", marginBottom: "5px" }}>
        <Row>
          <Col lg={8}>
            <p>Clause: {clause.id}</p>
          </Col>
          <Col>
            <Button
              variant="danger"
              onClick={handleShowDeleteConfirm}
              disabled={deleteClauseFromContractLoading}
              style={{ float: "right" }}
            >
              Delete
            </Button>
          </Col>
        </Row>
        <ListGroup.Item>
          {clause.content}
        </ListGroup.Item>
      </ListGroup>

      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
        <Modal.Header>
          <Modal.Title>Delete clause</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this clause?
          <br />
          <br />
          <p style={{ color: "grey", fontStyle: "italic", }}>
            {clause.content}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteClause}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}