import { Form, Spinner, Button, Alert, Breadcrumb } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useAddPartyToContractMutation } from "slices/contractsAPI"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import Link from "next/dist/client/link"

export default function AddPartyToContract() {

  const access_token = useSelector(state => state.auth.access)
  const router = useRouter()
  const { contract_id } = router.query
  // const [addPartyToContract, { loading, error }] = useAddPartyToContractMutation({

  const [
    addPartyToContract, {
      isLoading: addPartyIsLoading,
      isError: addPartyIsError,
      error: addPartyError,
      isSuccess: addPartyIsSuccess,
      data: addPartyData
    }
  ] = useAddPartyToContractMutation()

  const [addPartyFormData, setAddPartyFormData] = useState({
    newParty: "",
    newPartyRole: "",
    newPartyInviteMessage: "",
  })
  const {
    newParty,
    newPartyRole,
    newPartyInviteMessage
  } = addPartyFormData

  const handleAddPartyFormDataChange = (e) => {
    setAddPartyFormData({
      ...addPartyFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddParty = async () => {
    try {
      await addPartyToContract({
        contract_id, access_token,
        newParty, newPartyRole, newPartyInviteMessage
      })   
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Breadcrumb>
        {/* <Breadcrumb.Item href="/">Home</Breadcrumb.Item> */}
        <Link href={`/contracts/detail/${contract_id}`} passHref>
          <Breadcrumb.Item>Contract Detail</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item active>Add Party</Breadcrumb.Item>
      </Breadcrumb>

      {addPartyIsError && (
        <Alert variant="danger">
          {addPartyError.data.message}
        </Alert>
      )}
      {addPartyIsSuccess && (
        <Alert variant="success">
          Successfully added party to contract
        </Alert>
      )}
      {addPartyIsLoading && (
        <Spinner animation="border" role="status" variant="warning" />
      )}

      <Form className="mt-4">
        <Form.Group className="mb-3" controlId="addPartyEmail">
          <Form.Label>Enter new party email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com" 
            name="newParty"
            value={newParty}
            onChange={handleAddPartyFormDataChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="addPartyMessage">
          <Form.Label>Send an accompanying message:</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3}
            placeholder="Enter message"
            onChange={handleAddPartyFormDataChange}
            name="newPartyInviteMessage"
            value={newPartyInviteMessage}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="addPartyRole">
          <Form.Label>Select role:</Form.Label>
          <Form.Control as="select" onChange={handleAddPartyFormDataChange} name="newPartyRole">
            <option>Select role</option>
            <option value="receiver">receiver</option>
            <option value="viewer">viewer</option>
            <option value="lawyer">lawyer</option>
            <option value="sender">sender</option>
          </Form.Control>
        </Form.Group>

        {addPartyIsLoading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </Button>
        ) : (
          <Button variant="primary" onClick={handleAddParty}>
            Add party
          </Button>
        )}
      </Form>
    </>
  )

}