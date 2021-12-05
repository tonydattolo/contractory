import { Spinner, Button, Alert, Card, ListGroup, Modal, Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { 
  useGetContractDetailsQuery,
  useDeleteContractMutation,
  useAddClauseToContractMutation,
  useLazyGeneratePDFofContractQuery,
} from "slices/contractsAPI"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import ClauseForm from "@/components/ClauseForm/ClauseForm"
import ClauseListItem from "@/components/Contracts/ClauseListItem"


import axios from "axios"

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

  const [
    deleteContract, {
      loading: deleteContractLoading,
      error: deleteContractError,
      isLoading: deleteContractIsLoading,
      isError: deleteContractIsError,
      isSuccess: deleteContractIsSuccess
    }
  ] = useDeleteContractMutation()

  const handleDeleteContract = async () => {
    try {
      await deleteContract({ contract_id, access_token })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (deleteContractIsSuccess) {
      router.push("/contracts", undefined, { shallow: true })
    }
  }, [deleteContractIsSuccess])

  const handleAddParty = () => {
    router.push(
      `/contracts/detail/add_party/${contract_id}`,
      undefined,
      { shallow: true }
    )
  }

  const fileDownload = require("js-file-download")

  return (
    <>

      {deleteContractIsError && (
        <Alert variant="danger">
          {deleteContractError.message ?? "Error deleting contract"}
        </Alert>
      )}

      {contractIsLoading && <Spinner animation="border" variant="primary" />}
      {contractIsError && contractError.data && <Alert variant="danger">{contractError.data.message}</Alert>}
      {contractIsSuccess && contractData && (
        <>
          <Card className={`mt-4`}>
            <Card.Header>
              <Row>
                <Col>
                  <h4>Contract name: {contractData.contract.name}</h4>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    // onClick={handleGeneratePDF}
                    onClick={() => {
                      axios.get(`http://localhost:8000/contracts/generate_pdf/${contract_id}/`, {
                        headers: {
                          Authorization: `JWT ${access_token}`,
                        },
                        responseType: "blob",
                      }).then((response) => {
                        fileDownload(response.data, `${contractData.contract.id}.pdf`)
                      }).catch((error) => {
                        console.log(error)
                      })
                    }}

                    style={{ float: "right" }}
                    // download
                  >
                    Preview PDF
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body style={{ marginBottom: "5px", borderBottom: "1px lightgrey solid"}}>
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
                  <h4>Contract Parties</h4>
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
            <Card.Body style={{ marginBottom: "5px", borderBottom: "1px lightgrey solid"}}>
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
              <Row>
                <Col>
                  <h4>Contract clauses</h4>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    style={{ float: "right", }}
                    onClick={() => {
                      router.push(`/contracts/detail/add_clause/${contract_id}`, undefined, { shallow: true })
                    }}
                  >
                    Add Clause
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {contractIsSuccess && contractData.clauses.length === 0 && (
                <Alert variant="info">No clauses found</Alert>
              )}

              {/* without formik */}
              {contractData.clauses.map(clause => (
                <ClauseListItem key={clause.id} clause={clause} contract_id={contract_id} />
                // <ListGroup key={clause.id}>
                //   <ListGroup.Item>
                //     {clause.content}
                //   </ListGroup.Item>
                // </ListGroup>
              ))}
              
              {/* with formik */}
              {/* {contractIsSuccess && contractData && (
                <ClauseForm contract={contractData.contract.id} clauses={contractData.clauses} />
              )} */}

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