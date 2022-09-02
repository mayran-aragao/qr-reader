import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fe563f;
`;

export const ContainerLogo = styled.View`
  flex: 2;
  background-color: #fe563f;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 70%;
`;

export const ContainerText = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-left: 5%;
  padding-right: 5%;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 28px;
  margin-bottom: 12px;
`;

export const Text = styled.Text`
  color: #a1a1a1;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  background-color: #fe563f;
  border-radius: 50px;
  padding: 8px 8px ;
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
