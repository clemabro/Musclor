import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import CountDown from 'react-native-countdown-component';
import _uniqueId from 'lodash/uniqueId';
import styles from './styles';

const SeanceGoScreen = (params) => {

    const route = useRoute();
    const [seance, setSeance] = useState("");
    const ordre = route.params.ordre;
    const [exo, setExo] = useState("");
    const [isDernierExo, setIsDernierExo] = useState(false);
    const navigation = useNavigation();
    const [buttonName, setButtonName] = useState("Suivant");
    const [seancePasseId, setSeancePasseId] = useState(0);
    const [serie, setSerie] = useState("");
    const [repetition, setRepetition] = useState("");
    const [poids, setPoids] = useState("");

    const [runningDeuxMin, setRunningDeuxMin] = useState(false);
    const [untilDeuxMin, setUntilDeuxMin] = useState(120);
    const [idCountdownDeuxMin, setIdCountdownDeuxMin] = useState("");

    const [runningTroisMin, setRunningTroisMin] = useState(false);
    const [untilTroisMin, setUntilTroisMin] = useState(180);
    const [idCountdownTroisMin, setIdCountdownTroisMin] = useState("");

    const [runningCinqMin, setRunningCinqMin] = useState(false);
    const [untilCinqMin, setUntilCinqMin] = useState(300);
    const [idCountdownCinqMin, setIdCountdownCinqMin] = useState("");
    
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM seance where seance_id = ?',
                [route.params.seance_id],
                (tx, results) => {
                    setSeance(results.rows.item(0));
                }
            );
            tx.executeSql(
                'SELECT * FROM seance_exercice where seance_id = ? and ordre = ?',
                [route.params.seance_id, ordre],
                (tx, results) => {
                    setExo(results.rows.item(0));
                }
            );
            tx.executeSql(
                'SELECT * FROM seance_exercice where seance_id = ?',
                [route.params.seance_id],
                (tx, results) => {
                    if(ordre == results.rows.length) {
                        setIsDernierExo(true);
                        setButtonName("Terminer")
                    }
                }
            );
            if(ordre == 1) {
                tx.executeSql(
                    'INSERT INTO seance_passe (seance_id, date) VALUES (?, date("now"))',
                    [route.params.seance_id],
                    (tx, results) => {
                        setSeancePasseId(results.insertId)
                    }
                );
            } else {
                setSeancePasseId(route.params.seancePasseId);
            }
        });
    }, []);

    const nextExo =() => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO exo_seance_passe (id_seance_passe, exo_id, nomExo, serie, repetition, poids) ' +
                'VALUES (?, ?, ?, ?, ?, ?)',
                [seancePasseId, exo.exo_id, exo.nomExo, serie, repetition, poids],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        if(!isDernierExo) {
                            navigation.push("SeanceGoScreen", {seance_id: seance.seance_id, ordre: ordre + 1, seancePasseId: seancePasseId})
                        } else {
                            navigation.navigate("SeancesPassees");
                        }
                    }
                }
            )
        });
    }

    const countdownDeuxMin = () => {
        if(runningDeuxMin) {
            setUntilDeuxMin(121)
            setIdCountdownDeuxMin(_uniqueId('prefix-'))
            setRunningDeuxMin(false);
        } else {
            setRunningDeuxMin(true);
        }
    }

    const countdownFinishedDeuxMin = () => {
        setUntilDeuxMin(121)
        setIdCountdownDeuxMin(_uniqueId('prefix-'))
        setRunningDeuxMin(false);
        alert("Fini");
    }

    const countdownTroisMin = () => {
        if(runningTroisMin) {
            setUntilTroisMin(181)
            setIdCountdownTroisMin(_uniqueId('prefix-'))
            setRunningTroisMin(false);
        } else {
            setRunningTroisMin(true);
        }
    }

    const countdownFinishedTroisMin = () => {
        setUntilTroisMin(181)
        setIdCountdownTroisMin(_uniqueId('prefix-'))
        setRunningTroisMin(false);
        alert("Fini");
    }

    const countdownCinqMin = () => {
        if(runningCinqMin) {
            setUntilCinqMin(301)
            setIdCountdownCinqMin(_uniqueId('prefix-'))
            setRunningCinqMin(false);
        } else {
            setRunningCinqMin(true);
        }
    }

    const countdownFinishedCinqMin = () => {
        setUntilCinqMin(301)
        setIdCountdownCinqMin(_uniqueId('prefix-'))
        setRunningCinqMin(false);
        alert("Fini");
    }

return (
    <View>
        <Text style={styles.seanceName}>{seance.nom}</Text>
        <Text style={styles.exoName}>{exo.nomExo}</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.label}>Series :</Text>
            <Text style={styles.label}>Répétitions :</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <TextInput
                style={styles.input}
                placeholder="Nb. Séries"
                onChangeText={setSerie}
                value={serie}
                keyboardType="numeric"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Nb. Répétitions"
                onChangeText={setRepetition}
                value={repetition}
                keyboardType="numeric"
            />
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.label}>Poids :</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <TextInput
            style={styles.input}
            placeholder="Poids"
            onChangeText={setPoids}
            value={poids}
            keyboardType="numeric"
        />
        </View>
        <View style={{flexDirection:'row', justifyContent: 'center'}}>
            <CountDown
                id={idCountdownDeuxMin}
                size={20}
                until={untilDeuxMin}
                onFinish={countdownFinishedDeuxMin}
                digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1E90FF'}}
                digitTxtStyle={{color: '#1E90FF'}}
                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: '#1E90FF'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                running={runningDeuxMin}
                onPress={countdownDeuxMin}
                style={{marginHorizontal:10, marginVertical:25}}
            />
            <CountDown
                id={idCountdownTroisMin}
                size={20}
                until={untilTroisMin}
                onFinish={countdownFinishedTroisMin}
                digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1E90FF'}}
                digitTxtStyle={{color: '#1E90FF'}}
                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: '#1E90FF'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                running={runningTroisMin}
                onPress={countdownTroisMin}
                style={{marginHorizontal:10, marginVertical:25}}
            />
            <CountDown
                id={idCountdownCinqMin}
                size={20}
                until={untilCinqMin}
                onFinish={countdownFinishedCinqMin}
                digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1E90FF'}}
                digitTxtStyle={{color: '#1E90FF'}}
                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: '#1E90FF'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                running={runningCinqMin}
                onPress={countdownCinqMin}
                style={{marginHorizontal:10, marginVertical:25}}
            />
        </View>
        <Pressable onPress={nextExo} style={styles.button}>
            <Text style={styles.buttonText}>{buttonName}</Text>
        </Pressable>
    </View>
)};

export default SeanceGoScreen;
