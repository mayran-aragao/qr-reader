import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { ProductProps } from "../../pages/Home";

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
} from "./styled";

type Props = {
  data: ProductProps;
};

const Product = ({ data }: Props) => {

  return (
    <Container>
      <Status status={data?.sentDate ? true : false} />

      <Content>
        <Header>
          <Title>{data.status}</Title>
          <MaterialIcons
            name={data.sentDate ? "check-circle" : "hourglass-empty"}
            size={24}
            color={data.sentDate ? "#228B22" : "#FF0000"}
          />
        </Header>

        <Footer>
          <Info>
            <MaterialIcons
              name="schedule"
              size={16}
              color="#8D919E"
            />
            <Label>{moment(data.recordedDate).format("DD/MM - HH:mm")}</Label>
          </Info>
        </Footer>
      </Content>
    </Container>
  );
};

export default Product;
