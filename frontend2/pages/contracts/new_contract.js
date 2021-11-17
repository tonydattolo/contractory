import { Form, Spinner, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ProtectedRoute2 from "@/components/ProtectedRoute/ProtectedRoute2";

import SenderDropDown from "@/components/Contracts/SenderDropDown";

import { useCreateContractMutation } from "slices/contractsAPI";

export default function NewContract() {

  const router = useRouter()

  const currentUser = useSelector(state => state.auth.user)
  const access_token = useSelector(state => state.auth.access)

  const [contractFormData, setContractFormData] = useState({
    owner: currentUser.userdata.email,
    name: "",
    description: "",
  })
  const {
    owner,
    name,
    description,
  } = contractFormData
  
  const handleContractFormChange = e => {
    setContractFormData({
      ...contractFormData,
      [e.target.name]: e.target.value
    })
  }

  const [createContract, {
    error: createContractError,
    isSuccess: createContractIsSuccess,
    isLoading: createContractIsLoading,
    isError: createContractIsError,
  }] = useCreateContractMutation()
  
  const handleNewContractSubmit = async () => {
    try {
      await createContract({ owner, name, description, access_token })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (createContractIsSuccess) {
      router.push("/contracts", undefined, { shallow: true })
    }
  }, [createContractIsSuccess])

  useEffect(() => {
    if (createContractIsError) {
      console.log(createContractError)
      // console.alert(`Error creating contract: ${createContractError}`)
    }
  }, [createContractIsError])


  useEffect(() => {
    if (currentUser === null) {
      router.push("/login",undefined,{ shallow: true })
    }
  }, [currentUser])

  return (
    <>
      {/* <ProtectedRoute>
      <ProtectedRoute2> */}

      <h2>New Contract Page</h2>
      <br />

      {currentUser === null ? (
          <Spinner animation="border" role="status" />
        ) : (
          <>
            <Form>
              <Form.Group controlId="newContractForm_created_by">
                <Form.Label>Created By</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={currentUser.userdata.email} 
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="newContractForm_name">
                <Form.Label>Contract Name</Form.Label>
                <Form.Control 
                  value={name}
                  type="text"
                  placeholder="Enter contract name"
                  onChange={handleContractFormChange}
                  name="name"
                  value={name}
                />
              </Form.Group>

              <Form.Group controlId="newContractForm_description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  as="textarea"
                  rows="3"
                  placeholder="Enter description"
                  onChange={handleContractFormChange}
                  name="description"
                  value={description}
                />
              </Form.Group>

              <SenderDropDown senderEmail={currentUser.userdata.email} />


              {createContractIsLoading ? (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              ) : (
              <Button
                variant="primary"
                type="submit"
                // onSubmit={handleSignupSubmit}
                onClick={handleNewContractSubmit}
              >
                Submit
              </Button>
              )}

              {/* <Form.Group controlId="newContractForm_sendingParties">
                <Form.Label>Sending Parties</Form.Label>
                <Form.Control type="text" placeholder="Enter sending parties" />
              </Form.Group> */}
            </Form>   
          </>
        )  
      }
      {/* </ProtectedRoute2>
      </ProtectedRoute> */}

    </>
  )
}
