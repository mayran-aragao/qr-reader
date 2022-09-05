import React, { useEffect, useMemo, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import * as Location from "expo-location";
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
import { Alert } from "react-native";
import { getRealm } from "../../databases/realm";
import api from "../../api";

export type Product = {
  _id: string;
  status: string;
  recordedDate: Date;
  sentDate: Date;
  data: string;
  deliveryManLocation: string;
};

const Home = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [products, setProducts] = useState<Product[]>([]);
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const isInternetReachable = useMemo(() => {
    return netInfo.isInternetReachable;
  }, [netInfo.isInternetReachable]);

 

  const getLocalProducts = async () => {
    const realm = await getRealm();

    try {
      const response = realm.objects("Product").toJSON();
      setProducts(response);
    } catch {
      Alert.alert("Produtos", "Ops, não conseguimos carregar os produtos");
    } finally {
      realm.close();
    }
  };

  const handleUnsentProducts = async () => {
    const realm = await getRealm();
    const sentDate = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    try {
      if (isInternetReachable) {
        const response = realm
          .objects("Product")
          .filtered(`sentDate = ${null}`);

        if (response.length) {
          response.map((product: object) => {
            realm.write(() => {
              product['sentDate'] = sentDate;
            });
            api(product);
          });
        }
      }
    } catch {
      Alert.alert("Produtos", "Ops, não conseguimos enviar os produtos");
    } finally {
      realm.close();
    }
  };

  useEffect(() => {
    getLocalProducts();
  }, []);

  useEffect(() => {
    handleUnsentProducts();
  }, [isInternetReachable]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão para acessar localização necessária");
        return;
      }
      setLocationPermission(status === "granted");
    })();
  }, []);

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
            <Text>Status: {isInternetReachable ? "Online" : "Offline"}</Text>
          </ContainerStatus>
          <Button
            onPress={() => navigation.navigate("Scanner" as never, {} as never)}
          >
            <ButtonText>Escanear</ButtonText>
          </Button>
        </Animatable.View>
      </ContainerText>
    </Container>
  );
};

export default Home;
