import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import ExercicePasseeInSeancePasseeList from '../../components/ExercicePasseeInSeancePasseeLIst';
import styles from './styles';

const EditSeancePasseeScreen = (params) => {
    const route = useRoute();

    const [seance, setSeance] = useState("");
    const [seancePassee, setSeancePassee] = useState("");
    const [exercices, setExercices] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM seance where seance_id = ?',
                [route.params.seance_id],
                (tx, results) => {
                    setSeance(results.rows.item(0));
                }
            );

            tx.executeSql(
                'SELECT * FROM seance_passe where id = ?',
                [route.params.seance_passe_id],
                (tx, results) => {
                    setSeancePassee(results.rows.item(0));
                }
            );

            tx.executeSql(
                'SELECT * FROM exo_seance_passe where id_seance_passe = ?',
                [route.params.seance_passe_id],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setExercices(temp);
                }
            );
        });
    }, []);
return(
    <View>
        <Text style={styles.title}>{seance.nom} le {seancePassee.date}</Text>
        <View style={styles.containerListe}>
            <FlatList 
                style={styles.liste}
                data={exercices}
                renderItem={({item}) => <ExercicePasseeInSeancePasseeList exo={item} seance={seance} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    </View>
)};

export default EditSeancePasseeScreen;
