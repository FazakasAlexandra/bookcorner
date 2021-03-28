import './css/style.css';
import { useHistory } from "react-router-dom";
import React, { useReducer, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from "react-hook-form";
import UsersDatabase from './database/users.js'

function SignUp(props) {
  let history = useHistory()
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      passowrd: "",
      phone: "",
      email: ""
    }
  );
  const usersDatabase = new UsersDatabase()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, errors } = useForm();
  
  const handleInputChange = ({ name, value }) => setInputValues({ [name]: value })

  const onSubmit = (data) => {
    usersDatabase.postUser(data).then((res) => {
      console.log(res.message)
      usersDatabase.signIn(data).then((res) => {
        props.login(res.data)
      })
    })
  };

  return (
    <div className="sign-in-wraper">
      <div className="signin">
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>

          <div className="signin-form-inputs">
            <div className="input-container">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" name="name" className="input-orange" ref={register({ required: true })} />
              {errors.name && errors.name.type === 'required' && (<span>Name cannot be empty </span>)}
            </div>

            <div className="input-container">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" name="email" className="input-orange" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
              {(errors.email && errors.email.type === 'required' && (<span>Email cannot be empty </span>)) ||
                (errors.email && errors.email.type === 'pattern' && (<span>Email address is not valid </span>))}
            </div>

            <div className="input-container">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" name="phone" className="input-orange" ref={register({ required: true, pattern: /^[0-9]+$/ })} />
              {(errors.phone && errors.phone.type === 'required' && (<span>Phone cannot be empty </span>)) ||
                (errors.phone && errors.phone.type === 'pattern' && (<span>Phone number is not valid</span>))}
            </div>

            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-container">
              {
                showPassword ?
                  <>
                    <input type="text"
                      name="password"
                      className="input-orange"
                      value={inputValues.password}
                      onChange={(e) => handleInputChange(e.target)}
                      ref={register({ required: true, minLength: 5 })}
                    />
                    <FontAwesomeIcon icon="eye" onClick={() => setShowPassword(false)} className="eye"></FontAwesomeIcon>
                    {(errors.password && errors.password.type === 'required' && (<span>Password cannot be empty </span>)) ||
                      (errors.password && errors.password.type === 'minLength' && (<span>Password must have at least 5 characters</span>))}
                  </> :
                  <>
                    <input type="password" name="password" className="input-orange"
                      value={inputValues.password}
                      onChange={(e) => handleInputChange(e.target)}
                      ref={register({ required: true, minLength: 5 })}
                    />
                    <FontAwesomeIcon icon="eye-slash" onClick={() => setShowPassword(true)} className="eye"></FontAwesomeIcon>
                    {(errors.password && errors.password.type === 'required' && (<span>Password cannot be empty </span>)) ||
                      (errors.password && errors.password.type === 'minLength' && (<span>Password must have at least 5 characters</span>))}
                  </>
              }
            </div>
          </div>

          <div className="signin-form-buttons">
            <button className="signin-button black-button" type="submit">SIGN UP</button>

            <div className="signup-redirect">
              <span className="redirect" onClick={() => history.push(`/signin`)}>SIGN IN </span>
              <span>if already have an account</span>
            </div>
          </div>

        </form>

        <figure></figure>
      </div>
    </div>
  );
}

export default SignUp;

