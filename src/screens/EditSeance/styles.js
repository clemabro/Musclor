import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 25,
    },
    container: {
        marginTop: 25,
    },
    input: {
        margin: 25,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    containerButton: {
        width: Dimensions.get('screen').width - 20,
        flexDirection: 'row',
        top: 100,
    },
    buttonSave: {
        backgroundColor: '#1E90FF',
        height: 60,
        width: (Dimensions.get('screen').width / 2) - 20,
        borderRadius: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        elevation: 3,
        marginLeft: (Dimensions.get('screen').width / 2)
    },
    buttonDelete: {
        backgroundColor: 'red',
        height: 60,
        width: (Dimensions.get('screen').width / 2) - 20,
        borderRadius: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        elevation: 3,
    },
    buttonStart: {
        backgroundColor: 'green',
        height: 60,
        width: Dimensions.get('screen').width - 20,
        marginHorizontal: 10,
        bottom: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerListe: {
        height: 250,
        margin: 25,
    },
});

export default styles;