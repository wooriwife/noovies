import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useColorScheme } from "react-native";

import Home from "../screens/Home";
import SocialChart from "../screens/SocialChart";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? "black" : "white",
      }}
    >
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
