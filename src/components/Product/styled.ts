import styled from "styled-components/native";
import { StatusStyleProps } from "../../pages/Home/styled";

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 94px;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const Content = styled.View`
  flex: 1;
  height: 94px;
  padding: 0 15px;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Status = styled.View<StatusStyleProps>`
  width: 10px;
  height: 94px;
  background-color: ${({ status }) => (status ? "#228B22" : "#FF0000")}; ;;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 18px;
  color: #383b43;
  margin-bottom: 18px;
  font-weight: 500;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Footer = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: #8d919e;
  margin-left: 3px;
`;
