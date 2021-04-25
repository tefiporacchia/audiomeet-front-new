import React, {useState, useEffect} from 'react';
import '../../style/home/TarjetasTinder.scss';
import TarjetaPersona from 'react-tinder-card'
import firebaseApp, {auth} from '../../firebase'
import moment from 'moment';
const TarjetasTinder = () => {

    const [persona,setPersona] = useState([]);

    const [noDrinksPref,setNoDrinksPref] = useState(false);
    const [yesDrinksPref,setYesDrinksPref] = useState(false);
    const [noSmokesPref,setNoSmokesPref] = useState(false);
    const [yesSmokesPref,setYesSmokesPref] = useState(false);
    const [notSerious, setNotSerious] = useState(false);
    const [yesSerious, setYesSerious] = useState(false);
    const [wantsFriendship, setWantsFriendship] = useState(false);
    const [olderThan,setOlderThan] = useState(0);
    const [youngerThan,setYoungerThan] = useState(100);
    const [cumpleCondicioness, setCumpleCondiciones]= useState(false);
    //data of user to check
    const [wantsNotSerious, setWantsNotSerious] = useState(false);
    const [wantsSerious, setWantsSerious] = useState(false);
    const [friendship, setFriendship] = useState(false);


    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;

    function get_age(time){
        const MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
        const date_array = time.split('-')
        const years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
        return Math.trunc(years_elapsed); }

    useEffect(() => {

        console.log(get_age('1982-09-20'));

        const docRef = database.collection("userPreferences").doc(curUser.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setWantsFriendship(doc.data().friendship);
                setYesDrinksPref(doc.data().yesDrinks);
                setNoDrinksPref(doc.data().noDrinks);
                setNoSmokesPref(doc.data().noSmokes);
                setYesSmokesPref(doc.data().yesSmokes);
                setYesSerious(doc.data().yesSerious);
                setNotSerious(doc.data().notSerious);
                setOlderThan(doc.data().olderThan);
                setYoungerThan(doc.data().youngerThn);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        const userDataCollection = database.collection("userData")

        function cumpleCondiciones(docId){
            console.log(cumpleCondicioness)
            setPrefs(docId);
            const documento = userDataCollection.doc(docId);
            documento.get().then((doc) => {
                if (doc.exists) {
                    if((doc.data().drinks===yesDrinksPref||doc.data().drinks!==noDrinksPref)
                        &&(doc.data().smokes===yesSmokesPref||doc.data().smokes!==noSmokesPref)
                        &&(get_age(doc.data().bday)>=olderThan)&&(get_age(doc.data().bday)<=youngerThan)
                        &&(yesSerious===wantsSerious||notSerious===wantsNotSerious||wantsFriendship===friendship)
                        &&(docId!==curUser.email)
                    ){
                        setCumpleCondiciones(true)
                        console.log(get_age(doc.data().bday) + "holaa")
                        console.log("cumple?"+docId+cumpleCondicioness)
                        console.log(doc.data().drinks===yesDrinksPref)
                        console.log(doc.data().drinks!==noDrinksPref)
                        console.log(doc.data().smokes===yesSmokesPref)
                        console.log(doc.data().smokes!==noSmokesPref)
                        console.log(yesSerious===wantsSerious||notSerious===wantsNotSerious||wantsFriendship===friendship)

                    }

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            return cumpleCondicioness;
        }

        function setPrefs(userId){
            const ref = database.collection("userPreferences").doc(userId);
            ref.get().then((doc) => {
                if (doc.exists) {
                    setFriendship(doc.data().friendship);
                    setWantsNotSerious(doc.data().notSerious);
                    setWantsSerious(doc.data().serious);
                    console.log("Sets prefs "+userId+doc.data().friendship+doc.data().notSerious+doc.data().serious);


                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }


        const desuscribirse = database.collection('userImages').onSnapshot(snapshot => (
            setPersona(snapshot.docs.map( doc => cumpleCondiciones(doc.id) && doc.data()))
            //el documento "doc id" en userdata comparte las preferencias del usuario
        ));

        //console.log("hay"+persona); //hay 5
        console.log("hay "+persona.length); //hay 5
       // console.log(persona.filter( (ob) => ob.username.includes("Tefi"))) //para filtrar json
        // const filtro1 = desuscribirse().filter( (auto) => auto.title.includes("Jeep"))

        return () => {
            desuscribirse();
        }

    }, [])

    return (
        <div className="tarjetasTinder">
            <div className="tarjetasTinder__contenedor">
                {persona.map(persona => (
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