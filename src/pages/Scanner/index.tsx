import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { useNetInfo } from "@react-native-community/netinfo";

import { Container } from "./styled";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import api from "../../api";

import * as Location from "expo-location";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getRealm } from "../../databases/realm";
import { Alert } from "react-native";

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [codeData, setCodeData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  useEffect(() => {
    const getScannerPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getScannerPermission();
  }, []);

  const handleCodeScanned = (data: object) => {
    setCodeData(data);
    setOpenModal(true);
  };

  const handleStatus = async (value: string) => {
    setOpenModal(false);
    setIsloading(true);

    const realm = await getRealm();
    let location = await Location.getCurrentPositionAsync({});
    const recordedDate = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    const dataToSend = {
      _id: uuid.v4(),
      status: value,
      recordedDate,
      data: JSON.stringify(codeData),
      deliveryManLocation: JSON.stringify(location),
    };

    try {
      if (netInfo.isInternetReachable) {
        dataToSend["sentDate"] = recordedDate;
        api(dataToSend);
      }
      realm.write(() => {
        realm.create("Product", dataToSend);
      });

      Alert.alert("Produto", "Produto Registrado com sucesso!");
    } catch {
      Alert.alert("Produto", "Ops, Não consegui registrar o produto 🙁.");
    } finally {
      setIsloading(false);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  }

  if (hasPermission === false) {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }] as never,
    });
  }

  return (
    <Container>
      {openModal ? (
        <Modal onSubmit={handleStatus} onClose={handleClose} />
      ) : (
        hasPermission &&
        !isLoading && (
          <BarCodeScanner
            onBarCodeScanned={handleCodeScanned}
            style={{ width: "100%", height: "70%" }}
          />
        )
      )}
      {isLoading && <Loading />}
    </Container>
  );
};

export default Scanner;
