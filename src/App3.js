import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './auth/Login';

function App2() {
    return (
        <>
            
            <Switch>

            <Route exact path="/login" >
                <Login />    
            </Route>

            

            </Switch>  
        </>
    )
}

export default App2
