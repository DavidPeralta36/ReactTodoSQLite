import React from 'react'
import { 
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity
  } from "react-native";
import { Icon } from '@rneui/themed';
import AwesomeAlert from 'react-native-awesome-alerts';

const TodoInput = ({añadirtexto, text, sendText, todas2, noActivas}) => {
    
  return (
    <View style={styles.flexRow}>
        <View style={styles.inputView}>
          <TextInput
            style={{color:"#fff"}}
            placeholder="Nueva tarea..."
            placeholderTextColor="white"
            onChangeText={(text) => añadirtexto(text)}
            value={text}
          />
          <View style={styles.taskBtn}>
            <Icon
              onPress={() => {
                sendText()
                todas2()
                noActivas()
                }}
              name='check'
              type="font-awesome"
              size={15}
              reverse
              color= '#9F8772'
              />
          </View>
        </View>   
    </View>
   )
}
const styles = StyleSheet.create({
    flexRow: {
      flexDirection: "row",
      paddingLeft:45,
      marginTop:30,
      marginBottom:20
    },
    input: {
      borderColor: "#815B5B",
      borderRadius: 4,
      borderWidth: 1,
      flex: 1,
      height: 48,
      margin: 16,
      padding: 8,
    },
    inputView: {
      backgroundColor: "#9E7676",
      borderRadius: 10,
      width: 210,
      height: 50,
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection:"row",
      paddingLeft:20
    },
    taskBtn: {
      width: 50,
      borderRadius: 10,
      height: 50,
      backgroundColor: "#9F8772",
      marginLeft:10,
      position:"absolute",
      right:-60

    },
    listArea: {
      backgroundColor: "#f0f0f0",
      flex: 1,
      paddingTop: 16,
    },
    sectionContainer: {
      marginBottom: 16,
      marginHorizontal: 16,
    },
    sectionHeading: {
      fontSize: 18,
      marginBottom: 8,
    },
  });

export default TodoInput