import Colors from "../constants/Colors";
import ExportCVScreen from "../screens/ExportCVScreen";
import JobDetailScreen from "../screens/JobDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SalaryConverter from "../screens/SalaryScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DrawerNavigator from "./DrawerNavigator";
import UserDetailScreen from "../screens/UserDetailScreen";
import EditUserScreen from "../screens/EditUserScreen";
import TabNavigator from "./TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
function MainNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: Colors.button,
            },
            headerTitleAlign: "center",
            headerTitleStyle:{
                color: Colors.txtField
            }
        }}>
            <Stack.Screen
                name='Drawer'
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='JobDetail' component={JobDetailScreen}
             />
            <Stack.Screen name="CV" component={ExportCVScreen} 
                options={{
                    headerTitle: 'Update or Create Your CV'
                }}
            />
            <Stack.Screen name="Salary" component={SalaryConverter}
            />
            <Stack.Screen name="UserDetail" component={UserDetailScreen}/>
            <Stack.Screen name="EditUser" component={EditUserScreen}/>
        </Stack.Navigator>
    )
}



export default MainNavigator;