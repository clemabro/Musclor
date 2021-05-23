import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';

const ExerciceInSeanceList = (params) => {
    const exo = params.exo;
    const seance = params.seance;
    const navigation = useNavigation();
    console.log(exo)
    const goToEditExercice = () => {
        navigation.navigate('EditSeanceExercice', { param: {exoId: exo.exo_id, seanceId: seance.seance_id}});
    }

    const deleteExercice = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM seance_exercice where exo_id = ? and seance_id = ?',
                [exo.exo_id, seance.seance_id],
                (tx, results) => {
                }
            );
        });

        params.loadSeanceExercice();
    }
return (
    <Pressable style={styles.container} onPress={goToEditExercice}>
        <Text style={styles.seanceName}>{exo.nomExo} - {exo.serie}x{exo.repetition} - {exo.poids}kg</Text>
        <Pressable style={styles.button} onPress={deleteExercice}>
            <AntDesign name="delete" size={30} color="#FF0000" />
        </Pressable>
    </Pressable>
)};

export default ExerciceInSeanceList;
