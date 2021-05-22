import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles.js';

const AddExerciceScreen = (params) => {
    const navigation = useNavigation();
    const [exerciceToSave, setExerciceToSave] = useState("");
    const createExercice = () => {
        console.warn(exerciceToSave);
        navigation.navigate("Exercices")
    }
return(
    <View style={styles.container}>
        <Text style={styles.title}>Créer un exercice</Text>
        <TextInput
            style={styles.input}
            placeholder="Nom exercice"
            onChangeText={setExerciceToSave}
            value={exerciceToSave}
        />
        <Pressable style={styles.button} onPress={createExercice}>
            <Text style={styles.buttonText}>Ajouter</Text>
        </Pressable>
    </View>
)};

export default AddExerciceScreen;
