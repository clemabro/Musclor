import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './styles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Entypo from 'react-native-vector-icons/Entypo'
import {useNavigation} from '@react-navigation/native';
import ExerciceInList from '../../components/ExerciceInList';

const ExercicesScreen = (params) => {
    const navigation = useNavigation();

    const [exercices, setExerices] = useState([]);


    db.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM exercice',
        [],
        (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
            }
            setExerices(temp);
        }
        );
    });
return(
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('AddExercice')}>
            <Entypo name="add-to-list" size={35} color="#1E90FF" />
        </Pressable>
        <Text style={styles.title}>Exercices</Text>
        <FlatList 
            style={styles.liste}
            data={exercices}
            renderItem={({item}) => <ExerciceInList exo={item} />}
        />
    </View>
)};

export default ExercicesScreen;
