import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useColorScheme } from "react-native";

import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
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
      screenOptions={{ unmountOnBlur: true }}
    >
      <Tab.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name="md-film-outline" color={color} size={size} />
            );
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="md-tv-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name="md-search-outline" color={color} size={size} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
