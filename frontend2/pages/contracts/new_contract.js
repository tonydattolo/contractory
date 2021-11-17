import { Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ProtectedRoute2 from "@/components/ProtectedRoute/ProtectedRoute2";

export default function NewContract() {

  const router = useRouter();

  const currentUser = useSelector(state => state.auth.user);


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
                <Form.Control type="email" placeholder={currentUser.userdata.email} readOnly/>
              </Form.Group>

              <Form.Group controlId="newContractForm">
                <Form.Label>Contract Name</Form.Label>
                <Form.Control type="text" placeholder="Enter contract name" />
              </Form.Group>

              <Form.Group controlId="newContractForm_description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter description" />
              </Form.Group>

              <Form.Group controlId="newContractForm_sendingParties">
                <Form.Label>Sending Parties</Form.Label>
                <Form.Control type="text" placeholder="Enter sending parties" />
              </Form.Group>
            </Form>   
          </>
        )  
      }
      {/* </ProtectedRoute2>
      </ProtectedRoute> */}

    </>
  )
}
