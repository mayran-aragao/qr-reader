import React from "react";
import { ActivityIndicator } from "react-native";
import {
  Container,
} from "./styled";

const Loading = () => {
  
  return (
    <Container>
      <ActivityIndicator size='small' color='#fe563f'/>
    </Container>
  );
};

export default Loading;
