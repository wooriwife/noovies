import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useColorScheme } from "react-native";

import Home from "../screens/Home";
import SocialChart from "../screens/SocialChart";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import {
  COLOR_BLACK_PEARL,
  COLOR_CHROME_YELLOW,
  COLOR_GOOD_NIGHT,
  COLOR_HINT_OF_ELUSIVE_BLUE,
  COLOR_LONDON_SQUARE,
} from "../color-swedish-palette";

import { Ionicons } from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="md-home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="SocialChart"
        component={SocialChart}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="md-bar-chart" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="md-search" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="md-person" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
