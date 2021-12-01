import { Spinner, Button, Alert, Row, Col, Form, Breadcrumb } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useAddClauseToContractMutation } from "slices/contractsAPI"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import Link from "next/dist/client/link"



export default function AddClause() {

  const router = useRouter()
  const access_token = useSelector(state => state.auth.access)
  const { contract_id } = router.query

  const [
    addClauseToContract, {
      loading: addClauseToContractLoading,
      error: addClauseToContractError,
      isLoading: addClauseToContractIsLoading,
      isError: addClauseToContractIsError,
      isSuccess: addClauseToContractIsSuccess
    }
  ] = useAddClauseToContractMutation()

  const [clauseContent, setClauseContent] = useState("")
  // const [clauseTitle, setClauseTitle] = useState("")

  const clauseContentChange = (e) => {
    setClauseContent(e.target.value)
  }

  const handleAddClauseSubmit = async () => {
    try {
      await addClauseToContract({ access_token, clauseContent, contract_id })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (addClauseToContractIsSuccess) {
      router.push(`/contracts/detail/${contract_id}`)
    }
  }, [addClauseToContractIsSuccess])

  return (
    <>
      <Breadcrumb>
        {/* <Breadcrumb.Item href="/">Home</Breadcrumb.Item> */}
        <Link href={`/contracts/detail/${contract_id}`} passHref>
          <Breadcrumb.Item>Contract Detail</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item active>Add Party</Breadcrumb.Item>
      </Breadcrumb>

      {addClauseToContractIsError && <Alert variant="danger">{addClauseToContractError.message ?? "error adding contract"}</Alert>}
      {addClauseToContractIsLoading && <Spinner animation="border" role="status" />}

      <Form>
        <Form.Group>
          <Form.Label>Clause Content</Form.Label>
          <Form.Control 
            value={clauseContent}
            as="textarea"
            rows="5"
            onChange={clauseContentChange}
          />
        </Form.Group>
      </Form>
      <Button
        onClick={handleAddClauseSubmit}
      >
        Submit
      </Button>
    </>
  )
}