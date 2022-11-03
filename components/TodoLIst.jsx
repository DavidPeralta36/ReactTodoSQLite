import { useState,useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { CheckBox } from '@rneui/themed';
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


function openDatabase() {
    const db = SQLite.openDatabase("db.db");
    return db;
  }

const db = openDatabase();

const TodoList = ({ done: doneHeading, onPressItem , Bactivas,noActivas, todas2}) => {

  const [items, setItems] = useState(null);
  useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql(
      `select * from itemsT where done = ?;`,
      [doneHeading ? 1 : 0],
      (_, { rows: { _array } }) => setItems(_array)
    );
  });
  }, []);
  
  const heading = doneHeading ? "Completadas" : "No Completadas";

  if (items === null || items.length === 0) {
    return null;
  }
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
          {
            items.map(({id, done, value}) => (
              <View key={id} style={!done? styles.taskContainer : styles.taskContainerDes}>
                <CheckBox
                  center
                  checked={done}
                  onPress={() => {
                    onPressItem && onPressItem(id)
                    Bactivas()
                    noActivas()
                    todas2()
                  }}
                  containerStyle ={(!done)? styles.checkbox : styles.checkboxDes}
                  uncheckedColor={'#FFF8EA'}
                  checkedColor={'#78281F'}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
                <Text style={done? styles.tarea2 : styles.tarea}>{value}</Text>
              </View>
            ))
          }
     </View>
  )
}
const styles = StyleSheet.create({
  taskContainer:{
    flexDirection: "row",
    width: 270,
    height: 50,
    backgroundColor: "#815B5B",
    marginLeft:-5,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom:10
  },
  taskContainerDes:{
    flexDirection: "row",
    width: 270,
    height: 50,
    backgroundColor: "#665A48",
    marginLeft:-5,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom:10
  },
  tarea:{
    color:"#fff",
    marginLeft:-10,
  },
  tarea2:{
    color:"#47250C",
    marginLeft:-10,
    textDecorationLine:"line-through"
  },
  checkbox:{
    backgroundColor:"#815B5B",
    height:50,
    paddingTop:13
  },
  checkboxDes:{
    backgroundColor:"#665A48",
    height:50,
    paddingTop:13
  },
    sectionContainer: {
      marginBottom: 16,
      marginHorizontal: 16,
    },
    sectionHeading: {
      fontSize: 18,
      marginBottom: 8,
      color:'#594545',
      fontWeight:"bold"
    },
  });
export default TodoList