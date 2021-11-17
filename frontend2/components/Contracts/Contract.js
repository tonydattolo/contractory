import { Button, Card, Col, ListGroup, Row } from "react-bootstrap"
import Link from "next/dist/client/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faStop, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"


export default function Contract({ contract }) {

  return (
    <>
      <Card>
        <Card.Header as="h5">
          <Row>
            <Col>
              Contract: {contract.name}
            </Col>
            <Col>
              <Link href={`/contracts/[id]`} as={`/contracts/${contract.id}`}>
                <Button variant="primary">
                  View
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Header>
      
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Created by: {contract.owner}
            </ListGroup.Item>

            <ListGroup.Item>
              Created at: {new Date(contract.created_at).toLocaleString()}
            </ListGroup.Item>
            {/* <ListGroup.Item>
              Verified: {wallet.verified ? (
                <FontAwesomeIcon icon={faCheck} style={{color: "green",}}/>
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{color: "red",}}/>
              )}
            </ListGroup.Item> */}
            <ListGroup.Item>
              Description: {contract.description}
            </ListGroup.Item>
            <ListGroup.Item>
              Status: {contract.status}
            </ListGroup.Item>

            <ListGroup.Item>
              Last Updated: {contract.updated_at ? new Date(contract.updated_at).toLocaleString() : "Never"}
            </ListGroup.Item>

          </ListGroup>
        </Card.Body>
      </Card>
    </>
  )

}