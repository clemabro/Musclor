import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SeancesScreen from '../screens/Seances';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import ExercicesScreen from '../screens/Exercices';
import SeancePasseesScreen from '../screens/SeancesPassees';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = ({
    params,
}) => (
    <Tab.Navigator>
        <Tab.Screen 
            name={"Seances"}
            component={SeancesScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <Feather name="book-open" size={25} color={color} />
                )
            }}
        />
        <Tab.Screen 
            name={"Exercices"}
            component={ExercicesScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="dumbbell" size={25} color={color} />
                )
            }}
        />
        <Tab.Screen 
            name={"Séances passées"}
            component={SeancePasseesScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <Entypo name="calendar" size={25} color={color} />
                )
            }}
        />
    </Tab.Navigator>
);

export default HomeTabNavigator;
