import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';

const AddSeanceScreen = (params) => {
    const navigation = useNavigation();
    const [seanceToSave, setSeanceToSave] = useState("");

    const createSeance = () => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO seance (nom) VALUES (?)',
                [seanceToSave],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        navigation.navigate("Seances")
                    } else alert('Save Failed');
                }
            );
        });
    };
        
    
return(
    <View>
        <Text style={styles.title}>Créer une séance</Text>
        <TextInput
            style={styles.input}
            placeholder="Nom séance"
            onChangeText={setSeanceToSave}
            value={seanceToSave}
        />
        <Pressable style={styles.button} onPress={createSeance}>
            <Text style={styles.buttonText}>Ajouter</Text>
        </Pressable>
    </View>
)};

export default AddSeanceScreen;
