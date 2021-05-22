import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditExerciceScreen = (params) => {
    const route = useRoute();
    const navigation = useNavigation();

    const [exerciceName, setExerciceName] = useState("");

    const [exerciceToSave, setExerciceToSave] = useState("");

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM exercice where exercice_id = ?',
                [route.params.exoId],
                (tx, results) => {
                    setExerciceToSave(results.rows.item(0));
                    setExerciceName(results.rows.item(0).nom)
                }
            );
        });
    }, []);

    const saveExercice = () => {
        exerciceToSave.nom = exerciceName;

        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE exercice SET nom = ? where exercice_id = ?',
                [exerciceToSave.nom, exerciceToSave.exercice_id],
                (tx, results) => {
                }
            );
        });

        navigation.navigate("Exercices")
    }
    
    const deleteExercice = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM exercice where exercice_id = ?',
                [exerciceToSave.exercice_id],
                (tx, results) => {
                }
            );
        });
        navigation.navigate("Exercices")
    }

    
return (
    <View>
        <Text style={styles.title}>Modifier un exercice</Text>
        <TextInput
            style={styles.input}
            placeholder="Nom exercice"
            onChangeText={setExerciceName}
            value={exerciceName}
        />
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

export default EditExerciceScreen;
