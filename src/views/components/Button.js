import React from 'react';
import { Button, Text } from 'native-base';

const CustomButton = ({ handler, text, style}, ...props) => (
  <Button onPress={handler} {...props}>
    <Text>{text}</Text>
  </Button>
)

export default CustomButton;
