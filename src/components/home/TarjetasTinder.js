import React, {useState, useEffect} from 'react';
import '../../style/home/TarjetasTinder.scss';
import TarjetaPersona from 'react-tinder-card'
import firebaseApp, {auth} from '../../firebase'
import moment from 'moment';
const TarjetasTinder = () => {

    const [persona,setPersona] = useState([]);

    const [wantsFriendship, setWantsFriendship] = useState(null);
    const [noDrinksPref,setNoDrinksPref] = useState(null);
    const [yesDrinksPref,setYesDrinksPref] = useState(null);
    const [noSmokesPref,setNoSmokesPref] = useState(null);
    const [yesSmokesPref,setYesSmokesPref] = useState(null);
    const [notSerious, setNotSerious] = useState(null);
    const [yesSerious, setYesSerious] = useState(null);
    const [olderThan,setOlderThan] = useState(null);
    const [youngerThan,setYoungerThan] = useState(null);
    const [cumpleCondicioness, setCumpleCondiciones]= useState(null);
    const [log, setLog] = useState(false);

    const [usersPreferences, setUsersPreferences]= useState([]);
    const [usersData, setUsersData]= useState([]);

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
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        const desuscribirse = database.collection('userData').onSnapshot(snapshot => (
            setUsersData(snapshot.docs.map( doc => {return({id:doc.id, ...doc.data()})}))
            //el documento "doc id" en userdata comparte las preferencias del usuario
        ));

        const desuscribirse2 = database.collection('userPreferences').onSnapshot(snapshot => (
            setUsersPreferences(snapshot.docs.map( doc => {return({id:doc.id, ...doc.data()})}))
            //el documento "doc id" en userdata comparte las preferencias del usuario
        ));

        /*console.log()
        const desuscribirse = database.collection('userImages').onSnapshot(snapshot => (
            setPersona(snapshot.docs.map( doc => !cumpleCondiciones(doc.id) && doc.data()).filter(elem => elem))
            //el documento "doc id" en userdata comparte las preferencias del usuario
        ));

        console.log(persona.length); //hay 5
        console.log(persona.filter( (ob) => ob.nombre.includes("Tefi"))) //para filtrar json

        // const filtro1 = desuscribirse().filter( (auto) => auto.title.includes("Jeep"))

        return () => {
            desuscribirse();
        }*/

    }, [])

    useEffect(() => {

        if(wantsFriendship !=null && noDrinksPref!=null && yesDrinksPref!=null && noSmokesPref!=null && yesSmokesPref!=null
            && notSerious!=null && yesSerious!=null && olderThan !=null && youngerThan!=null){

            setLog(true);
        }

    }, [wantsFriendship, noDrinksPref, yesDrinksPref, noSmokesPref, yesSmokesPref, notSerious, yesSerious, olderThan,youngerThan])

    useEffect(()=> {
        if(log && usersData && usersPreferences){
            const desuscribirse = database.collection('userImages').onSnapshot(snapshot => (
                setPersona(snapshot.docs.map( doc => cumpleCondiciones(doc.id) && doc.data()).filter(elem => elem))
                //el documento "doc id" en userdata comparte las preferencias del usuario
            ));

            console.log(persona.length); //hay 5
            console.log(persona.filter( (ob) => ob.nombre.includes("Tefi"))) //para filtrar json

            // const filtro1 = desuscribirse().filter( (auto) => auto.title.includes("Jeep"))

            return () => {
                desuscribirse();
            }
            console.log(cumpleCondiciones('manumasjoan@gmail.com'))
        }
    },[log, usersData, usersPreferences])

    useEffect(()=>{

    }, [persona])


    function cumpleCondiciones(docId){
        let cumple = false;

        usersData.map(data => {if (data.id == docId) usersPreferences.map(preferences => {
            if (preferences.id == docId) {
                if((data.drinks==yesDrinksPref||data.drinks!=noDrinksPref)
                    &&(data.smokes==yesSmokesPref||data.smokes!=noSmokesPref)
                    &&(get_age(data.bday)>=olderThan)&&(get_age(data.bday)<=youngerThan) && docId!= curUser.email
                    && (preferences.friendship==wantsFriendship ||preferences.serious==yesSerious || preferences.notSerious == notSerious)){
                    cumple = true
                    return 1
                }else{
                    console.log(data.drinks)
                    console.log(yesDrinksPref)
                    console.log(data.drinks) //manu no toma
                    console.log(noDrinksPref) // quiero que tomen?
                    console.log(data.smokes)
                    console.log(yesSmokesPref)
                    console.log(data.smokes) //manu no fuma
                    console.log(noSmokesPref) // prefiero que fumen?
                    console.log(get_age(data.bday)>=olderThan)
                    console.log(get_age(data.bday)<=youngerThan)

                    cumple=false
                    return 1
                }
            }
                return 1} )})
        return cumple
    }

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
                            style={{backgroundImage:`url(${persona.userImages ? persona.userImages[0] : undefined})`}}
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