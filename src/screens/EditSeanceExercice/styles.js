import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 25,
        marginVertical: 10,
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
        top: 200,
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
        top: 200,
        zIndex: 100,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        marginHorizontal: 10,
        marginTop: 20,
        fontSize: 20,
        width: (Dimensions.get('screen').width / 2) - 20,
    },
    input: {
        marginHorizontal: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        width: (Dimensions.get('screen').width / 2) - 20,
    },
});

export default styles;