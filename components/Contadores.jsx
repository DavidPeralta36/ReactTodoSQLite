
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";


const Contadores = ({total2, activas, nActivas}) => {
  return (
    <View style={styles.contadoresArea}>
          <View style={styles.contador}>
            <Text style={styles.contadoresText} >Total tareas:</Text>
            <Text style={styles.contadoresNum1} >{total2}</Text>
          </View>
          <View style={styles.contador}>
            <Text style={styles.contadoresText} >Total de tareas por completar:</Text>
            <Text style={styles.contadoresNum3} >{nActivas}</Text>
          </View>
          <View style={styles.contador}>
            <Text style={styles.contadoresText} >Total de tareas completadas:</Text>
            <Text style={styles.contadoresNum2} >{activas}</Text>
          </View>
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF8EA",
      flex: 1,
      paddingTop: Constants.statusBarHeight +15,
      width:"100%"
    },
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color:"#594545"
    },
    heading2: {
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center",
      color:"#594545"
    },
    listArea: {
      backgroundColor: "#FFF8EA",
      flex: 1,
      paddingTop: 16,
      paddingLeft:35
    },
    contadoresArea:{
      marginLeft:48,
      marginTop:15,
    },
    contador:{
      flexDirection:"row"
    },
    contadoresText:{
      color:"#594545",
      fontSize:16,
      fontWeight:"bold"
    },
    contadoresNum1:{
      color:"#594545",
      fontSize:22,
      fontWeight:"bold",
      marginTop:-2,
      paddingLeft:150
    },
    contadoresNum2:{
      color:"#594545",
      fontSize:22,
      fontWeight:"bold",
      marginTop:-2,
      paddingLeft:27
    },
    contadoresNum3:{
      color:"#594545",
      fontSize:22,
      fontWeight:"bold",
      marginTop:-2,
      paddingLeft:15
      
    }
  
  });

export default Contadores