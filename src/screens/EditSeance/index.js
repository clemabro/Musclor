import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import ExerciceInSeanceList from '../../components/ExerciceInSeanceList';
import styles from './styles';

const EditSeanceScreen = (params) => {
    const route = useRoute();
    const navigation = useNavigation();

    const [seanceToSave, setSeanceToSave] = useState("");
    const [exercices, setExercices] = useState([]);

    db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM seance where seance_id = ?',
          [route.params.seanceId],
          (tx, results) => {
            setSeanceToSave(results.rows.item(0));
          }
        );
    });

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
        console.warn(seanceToSave);
        navigation.navigate("Seances")
    }
    
    const deleteExercice = () => {
        navigation.navigate("Seances")
    }  
return(
    <View>
        <Text style={styles.title}>{seanceToSave.nom}</Text>
        <TextInput
            style={styles.input}
            placeholder="Nom séance"
            onChangeText={setSeanceToSave}
            value={seanceToSave.nom}
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
