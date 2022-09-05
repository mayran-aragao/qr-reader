import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Container, Content, WaningText } from "./styled";



const EmptyList = () => {
  return (
    <Container>
      <Content>
        <Ionicons name="document-text-outline" size={35} color="#8D919E" />
        <WaningText>Nenhum produto registrado.</WaningText>
      </Content>
    </Container>
  );
};

export default EmptyList;
