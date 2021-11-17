import { Form } from "react-bootstrap"
import { useGetWalletsByUserQuery } from "slices/walletsAPI";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function SenderDropDown({ senderEmail }) {

  
  const access_token = useSelector(state => state.auth.access);

  const email = senderEmail

  const {
    data: walletsData,
    error: walletsError,
    isLoading: walletsIsLoading,
    isError: walletsIsError,
    isFetching: walletsIsFetching
  } = useGetWalletsByUserQuery({ email, access_token })

  useEffect(() => {
    if (walletsData) {
      console.log(walletsData)
    }
  }, [walletsData])


  useEffect(() => {
    if (walletsIsError) {
      console.log(walletsError)
    }
  }, [walletsIsError, walletsError])

  return (
    <>
      {walletsIsLoading || walletsIsFetching ? (
        <Form.Control disabled={true} />
      ) : walletsIsError ? (
        <Form.Control disabled={true} placeholder={"error"} />
      ) : (
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Sender</Form.Label>
          <Form.Control as="select">
            {walletsData.wallets.map(wallet => (
              <option key={wallet.id} value={wallet.address}>
                {wallet.name} : {wallet.owner} : {wallet.address}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        // <Form.Group controlId="formBasicSender">
        //   <Form.Label>Sender</Form.Label>
        //   <Form.Control as="select" onChange={props.onChange}>
        //     <option value="">Select Sender</option>
        //     {props.senders.map((sender, index) => {
        //       return <option key={index} value={sender.id}>{sender.name}</option>
        //     }
        //     )}
        //   </Form.Control>
        // </Form.Group>
      )}
    </>
  )
}