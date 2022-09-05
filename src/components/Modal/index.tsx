import React, { useEffect, useMemo, useState } from "react";
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
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Entregue   ✅", value: "Entregue" },
    { label: "Ausente    🤷‍♂️", value: "Ausente" },
    { label: "Extravio   ❌", value: "Extravio" },
  ]);

  const disabled = useMemo(() => {
    return value ? false : true
  },[value])

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
            <Button disabled={disabled} color={disabled ? "#c1c1c1":"#fe563f" } onPress={handleRegister}>
              <ButtonText>Registrar</ButtonText>
            </Button>
          </ModalView>
        </CenteredView>
      </ContainerModal>
    </Container>
  );
};

export default Modal;
