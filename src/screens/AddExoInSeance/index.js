import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddExoInSeanceScreen = (params) => {
    const route = useRoute();
    const [seanceToSave, setSeanceToSave] = useState("");
    const [series, setSeries] = useState("");
    const [repetitions, setRepetitions] = useState("");
    const [poids, setPoids] = useState("");
    const [ordre, setOrdre] = useState("");
    const [exercices, setExercices] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [exo, setExo] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM seance where seance_id = ?',
                [route.params.seance_id],
                (tx, results) => {
                    setSeanceToSave(results.rows.item(0));
                }
            );
        });
    }, []);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM exercice',
            [],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                setExercices(temp);
            }
            );
        });
    }, [exercices]);

    const ajouterExercice = () => {
        
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM exercice where exercice_id = ?',
                [selectedValue],
                (tx, results) => {
                    console.log(poids)
                    tx.executeSql(
                        'INSERT INTO seance_exercice VALUES (?,?,?,?,?,?,?)',
                        [seanceToSave.seance_id, selectedValue, results.rows.item(0).nom, ordre, series, repetitions, poids],
                        (tx, results) => {
                            console.log('INSERT INTO seance_exercice', results.rowsAffected);
                            if (results.rowsAffected > 0) {
                                navigation.goBack();
                            } else alert('Save Failed');
                        }
                    );

                }
            );
        });
    }
return (
    <View>
        <Text style={styles.title}>Ajouter un exercice</Text>
        <Text style={styles.subtitle}>{seanceToSave.nom}</Text>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Exercices :</Text>
            <Picker 
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={styles.picker}
            >
                {
                    exercices.map((item, index) => {
                        return (<Picker.Item label={item.nom} value={item.exercice_id} key={item.exercice_id} />);
                    })
                }
            </Picker>
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
            
        </View>
        
        <Pressable style={styles.button} onPress={ajouterExercice}>
            <Text style={styles.buttonText}>Ajouter</Text>
        </Pressable>
    </View>
)};

export default AddExoInSeanceScreen;
