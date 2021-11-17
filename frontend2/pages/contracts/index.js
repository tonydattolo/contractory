import { Tabs, Tab, Spinner, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useLazyGetContractsByUserQuery } from "slices/contractsAPI"
import { useSelector } from "react-redux"

import Contract from "@/components/Contracts/Contract"


export default function Contracts() {

  const [key, setKey] = useState("drafts")

  const access_token = useSelector(state => state.auth.access)
  const email = useSelector(state => state.auth.user.userdata.email)

  const [
    getContractsByUser, {
    data: draftData,
    loading: draftLoading,
    error: draftError,
    isLoading: draftIsLoading,
    isError: draftIsError,
  }] = useLazyGetContractsByUserQuery()

  const handleGetDrafts = async (type) => {
    try {
      await getContractsByUser({ email, access_token, type })
      // await draftData.refetch({ access_token })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    console.log(`key: ${key}`)
    if (key === "draft") {
      handleGetDrafts("draft")
    }
  }, [key])

  return (
    <>
      <h1>Contracts</h1>
      <br />


      <Tabs 
        defaultActiveKey="Drafts" 
        id="contract-tabs" 
        className="mb-3"
        activeKey={key}
        onSelect={(k) => {
          setKey(k)
          // handleGetDrafts(key)
        }}
      >

        <Tab eventKey="draft" title="Draft">
          
          {draftIsLoading ? (
            <Spinner animation="border" role="status"></Spinner>
            ) : (
              <>
                {draftIsError ? (
                  <>
                    <p>Error</p>
                    <Button onClick={handleGetDrafts(key)}>Retry</Button>
                  </>
                  ) : (
                  <>
                    {draftData && draftData.contracts.length > 0 ? (
                      <>
                        <h3>Contract Drafts: </h3>
                        <br />
                        {draftData.contracts.map(contract => (
                          <Contract key={contract.id} contract={contract} />
                        ))}
                      </>
                    ) : (
                      <p>No contracts found</p>
                    )}
                  </>
                )}
              </>
            )
          }

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