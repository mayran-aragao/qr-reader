import React from "react";
import { ActivityIndicator } from "react-native";
import { Container, Text } from "./styled";

import * as Animatable from "react-native-animatable";

const Loading = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#fe563f" />
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <Text>Enviando...</Text>
      </Animatable.View>
    </Container>
  );
};

export default Loading;
