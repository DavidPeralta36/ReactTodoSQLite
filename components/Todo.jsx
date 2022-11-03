import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import TodoList from "./TodoLIst";
import TodoInput from "./TodoInput";
import Contadores from "./Contadores";
import AwesomeAlert from 'react-native-awesome-alerts';

function openDatabase() {
  const db = SQLite.openDatabase("db.db");
  return db;
}
const db = openDatabase();

export default function Todo() {
  //#region estados
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [total, setTotal] = useState(0);
  const [total2, setTotal2] = useState(0)
  const [activas, setActivas] = useState(0);
  const [nActivas, setNoActivas] = useState(0)
  const [cargando, setCargando] = useState(true)
  //#endregion
  
  //#region alerta
  const [oculto, setOculto] = useState(true)
  const [oculto2, setOculto2] = useState(true)

  const showAlert = () => {
    setOculto(false)
  };
  const hideAlert = () => {
    setOculto(true)
  };

  const showAlert2 = () => {
      setOculto2(false)
      setTimeout(cargando2, 1000)
      setTimeout(hideAlert2, 1500)
      setCargando(true)
    };
  const hideAlert2 = () => {
    setOculto2(true)
  };
  const cargando2 = () => {
    setCargando(false)
  }

//#endregion

  //#region funciones

  //creacion de la tabla
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists itemsT (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  //insert en db
  const add = (text) => {
    
    // is text empty?
    if (text === null || text === "") {
      showAlert()
      return false;
    }
    else{
      showAlert2()
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into itemsT (done, value) values (0, ?)", [text]);
        tx.executeSql("select * from itemsT", [], (_, { rows }) =>
        {
          setTotal(rows.length) 
        }
          
        );
      },
      null,
      forceUpdate
    );
  };
  useEffect(() => {
    console.log(total + " useEffect");
    
  }, [total]);
  //select de tareas activas
  const Bactivas = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from itemsT where done = 1", [], (_, { rows }) =>
        {
          setActivas(rows.length) 
        }
        );
      },
      null,
      forceUpdate
    );
  }
  useEffect(() => {
    console.log(activas + " useEffect activas");
    
  }, [activas]);
  //select de tareas completadas
  const noActivas = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from itemsT where done = 0", [], (_, { rows }) =>
        {
          setNoActivas(rows.length) 
        }
        );
      },
      null,
      forceUpdate
    );
  }
  useEffect(() => {
    console.log(nActivas + " useEffect activas");
    
  }, [nActivas]);
  //select sencillo
  const todas2 = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from itemsT", [], (_, { rows }) =>
        {
          setTotal2(rows.length)
        }
        );
      },
      null,
      forceUpdate
    );
  }
  useEffect(() => {
    console.log(total2 + " useEffect activas");
    
  }, [total2]);
  //update de estado de la tarea
  const actualizar = (id) =>{
    db.transaction(
        (tx) => {
          tx.executeSql(`update itemsT set done = 1 where id = ?;`, [
            id,
          ]);
        },
        null,
        forceUpdate
      )
  }
  //delete
  const eliminar = (id) => {
    db.transaction(
        (tx) => {
          tx.executeSql(`delete from itemsT where id = ?;`, [id]);
        },
        null,
        forceUpdate
      )
  }
  const añadirtexto = (text) => {
    setText(text)
  }
  const sendText = () => {
    add(text);
    setText(null);
  }
  
  const deletee = (done) => {
    db.transaction(
        (tx) => {
          tx.executeSql(`delete from itemsT where done = 1;`, [done]);
        },
        null,
        forceUpdate
      )
  }
  //#endregion

  useEffect(() => {
    todas2();
    Bactivas();
    noActivas();
  }, [])
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ToDo hecho en React Native</Text>
      <Text style={styles.heading2}>Usando SQLite</Text>
      <>
        <TodoInput añadirtexto={añadirtexto} text={text} sendText={sendText} todas2={todas2} noActivas={noActivas} />
        
        <Contadores total2={total2} activas={activas} nActivas={nActivas}/>

        <ScrollView style={styles.listArea}>
          <TodoList
            key={`forceupdate-todo-${forceUpdateId}`}
            done={false}
            onPressItem={(id) => actualizar(id)}
            Bactivas= {Bactivas} noActivas={noActivas} todas2={todas2}
          />
          <TodoList
            done
            key={`forceupdate-done-${forceUpdateId}`}
            onPressItem={(id) =>
              eliminar(id)
            }
            Bactivas= {Bactivas} noActivas={noActivas} todas2={todas2}
          />
        </ScrollView>
        <View style={styles.bottomView}>
            <TouchableOpacity onPress={()=> console.log("Eliminados")} style={styles.deleteBtn}>
                <Text style={{color:"#FFF"}} >Borrar completados </Text>
            </TouchableOpacity>
        </View>
        <>
          <AwesomeAlert
            show={oculto?false : true}
            contentContainerStyle={styles.alertaC}
            title="Oops.."
            titleStyle={styles.titleC}
            message="Necesitas agregar una tarea"
            messageStyle={styles.msgeT}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Entendido"
            confirmButtonStyle={styles.buntonC}
            confirmButtonColor="#A3C7D6"
            onConfirmPressed={() => {
              hideAlert();
            }}
          /> 
          <AwesomeAlert
            show={oculto2?false : true}
            contentContainerStyle={styles.alertaC2}
            showProgress={cargando? true : false}
            title={cargando?"Guardando":"Guardado"}
            titleStyle={styles.titleC}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            progressColor="#594545"
          /> 
        </>
      </>

    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
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
    paddingLeft:17
  },
  alertaC:{
    backgroundColor:"#FFF8EA",
  },
  alertaC2:{
    backgroundColor:"#FFF8EA",
  },
  buntonC:{
    backgroundColor:"#594545"
  },
  msgeT:{
    color:"#594545",
  },
  titleC:{
    color:"#594545",
    fontSize:25
  },
  bottomView:{
    height:60,
    width:"100%",
    justifyContent:"center"
  },
  deleteBtn:{
    backgroundColor:"#594545",
    height:50,
    width:210,
    marginLeft:50,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center"
  }

});