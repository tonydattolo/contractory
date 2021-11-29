import { Spinner, Button, Alert, Card, ListGroup } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useGetContractDetailsQuery } from "slices/contractsAPI"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

export default function ContractDetail() {

  const router = useRouter()
  // router.prefetch("/contracts/detail/[contract_id]")
  const { contract_id } = router.query
  const access_token = useSelector(state => state.auth.access)

  const {
    data: contractData,
    loading: contractLoading,
    error: contractError,
    isLoading: contractIsLoading,
    isError: contractIsError,
    isSuccess: contractIsSuccess
  } = useGetContractDetailsQuery({ contract_id, access_token })

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
              <h3>Contract participants</h3>
            </Card.Header>
            <Card.Body>
              {contractData.parties.map(party => (
                <ListGroup key={party.id} horizontal>
                  <ListGroup.Item>{party.partyEmail}</ListGroup.Item>
                  <ListGroup.Item>{party.role}</ListGroup.Item>
                  <ListGroup.Item>{party.description}</ListGroup.Item>
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
        </>
      )}

    </>
  )
}