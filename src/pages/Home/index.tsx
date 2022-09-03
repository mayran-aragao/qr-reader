import React, { useEffect, useState } from "react";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import {
  Container,
  ContainerLogo,
  ContainerText,
  ContainerStatus,
  LogoText,
  Text,
  Button,
  ButtonText,
} from "./styled";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [typeOfConnection, setTypeOfConnection] = useState("");
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const unsubscribe = NetInfo.addEventListener((state) => {
    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
    // console.log("Is connected?", state.isInternetReachable);
    if (state.type !== typeOfConnection) {
      setTypeOfConnection(state.type);
    }
    if (state.isConnected !== isConnected) {
      setIsConnected(state.isConnected);
    }
  });

  return (
    <Container>
      <ContainerLogo>
        <Animatable.View animation="fadeInLeft" useNativeDriver={true}>
          <LogoText>QR Reader</LogoText>
        </Animatable.View>
      </ContainerLogo>
      <ContainerText>
        <Animatable.View
          animation="fadeInUp"
          delay={600}
          useNativeDriver={true}
          style={{ flex: 1 }}
        >
          <ContainerStatus>
            <Text> Status: {netInfo.isInternetReachable ? "Online" : "Offline"} </Text>
          </ContainerStatus>
          <Button onPress={() => navigation.navigate("Scanner" as never, {} as never)}>
            <ButtonText>Escanear</ButtonText>
          </Button>
        </Animatable.View>
      </ContainerText>
    </Container>
  );
};

export default Home;
