import React, {useState, useEffect} from 'react';
import '../../style/home/TarjetasTinder.scss';
import TarjetaPersona from 'react-tinder-card'
import firebaseApp from '../../firebase'
const TarjetasTinder = () => {

    const [persona,setPersona] = useState([]);
    const database = firebaseApp.firestore();

    useEffect(() => {

        const desuscribirse = database.collection('personas').onSnapshot(snapshot => (
            setPersona(snapshot.docs.map( doc => doc.data()))
        ));

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
                            style={{backgroundImage:`url(${persona.url})`}}
                        >
                            <h2>{persona.nombre}</h2>
                            <h4>{persona.descripcion}</h4>
                        </div>

                    </TarjetaPersona>



                ))}
            </div>
        </div>
    )
}

export default TarjetasTinder;