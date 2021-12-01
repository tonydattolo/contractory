import { ListGroup, Button, Alert, Row, Col } from "react-bootstrap"
import { useDeleteClauseFromContractMutation } from "slices/contractsAPI"
import { useSelector } from "react-redux"

export default function ClauseListItem({ clause, contract_id }) {

  const access_token = useSelector(state => state.auth.access)

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
              onClick={handleDeleteClause}
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
    </>
  )
}