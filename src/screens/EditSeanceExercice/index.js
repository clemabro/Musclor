import React, { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from './styles';
import feed from '../../../assets/data/feed';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditSeanceExerciceScreen = (params) => {
    const route = useRoute();
    const navigation = useNavigation();

    const seance = feed.find(s => s.idS === route.params.seanceId);
    const exo = seance.exercices.find(exo => exo.idExo === route.params.exoId);

    const [serie, setSerie] = useState(exo.serie);
    const [repetition, setRepetition] = useState(exo.repetition);
    const [poids, setPoids] = useState(exo.poids);

    const saveExercice = () => {
        console.warn(exerciceToSave);
        navigation.navigate("Exercices")
    }
    
    const deleteExercice = () => {
        navigation.navigate("Exercices")
    }

    
return (
    <View>
        <Text style={styles.title}>{exo.nom}</Text>
        <TextInput
            style={styles.input}
            placeholder="Serie"
            onChangeText={setSerie}
            value={serie}
            keyboardType="numeric"
        />
        <TextInput
            style={styles.input}
            placeholder="Répétition"
            onChangeText={setRepetition}
            value={repetition}
            keyboardType="numeric"
        />
        <TextInput
            style={styles.input}
            placeholder="Poids"
            onChangeText={setPoids}
            value={poids}
            keyboardType="numeric"
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

export default EditSeanceExerciceScreen;
