import './css/style.css';
import { useHistory } from "react-router-dom";
import React, { useReducer, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from "react-hook-form";

function SignIn(props) {
  let history = useHistory()
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: ""
    }
  );
  const [notFoundMessages, setNotFoundMessages] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: ""
    }
  );

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, errors } = useForm();


  const handleInputChange = ({ name, value }) => {
    setInputValues({ [name]: value })
    setNotFoundMessages({ [name]: "" })
  }

  const onSubmit = ({ email, password }) => {
    setLoading(true)

    fetch(`http://afazakas.com/bookcorner/users/${email}/${password}`)
      .then(response => response.json())
      .then((response) => {
        setLoading(false)

        if (response.error) {
          setNotFoundMessages({ [response.error.type]: response.error.message })
        } else {
          props.login(response.data)
        }

      })
  }

  return (
    <div className="sign-in-wraper">
      <div className="signin">
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>

          <div className="signin-form-inputs">

            <div className="input-container">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                name="email"
                className="input-orange"
                value={inputValues.email}
                onChange={(e) => handleInputChange(e.target)}
                ref={register({ required: true })}
              />

              {errors.email && <span>Email cannot be empty</span>}
              {notFoundMessages.email ? <span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>{notFoundMessages.email}</span>: null}
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
                      onChange={(e) => { handleInputChange(e.target) }}
                      ref={register({
                        required: true
                      })}
                    />

                    <FontAwesomeIcon icon="eye" onClick={() => setShowPassword(false)} className="eye"></FontAwesomeIcon>
                    {errors.password && errors.password.type === 'required' && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Password cannot be empty</span>)}
                    {notFoundMessages.password ? <span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>{notFoundMessages.password}</span> : null}

                  </> :
                  <>
                    <input
                      type="password"
                      name="password"
                      className="input-orange"
                      value={inputValues.password}
                      onChange={(e) => handleInputChange(e.target)}
                      ref={register({
                        required: true,
                      })}
                    />

                    <FontAwesomeIcon icon="eye-slash" onClick={() => setShowPassword(true)} className="eye"></FontAwesomeIcon>
                    {errors.password && errors.password.type === 'required' && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Password cannot be empty </span>)}
                    {notFoundMessages.password ? <span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>{notFoundMessages.password}</span> : null}

                  </>
              }
            </div>
          </div>

          {loading ? <><FontAwesomeIcon icon="circle-notch" spin style={{ fontSize: "5rem" }} /></> : null}

          <div className="signin-form-buttons">
            <button className="signin-button black-button" type="submit">SIGN IN</button>
            <div className="signup-redirect">
              <span className="redirect" onClick={() => history.push(`/signup`)}>SIGN UP </span>
              <span>if you're not an user yet</span>
            </div>
          </div>

        </form>

        <figure></figure>
      </div>
    </div>
  );
}

export default SignIn;
