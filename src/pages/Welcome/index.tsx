import React from "react";
import {
  Container,
  ContainerLogo,
  ContainerText,
  Logo,
  Text,
  Title,
  Button,
  ButtonText,
} from "./styled";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <ContainerLogo>
        <Animatable.View
          animation="fadeInLeft"
          duration={1000}
          useNativeDriver={true}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo
            source={require("../../assets/icon.png")}
            resizeMode="contain"
          />
        </Animatable.View>
      </ContainerLogo>

      <ContainerText>
        <Animatable.View
          animation="fadeInUp"
          useNativeDriver={true}
          delay={600}
          style={{ flex: 1 }}
        >
          <Title>Pedidos Flex em tempo real.</Title>
          <Text>
            Receba todos os pedidos do Mercado Envios Flex dos seus clientes em
            tempo real.
          </Text>

          <Button
            onPress={() =>
              navigation.navigate("Scanner" as never, {} as never)
            }
          >
            <ButtonText>Acessar</ButtonText>
          </Button>
        </Animatable.View>
      </ContainerText>
    </Container>
  );
};

export default Welcome;
