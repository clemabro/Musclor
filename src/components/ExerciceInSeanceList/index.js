import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'

const ExerciceInSeanceList = (params) => {
    const exo = params.exo;
    const seance = params.seance;

    const navigation = useNavigation();
    const goToEditExercice = () => {
        navigation.navigate('EditSeanceExercice', { param: {exoId: exo.idExo, seanceId: seance.idS}});
    }
return (
    <Pressable style={styles.container} onPress={goToEditExercice}>
        <Text style={styles.seanceName}>{exo.nom} - {exo.serie}x{exo.repetition} - {exo.poids}kg</Text>
    </Pressable>
)};

export default ExerciceInSeanceList;
