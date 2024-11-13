import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import AccountScreen from "../screens/AccountScreen";
import ToolsScreen from "../screens/ToolsScreen";
import HomeScreen from "../screens/HomeScreen";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.button,
                tabBarInactiveTintColor: '#888',
                tabBarStyle: { paddingBottom: 5, height: 60 },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="suitcase" size={size} color={color} />
                    )
                }}

            />
            <Tab.Screen
                name="Profiles"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="user" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Tools"
                component={ToolsScreen}
                options={{
                    tabBarLabel: 'Tools',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo size={size} color={color} name="tools" />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}



export default TabNavigator;