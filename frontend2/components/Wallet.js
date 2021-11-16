import { Button, Card, ListGroup } from "react-bootstrap"
import Link from "next/dist/client/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faStop, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
// import { useDeletewalletMutation } from "slices/walletsAPI"


export default function Wallet({ wallet }) {

  const handleClick = () => {
    console.log("clicked")
  }
  

  return (
    <>
      <Card>
        <Card.Header as="h5">
          {/* <Link href="/wallet/[id]" as={`/wallet/${wallet.id}`}> */}
          Wallet: {wallet.address}
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Linked to Site at: {new Date(wallet.created_at).toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              Verified: {wallet.verified ? (
                <FontAwesomeIcon icon={faCheck} style={{color: "green",}}/>
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{color: "red",}}/>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              Name: {wallet.name}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {wallet.description}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>


    </>
  
  )

}