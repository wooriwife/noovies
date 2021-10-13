import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import styled from "styled-components/native";
import {
  COLOR_CHROME_YELLOW,
  COLOR_DARK_PERIWINKLE,
} from "../color-swedish-palette";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Home: React.FC<NativeStackScreenProps<any, "Home">> = ({
  navigation,
}) => {
  return (
    <Btn onPress={() => navigation.navigate("Stack", { screen: "Three" })}>
      <Title>Home</Title>
    </Btn>
  );
};

export default Home;
