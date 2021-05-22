import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import ExerciceInSeanceList from '../../components/ExerciceInSeanceList';
import styles from './styles';

const EditSeanceScreen = (params) => {
    const route = useRoute();
    const navigation = useNavigation();

    const [seanceToSave, setSeanceToSave] = useState("");
    const [exercices, setExercices] = useState([]);
    const [seanceName, setSeanceName] = useState("");

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM seance where seance_id = ?',
                [route.params.seanceId],
                (tx, results) => {
                    setSeanceToSave(results.rows.item(0));
                    setSeanceName(results.rows.item(0).nom)
                }
            );
        });
    }, []);
    
    db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM seance_exercice where seance_id = ?',
          [route.params.seanceId],
          (tx, results) => {
                var temp = [];
                for (const seance_exo of results) {
                    tx.executeSql(
                        'SELECT * FROM exercice where exercice_id = ?', 
                        seance_exo.exercice_id, (tx, results) => {
                            temp.push(results.rows.item(0));
                        })
                }
                setExercices(temp);
          }
        );
    });

    const saveExercice = () => {
        seanceToSave.nom = seanceName;
        db.transaction((tx) => {
            tx.executeSql(
              'UPDATE seance SET nom = ? WHERE seance_id = ?',
              [seanceToSave.nom, seanceToSave.seance_id],
              (tx, results) => {
                    
              }
            );
        });
        navigation.navigate("Seances")
    }
    
    const deleteExercice = () => {
        db.transaction((tx) => {
            tx.executeSql(
              'DELETE FROM seance WHERE seance_id = ?',
              [seanceToSave.seance_id],
              (tx, results) => {
                    
              }
            );
        });

        navigation.navigate("Seances")
    }  
return(
    <View>
        <Text style={styles.title}>{seanceToSave.nom}</Text>
        <TextInput
            style={styles.input}
            placeholder="Nom séance"
            onChangeText={setSeanceName}
            value={seanceName}
        />
        <View style={styles.containerListe}>
            <FlatList 
                style={styles.liste}
                data={exercices}
                renderItem={({item}) => <ExerciceInSeanceList exo={item} seance={seanceToSave} />}
            />
        </View>
        
        <View style={styles.containerButton}>
            <Pressable style={styles.buttonStart} onPress={deleteExercice}>
                <Text style={styles.buttonText}>Commencer</Text>
            </Pressable>
            <Pressable style={styles.buttonDelete} onPress={deleteExercice}>
                <Text style={styles.buttonText}>Suppimer</Text>
            </Pressable>
            <Pressable style={styles.buttonSave} onPress={saveExercice}>
                <Text style={styles.buttonText}>Sauvegarder</Text>
            </Pressable>
        </View>
    </View>
)};

export default EditSeanceScreen;
