import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import SeanceInList from '../../components/SeanceInList';
import styles from './styles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Entypo from 'react-native-vector-icons/Entypo'
import {useNavigation} from '@react-navigation/native';

const SeancesScreen = (params) => {
    const navigation = useNavigation();
    const [seancesList, setSeancesList] = useState([]);

    const loadSeances = () => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM seance',
            [],
            (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
            }
            setSeancesList(temp);
            }
          );
        });
    };

    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='seance'",
            [],
            function (tx, res) {
              console.warn('seance:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS seance', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS seance(seance_id INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR(50))',
                  []
                );
              }
            }
          );
        });
      }, []);

      useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='exercice'",
            [],
            function (tx, res) {
              console.warn('exercice:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS exercice', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS exercice(exercice_id INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR(50))',
                  []
                );
              }
            }
          );
        });
      }, []);

      useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='seance_exercice'",
            [],
            function (tx, res) {
              console.warn('seance_exercice:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS seance_exercice', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS seance_exercice' + 
                  '(seance_id INTEGER, '+ 
                  'exo_id INTEGER, nomExo TEXT, ' +
                  'ordre TEXT, serie TEXT, repetition TEXT, poids TEXT, PRIMARY KEY (seance_id, exo_id))',
                  []
                );
              }
            }
          );
        });
      }, []);

      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadSeances();
        });
    
        return unsubscribe;
      }, [navigation])

return(
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('AddSeance')}>
            <Entypo name="add-to-list" size={35} color="#1E90FF" />
        </Pressable>
        <Text style={styles.title}>Séances</Text>
        <FlatList
            style={styles.liste}
            data={seancesList}
            renderItem={({item, index}) => <SeanceInList seance={item} />}
        />
    </View>
)};

export default SeancesScreen;
