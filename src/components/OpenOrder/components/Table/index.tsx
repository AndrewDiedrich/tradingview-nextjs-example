import React, {FC} from 'react'
import { Table } from "@nextui-org/react";


const OpenOrder: FC<any> = ({children}) => {
    return (
        <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Price</Table.Column>
          <Table.Column>Quantity</Table.Column>
         
        </Table.Header>
        <Table.Body>
          {children} 
        </Table.Body>
      </Table>
    )
}

export default OpenOrder