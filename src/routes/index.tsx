import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import Home from "../pages/Home";
import Scanner from "../pages/Scanner";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          headerShown: true,
          headerTitle: "Voltar",
          headerTintColor:'#fff',
          headerStyle: {
            backgroundColor: "#fe563f",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
