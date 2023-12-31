import React, { useState, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { val: "", isValid: false };
};

const collegeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 1 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 1 };
  }
  return { val: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();

  const [emailState, dispatchedEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchedPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [collegeState, dispatchedCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(()=>{
  // const identifier =  setTimeout(()=>{
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length>0
  //     )
  //   },500)
  //   return() =>{
  //     clearTimeout(identifier)
  //   }
  // },[enteredEmail,enteredPassword,enteredCollege])

  const emailChangeHandler = (event) => {
    dispatchedEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        collegeState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchedPassword({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        collegeState.isValid
    );
  };

  const collegeChangeHandler = (event) => {
    dispatchedCollege({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        passwordState.isValid &&
        event.target.value.trim().length > 1
    );
  };

  const validateEmailHandler = () => {
    dispatchedEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchedPassword({ type: "INPUT_BLUR" });
  };

  const validateCollegeHandler = () => {
    dispatchedCollege({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    autCtx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  const autCtx = useContext(AuthContext);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          label="E-mail"
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          id="college"
          type="text"
          label="College Name"
          isValid={passwordState.isValid}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
