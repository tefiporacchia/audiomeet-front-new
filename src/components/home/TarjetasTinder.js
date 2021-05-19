import React, {useState, useEffect} from 'react';
import '../../style/home/TarjetasTinder.scss';
import TarjetaPersona from 'react-tinder-card'
import firebaseApp, {auth} from '../../firebase'
import moment from 'moment';
import {IconButton} from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BotonesSwipe from "./BotonesSwipe";
import Notification from "../extras/Notification";
const TarjetasTinder = () => {const database = firebaseApp.firestore();
    const curUser = auth.currentUser;

    //personas que cumplen con condiciones
    const [persona,setPersona] = useState([]);

    //preferencias
    const [wantsFriendship, setWantsFriendship] = useState(null);
    const [noDrinksPref,setNoDrinksPref] = useState(null);
    const [yesDrinksPref,setYesDrinksPref] = useState(null);
    const [noSmokesPref,setNoSmokesPref] = useState(null);
    const [yesSmokesPref,setYesSmokesPref] = useState(null);
    const [notSerious, setNotSerious] = useState(null);
    const [yesSerious, setYesSerious] = useState(null);
    const [olderThan,setOlderThan] = useState(null);
    const [youngerThan,setYoungerThan] = useState(null);
    const [wantsMale,setWantsMale] = useState(null);
    const [wantsFemale,setWantsFemale] = useState(null);
    const [cumpleCondicioness, setCumpleCondiciones]= useState(null);
    const [log, setLog] = useState(false);

    //datos cargados
    const [usersPreferences, setUsersPreferences]= useState([]);
    const [usersData, setUsersData]= useState([]);

    //datos para botones
    const [usersLiked, setUsersLiked]= useState([]);
    const [myUsersLiked, setMyUsersLiked]= useState([]);
    const [lastRejected,setLastRejected]= useState(null);
    const [likes, setLikes]= useState([]);  //likes de liked person
    const [likedPerson, setLikedPerson]= useState(null);

    //datos de matches
    const [matches, setMatches] = useState(false);

    //------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const docRef = database.collection("userPreferences").doc(curUser.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setWantsFriendship(doc.data().friendship);
                setYesDrinksPref(doc.data().yesDrinks);
                setNoDrinksPref(doc.data().noDrinks);
                setNoSmokesPref(doc.data().noSmokes);
                setYesSmokesPref(doc.data().yesSmokes);
                setYesSerious(doc.data().serious);
                setNotSerious(doc.data().notSerious);
                setOlderThan(doc.data().olderThan);
                setYoungerThan(doc.data().youngerThn);
                setWantsMale(doc.data().wantsMale);
                setWantsFemale(doc.data().wantsFemale);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        //cargo todos los datos de los usuarios
        const desuscribirse = database.collection('userData').onSnapshot(snapshot => (
            setUsersData(snapshot.docs.map( doc => {return({id:doc.id, ...doc.data()})}))
        ));

//cargo todas las preferencias de los usuarios
        const desuscribirse2 = database.collection('userPreferences').onSnapshot(snapshot => (
            setUsersPreferences(snapshot.docs.map( doc => {return({id:doc.id, ...doc.data()})}))
        ));


    }, [])


    /*useEffect(()=>{
        const docRef = database.collection("matches").where("user1", "==", curUser.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setMatches(oldArray => [...oldArray,doc.data().user2]);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        const doccRef = database.collection("matches").where("user2", "==", curUser.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [])*/

    //------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if(wantsFriendship !=null && noDrinksPref!=null && yesDrinksPref!=null
            && noSmokesPref!=null && yesSmokesPref!=null && notSerious!=null
            && yesSerious!=null && olderThan !=null && youngerThan!=null
            && wantsMale!=null && wantsFemale!=null){
            setLog(true);
        }

    }, [wantsFriendship, noDrinksPref, yesDrinksPref, noSmokesPref, yesSmokesPref, notSerious, yesSerious, olderThan,youngerThan,wantsMale,wantsFemale])

    //------------------------------------------------------------------------------------------------------------

    useEffect(()=> {
        if(log && usersData && usersPreferences){
            const desuscribirse = database.collection('userImages').onSnapshot(snapshot => (
                setPersona(snapshot.docs.map( doc => cumpleCondiciones(doc.id) && devolverObjetoAppendeado(doc.data(),doc.id)).filter(elem => elem))

            ));
            console.log(persona.filter( (ob) => ob.nombre.includes("Tefi")))
            return () => {
                desuscribirse();
            }
        }
    },[log, usersData, usersPreferences])


    //---------Funciones Auxiliares-------------------------------------------------------------------------------

    function get_age(time){
        const MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
        const date_array = time.split('-')
        const years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
        return Math.trunc(years_elapsed);
    }

    function devolverObjetoAppendeado(objeto, id){
        objeto.id = id;
        return objeto;
    }

    //-------Busco usuarios que cumplen con preferencias----------------------------------------------------------

    function cumpleCondiciones(docId){
        let cumple = false;

        usersData.map(data => {if (data.id == docId) usersPreferences.map(preferences => {
            if (preferences.id == docId) {
                if((data.drinks==yesDrinksPref||data.drinks!=noDrinksPref)
                    &&(data.smokes==yesSmokesPref||data.smokes!=noSmokesPref)
                    &&(get_age(data.bday)>=olderThan)&&(get_age(data.bday)<=youngerThan) && docId!= curUser.email
                    && ((preferences.friendship==wantsFriendship)==true ||(preferences.serious==yesSerious)==true || (preferences.notSerious == notSerious)==true)
                    &&(data.gender!=wantsMale||data.gender==wantsFemale)){
                    cumple = true
                    return 1
                }else{
                    cumple=false
                    return 1
                }
            }
            return 1} )})
        return cumple
    }


    //-------FUNCION DE BOTONES------------------------------------------------------------------------

    //-------Cargo todas las personas con sus likes----------------------------------------------------

    //busco mis likes
    useEffect(()=>{
        usersLiked.map(user => {
            if(curUser===user.id){
                setMyUsersLiked(user.myUsersLiked)
            }
        })

    }, [usersLiked])

    //--------FUNCIONES DE BOTONES---------------------------------------------------------------------

    const reject = event =>{
        if(persona[persona.length-1]!==null){
            setLastRejected(persona[persona.length-1]);
            //eliminar ultimo elemento
            setPersona(persona.filter(({ id }) => id !== persona[persona.length-1].id))
        }
    }

    const undo = event =>{
        if(lastRejected!=null){
            //tengo que agregar al final de arreglo
            setPersona(oldArray => [...oldArray,lastRejected]);
        }
    }

    const like = event => {
        if(persona[persona.length-1]!==null){
            setLastRejected(null);
            console.log("MIS PERSONAS", persona.length)
            console.log("MI PERSONA", persona[persona.length-1].id)
            setMyUsersLiked(oldArray => [...oldArray, persona[persona.length-1].id]);
            //tengo que eliminar ultimo elemento
            setPersona(persona.filter(({ id }) => id !== persona[persona.length-1].id))
            setLikedPerson(persona[persona.length-1])
        }
    }

    //-------------------------------------------------------------------------------------------------------

    //cargo usuarios likeados a la base de datos
    useEffect(()=>{

        console.log("MYUSERSLIKED", myUsersLiked)

        database.collection("usersLiked").doc(curUser.email).set({
            myUsersLiked: myUsersLiked

        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }, [myUsersLiked])


    useEffect(()=>{
        //busco likes de likedPerson
        usersLiked.map(user => {
            if(likedPerson.id===user.id){
                setLikes(user.myUsersLiked)
            }
        })

    }, [likedPerson])


    useEffect(()=>{
        //verifico si estoy en esos likes
        likes.map(user => {
            if(curUser.email===user){
                //escribo en base de datos
                database.collection("matches").doc().set({
                    user1: curUser.email,
                    user2:likedPerson.id

                })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
        })

    }, [likes])



    return (
        <div className="tarjetasTinder">

            {/*<Notification name={'stef'}/>*/}

            <div className="tarjetasTinder__contenedor">
                {persona.map(persona => (
                    <TarjetaPersona
                        className="swipe"
                        key={persona.name}
                        preventSwipe={['up','down']}
                    >
                        <div
                            className="tarjeta"
                            style={{backgroundImage:`url(${persona.userImages ? persona.userImages[0] : undefined})`}}
                        >
                            <h2>{usersData.find(x => x.id === persona.id).username}</h2>
                            <h4>{usersData.find(x => x.id === persona.id).description}</h4>
                        </div>
                    </TarjetaPersona>
                ))}
            </div>

            <BotonesSwipe undo={undo} reject={reject} like={like}/>

        </div>


    )
}

export default TarjetasTinder;