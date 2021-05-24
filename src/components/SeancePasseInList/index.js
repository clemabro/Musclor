import React, { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import styles from './styles';

const SeancePasseInList = (params) => {
    const [seance, setSeance] = useState("");
    const navigation = useNavigation();

    const goToEditSeance = () => {
        navigation.navigate('EditSeancePasseeScreen', { seance_id: seance.seance_id, seance_passe_id: params.seance.id });
    }

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM seance where seance_id = ?',
                [params.seance.seance_id],
                (tx, results) => {
                    setSeance(results.rows.item(0));
                }
            );
        });
    }, []);
return (
    <Pressable style={styles.container} onPress={goToEditSeance}>
        <Text style={styles.seanceName}>{seance.nom} du {params.seance.date}</Text>
    </Pressable>
)};

export default SeancePasseInList;
