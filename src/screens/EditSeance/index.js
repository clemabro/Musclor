import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import ExerciceInSeanceList from '../../components/ExerciceInSeanceList';
import Entypo from 'react-native-vector-icons/Entypo'
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
    
    loadSeanceExercice = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM seance_exercice where seance_id = ? order by ordre',
                [route.params.seanceId],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setExercices(temp);
                }
            );
        });
    }
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
                'DELETE FROM seance_exercice WHERE seance_id = ?',
                [seanceToSave.seance_id],
                (tx, results) => {
                      
                }
              );
            tx.executeSql(
              'DELETE FROM seance WHERE seance_id = ?',
              [seanceToSave.seance_id],
              (tx, results) => {
                    
              }
            );
        });

        navigation.navigate("Seances")
    } 

    const navigateToAddExoInSeance = () => {
        navigation.navigate('AddExoInSeance', {seance_id: seanceToSave.seance_id, loadSeanceExercice: loadSeanceExercice})
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadSeanceExercice();
        });
    
        return unsubscribe;
      }, [navigation])

      const goToSeanceGo = () => {
        navigation.navigate("SeanceGoScreen", {seance_id: seanceToSave.seance_id, ordre: 1})
      }
return(
    <View>
        <Pressable style={styles.button} onPress={navigateToAddExoInSeance}>
            <Entypo name="add-to-list" size={35} color="#1E90FF" />
        </Pressable>
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
                renderItem={({item}) => <ExerciceInSeanceList exo={item} seance={seanceToSave} loadSeanceExercice={loadSeanceExercice}/>}
            />
        </View>
        
        <View style={styles.containerButton}>
            <Pressable style={styles.buttonStart} onPress={goToSeanceGo}>
                <Text style={styles.buttonText}>Commencer</Text>
            </Pressable>
            <View style={{flexDirection: 'row'}}>
                <Pressable style={styles.buttonDelete} onPress={deleteExercice}>
                    <Text style={styles.buttonText}>Suppimer</Text>
                </Pressable>
                <Pressable style={styles.buttonSave} onPress={saveExercice}>
                    <Text style={styles.buttonText}>Sauvegarder</Text>
                </Pressable>
            </View>
        </View>
    </View>
)};

export default EditSeanceScreen;
