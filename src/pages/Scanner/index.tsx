import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

import { Container } from "./styled";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import api from '../../api'

import * as Location from 'expo-location';
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
    const realm = await getRealm();
    let location = await Location.getCurrentPositionAsync({})
    const recordedDate = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      dateStyle: 'short'
    });
    console.log('recordedDate',recordedDate)
    const dataToSend = {
      _id: uuid.v4(),
      status: value,
      recordedDate,
      data: JSON.stringify(codeData),
      deliveryManLocation:JSON.stringify(location)
    };

    try {
      setIsloading(true);
      if (netInfo.isInternetReachable) {
        dataToSend["sentDate"] = recordedDate;

        api(dataToSend)

        realm.write(() => {
          realm.create("Product", dataToSend);
        });

      } else {
        realm.write(() => {
          realm.create("Product", dataToSend);
        });
      }

      Alert.alert("Produto", "Produto Registrado com sucesso!");
    } catch (e) {
      console.log(e);
      Alert.alert("Produto", "Ops, Não consegui registrar o produto 🙁.");
    } finally {
      realm.close();
      setIsloading(false);
    }
  };

  if (hasPermission === false) {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }] as never,
    });
  }

  return (
    <Container>
      {openModal ? (
        <Modal onSubmit={handleStatus} />
      ) : (
        hasPermission && (
          <BarCodeScanner
            onBarCodeScanned={handleCodeScanned}
            style={{ width: "100%", height: "70%" }}
          />
        )
      )}
      {isLoading && <Loading/>}
    </Container>
  );
};

export default Scanner;
