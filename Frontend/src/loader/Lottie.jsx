import React from "react";
import lottie from "lottie-web";
import loading from "./loading.json";

export default function Lottie() {
    React.useEffect( () => {
        lottie.loadAnimation( {
            container: document.querySelector( "#loading" ),
            animationData: loading,
        } );
    }, [] );

    return <div id="loading" style={ { height: "850px", width: "500px", margin: "auto" } } />
}