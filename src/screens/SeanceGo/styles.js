import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    seanceName: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    exoName: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#1E90FF',
        height: 60,
        width: Dimensions.get('screen').width - 20,
        marginHorizontal: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        elevation: 3,
        marginVertical: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginHorizontal: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        width: (Dimensions.get('screen').width / 2) - 20,
    },
    label: {
        marginHorizontal: 10,
        marginTop: 20,
        fontSize: 20,
        width: (Dimensions.get('screen').width / 2) - 20,
    },
});

export default styles;