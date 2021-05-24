import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const ExercicePasseeInSeancePasseeList = (params) => {
    const exo = params.exo;
return (
    <View>
        <Text style={styles.seanceName}>{exo.nomExo} - {exo.serie}x{exo.repetition} - {exo.poids}kg</Text>
    </View>
)};

export default ExercicePasseeInSeancePasseeList;
