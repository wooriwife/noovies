import { useAssets } from "expo-asset";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.isDark ? "gray" : "gray")};
  border: 1px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 200px;
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
`;

const AssetName = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const AssetImage = styled.Image`
  background-color: red;
  height: 30px;
  width: 30px;
  resize-mode: contain;
`;

const AssetCurrentPrice = styled(AssetName)``;

interface AssetCardSmallProps {
  path: string;
  assetName: string;
  currentPrice: number;
}

const AssetCardSmall: React.FC<AssetCardSmallProps> = ({
  path,
  assetName,
  currentPrice,
}) => {
  const isDark = useColorScheme() === "dark";

  //const fPath = "../assets/eth-diamond-black.png";
  return (
    <View style={{ flex: 1 }}>
      <Wrapper isDark={isDark}>
        <Row>
          <AssetImage source={path} />
          {/* <AssetImage source={require(path)} /> */}
          <AssetName isDark={isDark}>{assetName}</AssetName>
        </Row>
        <Row>
          <AssetCurrentPrice isDark={isDark}>{currentPrice}</AssetCurrentPrice>
        </Row>
      </Wrapper>
    </View>
  );
};

export default AssetCardSmall;
