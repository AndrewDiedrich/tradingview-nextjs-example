import React, {FC} from 'react'
import {Table} from '@nextui-org/react'

interface RowProps {
    price: number
    quantity: number
}

const Row: FC<RowProps> = ({price, quantity}) => {
    return (
        <Table.Row key={price}>
            <Table.Cell>{price}</Table.Cell>
            <Table.Cell>{quantity}</Table.Cell>
          </Table.Row>
    )
}

export default Row