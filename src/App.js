import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home/Home'
import Product from './pages/Home/Product/Product'
import Populars from './pages/Populars'
import NewProducts from './pages/NewProduct/NewProducts'
import Login from './pages/Login/Login'
import SearchProject from './pages/Search/SearchProject'
import NewAccount from './pages/NewAccount/NewAccount'
import useAuth  from './hooks/useAuth'
import NavBar from './components/NavBar'
import firebase, { FirebaseContext } from './firebase'


const App = () => {
  const user = useAuth();
  console.log(user)
  return ( 
    <>
    <FirebaseContext.Provider 
    value={{firebase,
            user
    }}
    >
      <Router>
      <NavBar />
        <Switch>
          <Route path ="/" exact component={Home} />
          <Route path="/populars" component={Populars} />
          <Route path="/new-products" component={NewProducts}/>
          <Route path="/new-account" component={NewAccount} />
          <Route path="/login" component={Login} />
          <Route path="/searchproject" component={SearchProject} />
          <Route path={`/:id`} render={props => <Product {...props}/>}/>
        </Switch>
      </Router>
    </FirebaseContext.Provider>
    </>
   );
}
 
export default App;