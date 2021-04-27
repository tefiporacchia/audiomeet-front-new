import React, {useState, useEffect} from 'react';
import '../../style/home/TarjetasTinder.scss';
import TarjetaPersona from 'react-tinder-card'
import firebaseApp, {auth} from '../../firebase'
import moment from 'moment';
const TarjetasTinder = () => {

    const [persona,setPersona] = useState([]);
    //const [dataLoaded,setDataLoaded] = useState([]);

    const [noDrinksPref,setNoDrinksPref] = useState(null);
    const [yesDrinksPref,setYesDrinksPref] = useState(null);
    const [noSmokesPref,setNoSmokesPref] = useState(null);
    const [yesSmokesPref,setYesSmokesPref] = useState(null);
    const [notSerious, setNotSerious] = useState(null);
    const [yesSerious, setYesSerious] = useState(null);
    const [wantsFriendship, setWantsFriendship] = useState(null);
    const [olderThan,setOlderThan] = useState(null);
    const [youngerThan,setYoungerThan] = useState(null);
    const [cumpleCondicioness, setCumpleCondiciones]= useState(null);
    /**data of user to check
    const [wantsNotSerious, setWantsNotSerious] = useState();
    const [wantsSerious, setWantsSerious] = useState();
    const [friendship, setFriendship] = useState();
**/

    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;

    function get_age(time){
        const MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
        const date_array = time.split('-')
        const years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
        return Math.trunc(years_elapsed); }



    useEffect(() => {
        const docRef = database.collection("userPreferences").doc(curUser.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Setting data")
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

            } else {
                // doc.data() will be undefined in this case
                console.log("no such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        //console.log("HOLAAAA"+ olderThan);

    }, [])



    const userDataCollection = database.collection("userData")




    function cumpleCondiciones(docId){


        let cumple=false;
        //console.log(cumpleCondicioness)
        const documento = userDataCollection.doc(docId);
        documento.get().then((doc) => {
            if (doc.exists) {

                console.log(doc.data())
                if((doc.data().drinks===yesDrinksPref||doc.data().drinks!==noDrinksPref)
                    &&(doc.data().smokes===yesSmokesPref||doc.data().smokes!==noSmokesPref)
                    &&(get_age(doc.data().bday)>=olderThan)&&(get_age(doc.data().bday)<=youngerThan)
                    &&(docId!==curUser.email)
                ){

                    return true;
                    //console.log(cumple)
                    console.log(get_age(doc.data().bday) + "hola")
                    console.log(doc.data().drinks===yesDrinksPref)
                    console.log(doc.data().drinks!==noDrinksPref)
                    console.log(doc.data().smokes===yesSmokesPref)
                    console.log(doc.data().smokes!==noSmokesPref)
                    //console.log(yesSerious===wantsSerious||notSerious===wantsNotSerious||wantsFriendship===friendship)

                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document", error);
        });

        const ref = database.collection("userPreferences").doc(docId);
        ref.get().then((doc) => {

            if (doc.exists) {
                console.log(doc.data())

                if(doc.data().serious===yesSerious||doc.data().notSerious===notSerious||doc.data().friendship===wantsFriendship){
                    console.log(cumple)

                }else{
                    cumple=false;
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        console.log("CUMPLE CONDICION:",cumple)
        return cumple;

    }




    useEffect(()=>{

        //if not null
        console.log(yesSmokesPref )//+ yesDrinksPref + yesSmokesPref + notSerious + noDrinksPref + noSmokesPref + olderThan + youngerThan + wantsFriendship)
        if(yesSerious!==null && yesDrinksPref!==null && yesSmokesPref!==null && notSerious!==null && noDrinksPref!==null && noSmokesPref!==null && olderThan!==null && youngerThan!==null && wantsFriendship!==null ) {
           console.log("VALOR DE LA VARIABLE",youngerThan);
            const desuscribirse = database.collection('userImages').onSnapshot(snapshot => (
                setPersona(snapshot.docs.map(doc => cumpleCondiciones(doc.id) && doc.data() ))
                //el documento "doc id" en userdata comparte las preferencias del usuario
            ));

            return () => {
                desuscribirse();
            }
        }
        //console.log("hay"+persona); //hay 5
        console.log("hay "+persona.length); //hay 5
        // console.log(persona.filter( (ob) => ob.username.includes("Tefi"))) //para filtrar json
        // const filtro1 = desuscribirse().filter( (auto) => auto.title.includes("Jeep"))



    },[yesSerious,yesDrinksPref,yesSmokesPref,notSerious,noDrinksPref,noSmokesPref,olderThan,youngerThan,wantsFriendship])

    useEffect(()=>{
        console.log("p",persona)

    },[persona])

    return (
        <div className="tarjetasTinder">
            <div className="tarjetasTinder__contenedor">
                { persona.length>0 && persona.map(persona => (
                        <TarjetaPersona
                        className="swipe"
                        key={persona.name}
                        preventSwipe={['up','down']}
                        >
                        <div
                            className="tarjeta"
                            style={{backgroundImage:`url(${persona.userImages})`}}
                        >
                            <h2>{persona.username}</h2>
                            <h4>{persona.description}</h4>
                        </div>

                        </TarjetaPersona>

                    //conseguir las caracteristicas que el usuario pide
                    //recorrer userData y mostrarle al usuario solo los que tienen las características que el usuario pide.
                    //mostrar solo la primer foto



                ))}
            </div>
        </div>
    )
}

export default TarjetasTinder;