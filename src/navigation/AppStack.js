import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import DoctorDetail from "../screens/DoctorDetail";
import Appointment from "../screens/Appointment";
import EditProfile from "../screens/EditProfile";
import MyAppointments from "../screens/MyAppointments";


const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeDrawer" component={DrawerNavigator} />
      <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
    </Stack.Navigator>
  );
}