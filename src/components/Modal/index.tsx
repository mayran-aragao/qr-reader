import React, { useMemo, useState } from "react";
import {
  Container,
  ContainerModal,
  CenteredView,
  ModalView,
  Button,
  ButtonText,
  CloseButton,
  CloseText,
} from "./styled";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text } from "react-native";

type Props = {
  onSubmit: Function;
  onClose: Function;
};

const Modal = ({ onSubmit, onClose }: Props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Entregue   ✅", value: "Entregue" },
    { label: "Ausente    🤷‍♂️", value: "Ausente" },
    { label: "Extravio   ❌", value: "Extravio" },
  ]);

  const disabled = useMemo(() => {
    return value ? false : true;
  }, [value]);

  const handleRegister = () => {
    setModalVisible(!modalVisible);
    onSubmit(value);
  };
  const handleClose = () => {
    setModalVisible(!modalVisible);
    onClose();
  };

  return (
    <Container>
      <ContainerModal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
      >
        <CenteredView>
          <ModalView>
            <CloseButton onPress={handleClose}>
              <CloseText>X</CloseText>
            </CloseButton>
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
            <Button
              disabled={disabled}
              color={disabled ? "#c1c1c1" : "#fe563f"}
              onPress={handleRegister}
            >
              <ButtonText>Registrar</ButtonText>
            </Button>
          </ModalView>
        </CenteredView>
      </ContainerModal>
    </Container>
  );
};

export default Modal;
