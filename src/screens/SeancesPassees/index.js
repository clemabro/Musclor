import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import SeancePasseInList from '../../components/SeancePasseInList';
import styles from './styles';

const SeancePasseesScreen = (params) => {
    const navigation = useNavigation();
    const [seancesPasseesList, setSeancesPasseesList] = useState([]);

    const loadSeancesPasses = () => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM seance_passe',
            [],
            (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
            }
            setSeancesPasseesList(temp);
            }
          );
        });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadSeancesPasses();
        });
    
        return unsubscribe;
      }, [navigation])
    
return (
    <View style={styles.container}>
        <Text style={styles.title}>Séances passées</Text>
        <FlatList
            style={styles.liste}
            data={seancesPasseesList}
            renderItem={({item, index}) => <SeancePasseInList seance={item} />}
        />
    </View>
)};

export default SeancePasseesScreen;
