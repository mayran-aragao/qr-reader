import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const CenteredView = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

export const ContainerModal = styled.Modal``;
export const ModalView = styled.View`
  width: 70%;
  height: 200px;
  border-radius: 20px;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
`;
export const LogoText = styled.Text`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
`;

export const ContainerText = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-left: 5%;
  padding-right: 5%;
  align-items: center;
`;

export const ContainerStatus = styled.View`
  width: 50%;
  border-width: 1px;
  border-color: #c1c1c1;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
  margin-top: 5px;
`;

export const Text = styled.Text`
  color: #a1a1a1;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  background-color: ${props => props.color};
  border-radius: 50px;
  padding: 8px 8px;
  width: 60%;
  align-self: center;
  bottom: 15%;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
