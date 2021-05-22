import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'

const ExerciceInList = (params) => {
    const exo = params.exo;
    const navigation = useNavigation();
    const goToEditExercice = () => {
        navigation.navigate('EditExercice', { exoId: exo.id });
    }
return (
    <Pressable style={styles.container} onPress={goToEditExercice}>
        <Text style={styles.seanceName}>{exo.nom}</Text>
    </Pressable>
)};

export default ExerciceInList;
