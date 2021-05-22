import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 25,
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
        position: 'absolute',
        top: 300,
        zIndex: 100,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        margin: 25,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
});

export default styles;