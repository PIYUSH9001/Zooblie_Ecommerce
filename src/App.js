import React from "react";
import { StoreProvider } from "./Context/context";

import Zooblie from "./Components/Zooblie";


const App = ()=>{
    return(
        <StoreProvider>
            <Zooblie/>
        </StoreProvider>
    )
}

export default App;
