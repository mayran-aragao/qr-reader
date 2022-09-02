import React from "react";
import {
  Container,
  ContainerLogo,
  ContainerText,
  Logo,
  Text,
  Title,
  Button,
  ButtonText
} from "./styled";

const Welcome = () => {
  return (
    <Container>
      <ContainerLogo>
        <Logo source={require("../../assets/icon.png")} resizeMode="contain" />
      </ContainerLogo>

      <ContainerText>
        <Title>Pedidos Flex em tempo real.</Title>
        <Text>Receba todos os pedidos do Mercado Envios Flex dos seus clientes em tempo real.</Text>

        <Button>
          <ButtonText>Acessar</ButtonText>
        </Button>
      </ContainerText>
      
    </Container>
  );
};

export default Welcome;
