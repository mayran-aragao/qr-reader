import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

import { Container } from "./styled";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";

import { BarCodeScanner } from "expo-barcode-scanner";
// import { getRealm } from "../../databases/realm";
import { Alert } from "react-native";

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [codeData, setCodeData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigation = useNavigation();

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
    // const realm = await getRealm();
    const recordedDate = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    try {
      setIsloading(true);
      // const productCreated = realm.write(() => {
      //   realm.create("Product", {
      //     _id: uuid.v4(),
      //     status: value,
      //     recordedDate,
      //     data: codeData,
      //   });
      // });

      // console.log(productCreated);
      Alert.alert("Produto", "Produto Registrado com sucesso!");
    } catch {
      Alert.alert("Produto", "Ops, Não consegui registrar o produto 🙁.");
    } finally {
      // realm.close();
      setIsloading(false);
    }
  };

  if (hasPermission === false) {
    navigation.goBack();
  }

  return (
    <Container>
      {openModal ? (
        <Modal onSubmit={handleStatus} />
      ) : (
        <BarCodeScanner
          onBarCodeScanned={handleCodeScanned}
          style={{ width: "100%", height: "70%" }}
        />
      )}
      {isLoading && <Loading />}
    </Container>
  );
};

export default Scanner;
