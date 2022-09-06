import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Alert, FlatList } from "react-native";
import Product from "../../components/Product";
import { getProducts } from "../../tools/getProducts";
import { sendProductsToApi } from "../../tools/sendProductsToApi";
import EmptyList from "../../components/EmptyList";

export type ProductProps = {
  _id: string;
  status: string;
  recordedDate: Date;
  sentDate: Date;
  data: string;
  deliveryManLocation: string;
};

const Home = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const isInternetReachable = useMemo(() => {
    return netInfo.isInternetReachable;
  }, [netInfo.isInternetReachable]);

  const getLocalProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const sentProduct = async () => {
    try {
      if (isInternetReachable) {
        const quantitySent = await sendProductsToApi();
        if (quantitySent > 0) {
          Alert.alert(`${quantitySent} produtos enviados`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      sentProduct();
      getLocalProducts();
    }, [isInternetReachable])
  );
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão para acessar localização necessária");
        return;
      }
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
        >
          <ContainerStatus status={isInternetReachable}>
            <Text status={isInternetReachable}>
              Status: {isInternetReachable ? "Online" : "Offline"}
            </Text>
          </ContainerStatus>
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Product data={item} />}
            contentContainerStyle={{
              paddingBottom: 20,
              marginTop: 10,
            }}
            ListEmptyComponent={<EmptyList/>}
            showsVerticalScrollIndicator={false}
            style={{ height: "80%" }}
          />
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
