import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditSeanceExerciceScreen = (params) => {
    const route = useRoute();
    const navigation = useNavigation();

    const [exoNom, setExoNom] = useState("");
    const [repetitions, setRepetitions] = useState("");
    const [series, setSeries] = useState("");
    const [poids, setPoids] = useState("");
    const [ordre, setOrdre] = useState("");
    const [seanceName, setSeanceName] = useState("");

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM seance_exercice WHERE id = ?',
            [route.params.idSeanceExo],
            (tx, results) => {
                setExoNom(results.rows.item(0).nomExo);

                setRepetitions(results.rows.item(0).repetition);
                setSeries(results.rows.item(0).serie);
                setPoids(results.rows.item(0).poids);
                setOrdre(results.rows.item(0).ordre);
            }
            );
        });
    }, [exoNom]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM seance where seance_id = ?',
                [route.params.seance_id],
                (tx, results) => {
                    setSeanceName(results.rows.item(0).nom)
                }
            );
        });
    }, []);

    const saveExercice = () => {
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE seance_exercice ' + 
                'SET ordre = ?, serie = ?, repetition = ?, poids = ? ' + 
                'WHERE id = ?',
                [ordre, series, repetitions, poids, route.params.idSeanceExo],
                (tx, results) => {
                    console.log('UPDATE seance_exercice', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        navigation.goBack();
                    } else alert('Save Failed');
                }
            );
        });
    }
    
    const deleteExercice = () => {

        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM seance_exercice where id = ?',
                [route.params.idSeanceExo],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        navigation.goBack();
                    }
                }
            );
        });
    }

    
return (
    <View>
        <Text style={styles.title}>{seanceName}</Text>
        <Text style={styles.title}>{exoNom}</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.label}>Series :</Text>
            <Text style={styles.label}>Répétitions :</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <TextInput
                style={styles.input}
                placeholder="Nb. Séries"
                onChangeText={setSeries}
                value={series}
                keyboardType="numeric"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Nb. Répétitions"
                onChangeText={setRepetitions}
                value={repetitions}
                keyboardType="numeric"
            />
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.label}>Poids :</Text>
            <Text style={styles.label}>Ordre :</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <TextInput
            style={styles.input}
            placeholder="Poids"
            onChangeText={setPoids}
            value={poids}
            keyboardType="numeric"
        />
        
        <TextInput
            style={styles.input}
            placeholder="Ordre"
            onChangeText={setOrdre}
            value={ordre}
            keyboardType="numeric"
        />
        </View>
        <View style={styles.containerButton}>
            <Pressable style={styles.buttonDelete} onPress={deleteExercice}>
                <Text style={styles.buttonText}>Suppimer</Text>
            </Pressable>
            <Pressable style={styles.buttonSave} onPress={saveExercice}>
                <Text style={styles.buttonText}>Sauvegarder</Text>
            </Pressable>
        </View>
    </View>
)};

export default EditSeanceExerciceScreen;
