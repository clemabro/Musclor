import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './styles';
import feed from '../../../assets/data/feedExo';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Entypo from 'react-native-vector-icons/Entypo'
import {useNavigation} from '@react-navigation/native';
import ExerciceInList from '../../components/ExerciceInList';

const ExercicesScreen = (params) => {
    const navigation = useNavigation();
return(
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('AddExercice')}>
            <Entypo name="add-to-list" size={35} color="#1E90FF" />
        </Pressable>
        <Text style={styles.title}>Exercices</Text>
        <FlatList 
            style={styles.liste}
            data={feed}
            renderItem={({item}) => <ExerciceInList exo={item} />}
        />
    </View>
)};

export default ExercicesScreen;
