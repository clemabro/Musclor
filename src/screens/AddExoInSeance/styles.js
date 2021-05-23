import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 25,
        marginVertical: 10,
    },
    subtitle: {
        marginHorizontal: 25,
        fontSize: 20,
    },
    label: {
        marginHorizontal: 10,
        marginTop: 20,
        fontSize: 20,
        width: (Dimensions.get('screen').width / 2) - 20,
    },
    inputContainer: {
        marginVertical: 20,
    },
    input: {
        marginHorizontal: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        width: (Dimensions.get('screen').width / 2) - 20,
    },
    picker: {
        marginHorizontal: 25,
    },
    button: {
        backgroundColor: '#1E90FF',
        height: 60,
        width: Dimensions.get('screen').width - 20,
        borderRadius: 30,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;