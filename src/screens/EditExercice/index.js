import React, { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from './styles';
import exos from '../../../assets/data/feedExo';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditExerciceScreen = (params) => {
    const route = useRoute();
    const navigation = useNavigation();

    const exo = exos.find(exo => exo.id === route.params.exoId);

    const [exerciceToSave, setExerciceToSave] = useState(exo.nom);

    const saveExercice = () => {
        console.warn(exerciceToSave);
        navigation.navigate("Exercices")
    }
    
    const deleteExercice = () => {
        navigation.navigate("Exercices")
    }

    
return (
    <View>
        <Text style={styles.title}>Modifier un exercice</Text>
        <TextInput
            style={styles.input}
            placeholder="Nom exercice"
            onChangeText={setExerciceToSave}
            value={exerciceToSave}
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
