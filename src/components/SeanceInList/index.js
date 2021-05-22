import React from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import styles from './styles';

const SeanceInList = (params) => {
    const seance = params.seance
    const navigation = useNavigation();
    const goToEditSeance = () => {
        navigation.navigate('EditSeance', { seanceId: seance.seance_id });
    }
return (
    <Pressable style={styles.container} onPress={goToEditSeance}>
        <Text style={styles.seanceName}>{seance.nom}</Text>
    </Pressable>
)};

export default SeanceInList;
