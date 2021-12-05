import { Tabs, Tab, Spinner, Button, Alert } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useGetDraftContractsByUserQuery } from "slices/contractsAPI"
import { useSelector } from "react-redux"

import Contract from "@/components/Contracts/Contract"


export default function Contracts() {

  const [key, setKey] = useState("draft")

  const access_token = useSelector(state => state.auth.access)
  const email = useSelector(state => state.auth.user.userdata.email) ?? ""

  // pull draft contracts for this user
  const {
    data: draftData,
    loading: draftLoading,
    error: draftError,
    isLoading: draftIsLoading,
    isError: draftIsError,
    isSuccess: draftIsSuccess,
  } = useGetDraftContractsByUserQuery({ email, access_token })

  // const handleGetDrafts = async (type) => {
  //   try {
  //     await getContractsByUser({ email, access_token, type })
  //     // await draftData.refetch({ access_token })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    // console.log(`key: ${key}`)
    if (key === "draft") {
      // handleGetDrafts("draft")
    }
  }, [key])

  return (
    <>
      <h1>Contracts</h1>
      <br />


      <Tabs 
        defaultActiveKey="draft" 
        id="contract-tabs" 
        className="mb-3"
        activeKey={key}
        onSelect={(k) => {
          setKey(k)
          // handleGetDrafts(key)
        }}
      >

        <Tab eventKey="draft" title="Draft">
          
          {draftLoading && <Spinner animation="border" variant="primary" />}
          {draftIsError && <Alert variant="warning">{draftError.data.message}</Alert>}
          {draftIsSuccess && draftData && draftData.contracts.length === 0 && <Alert variant="info">No contracts found</Alert>}
          {draftIsSuccess && draftData && draftData.contracts.length > 0 && (
            <>
              {draftData.contracts.map(contract => (
                <Contract key={contract.id} contract={contract} />
              ))}
            </>
          )}

        </Tab>

        <Tab eventKey="pending" title="Pending">
          <p>placeholder</p>
        </Tab>


        <Tab eventKey="live" title="Live">
          <p>placeholder</p>
        </Tab>
      </Tabs>


    </>
  )
}