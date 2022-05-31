import React, { FC } from 'react';
import {Spacer, Input} from '@nextui-org/react'
const OrderForm: FC = () => {
  return (
    <div className="flex-column">
        <Input
        clearable
        underlined
        labelPlaceholder="Price"
      />
        <Spacer y={0.5} />
        <Input
        clearable
        underlined
        labelPlaceholder="Quantity"
      />
    </div>
  );
};

export default OrderForm;
