import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import SeancesScreen from '../screens/Seances';
import HomeTabNavigator from './HomeTabNavigator';
import AddSeanceScreen from '../screens/AddSeance';
import AddExerciceScreen from '../screens/AddExercice';
import EditExerciceScreen from '../screens/EditExercice';
import EditSeanceScreen from '../screens/EditSeance';
import EditSeanceExerciceScreen from '../screens/EditSeanceExercice';
import AddExoInSeanceScreen from '../screens/AddExoInSeance';
import SeanceGoScreen from '../screens/SeanceGo';

const Stack = createStackNavigator();

const Router = (params) => {
return (
    <NavigationContainer>
        <Stack.Navigator>

            <Stack.Screen
                name={"Home"} 
                component={HomeTabNavigator}
                options={{
                    title:"",
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name={"AddSeance"}
                component={AddSeanceScreen}
                options={{
                    title: "",
                }}
            />

            <Stack.Screen
                name={"EditSeance"}
                component={EditSeanceScreen}
                options={{
                    title: "",
                }}
            />

            <Stack.Screen
                name={"AddExercice"}
                component={AddExerciceScreen}
                options={{
                    title: "",
                }}
            />

            <Stack.Screen
                name={"EditExercice"}
                component={EditExerciceScreen}
                options={{
                    title: "",
                }}
            />

            <Stack.Screen
                name={"EditSeanceExercice"}
                component={EditSeanceExerciceScreen}
                options={{
                    title: "",
                }}
            />

            <Stack.Screen
                name={"AddExoInSeance"}
                component={AddExoInSeanceScreen}
                options={{
                    title: "",
                }}
            />

            <Stack.Screen
                name={"SeanceGoScreen"}
                component={SeanceGoScreen}
                options={{
                    title: "",
                }}
            />
            
        </Stack.Navigator>
    </NavigationContainer>
)};

export default Router;
