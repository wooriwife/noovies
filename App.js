import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Image, Text, useColorScheme } from "react-native";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  const [assets] = useAssets([require("./assets/my-face.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";
  if (!assets || !loaded) {
    return (
      <AppLoading
      // startAsync={startLoading}
      // onFinish={onFinish}
      // onError={console.error}
      />
    );
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        {/* <Tabs></Tabs> */}
        {/* <Stack /> */}
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
