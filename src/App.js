import Navbar from './components/Navbar.jsx'
import './css/style.css';
import Browse from './Browse.js'
import About from './About.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import BooksTable from './components/BooksTable.jsx'
import BookForm from './components/BookForm.jsx'

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowClose, faTimesCircle, faCircleNotch, faEye, faEyeSlash, faExclamation } from '@fortawesome/free-solid-svg-icons'

library.add(faWindowClose, faTimesCircle, faCircleNotch, faEye, faEyeSlash, faExclamation)

function App() {
  const [isBlur, setBlur] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [isAuth, setAuth] = useState(JSON.parse(localStorage.getItem('user')) || false)

  function handleBlur(bool) {
    setBlur(bool);
  }

  function updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user)
    setAuth(true)
  }

  function logout() {
    setAuth(false);
    localStorage.removeItem('user');
  }

  return (
    <div className="App" style={isBlur ? { filter: 'blur(3px)' } : { filter: 'none' }}>
      <Router>
        <Navbar
          isAuth={isAuth}
          logout={logout}
        />
        <Switch>
          <Route path="/" exact>
            <Browse
              modalState={false}
              handleBlur={handleBlur}
              user={user}
              setUser={updateUser}
            />
          </Route>
          <Route path="/browse" exact>
            <Browse
              modalState={false}
              handleBlur={handleBlur}
              user={user}
              setUser={updateUser}
            />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/signin" exact>
            <SignIn
              login={updateUser}
            />
          </Route>

          <Route path="/signup" exact>
            <SignUp
              login={updateUser}
            />
          </Route>

          <Route path="/account/books" exact>
            <BooksTable
              setUser={updateUser}
              user={user}
            />
          </Route>

          <Route path="/account/post" exact>
            <BookForm
              user={user}
              setUser={updateUser}
            />
          </Route>

          <Route path={'/browse/:id'}>
            <Browse
              modalState={true}
              handleBlur={handleBlur}
              isAuth={isAuth}
              user={user}
              setUser={updateUser}
            />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
