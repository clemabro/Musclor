import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';

const ExerciceInSeanceList = (params) => {
    const exo = params.exo;
    const seance = params.seance;
    const navigation = useNavigation();
    
    const goToEditExercice = () => {
        navigation.navigate('EditSeanceExercice', {exo_id: exo.exo_id, seance_id: seance.seance_id, ordre: exo.ordre, idSeanceExo: exo.id});
    }

    const deleteExercice = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM seance_exercice where id = ?',
                [exo.id],
                (tx, results) => {
                }
            );
        });

        params.loadSeanceExercice();
    }
return (
    <Pressable style={styles.container} onPress={goToEditExercice}>
        <Text style={styles.seanceName}>{exo.ordre} - {exo.nomExo} - {exo.serie}x{exo.repetition} - {exo.poids}kg</Text>
        <Pressable style={styles.button} onPress={deleteExercice}>
            <AntDesign name="delete" size={30} color="#FF0000" />
        </Pressable>
    </Pressable>
)};

export default ExerciceInSeanceList;
