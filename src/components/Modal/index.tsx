import React, { useEffect, useState } from "react";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import {
  Container,
  ContainerModal,
  CenteredView,
  ModalView,
  Button,
  ButtonText,
} from "./styled";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

type Props = {
  onSubmit: Function
};

const Modal = ({onSubmit}:Props) => {
  
  const [modalVisible, setModalVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Entregue   ✅", value: "Entregue" },
    { label: "Ausente    🤷‍♂️", value: "Ausente" },
    { label: "Extravio   ❌", value: "Extravio" },
  ]);

  const handleRegister = () => {
    setModalVisible(!modalVisible)
    onSubmit(value)
  }

  return (
    <Container>
      <ContainerModal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
      >
        <CenteredView>
          <ModalView>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Selecione uma opção"
              containerStyle={{
                width: "80%",
                marginTop: 10,
              }}
            />
            <Button onPress={handleRegister}>
              <ButtonText>Registrar</ButtonText>
            </Button>
          </ModalView>
        </CenteredView>
      </ContainerModal>
    </Container>
  );
};

export default Modal;
