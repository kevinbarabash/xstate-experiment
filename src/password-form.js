import * as React from "react";
import { Machine, interpret } from "xstate";

import { passwordFormMachine } from "./password-form-machine.js";

// type Props = {|
//   actorIsChild: boolean,
//   hasPassword: boolean,
//   // If the user is a parent modifying their child's settings.
//   // Please note that the child may be over 13.
//   isModifyingChild: boolean,
//   requiresExistingPassword: boolean,
//   targetId: string,
//   actorIdentifier: ?string,
//   successfullyChangedSettings: () => mixed,
// |};

// type State = {|
//   current: any, // not sure how to model this yet
// |};

class PasswordFormXState extends React.Component {
  state = {
    current: passwordFormMachine.initialState,
  };

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  service = interpret(passwordFormMachine).onTransition((current) =>
    this.setState({ current })
  );

  handleExistingChange = (e) => {
    this.service.send("EXISTING_PASSWORD", {value: e.target.value});
  };

  handleFirstPasswordChange = (e) => {
    this.service.send("FIRST_PASSWORD", {value: e.target.value});
  };

  handleSecondPasswordChange = (e) => {
    this.service.send("SECOND_PASSWORD", {value: e.target.value});
  };

  render() {
    const { current } = this.state;

    const {existingPassword, newPasswords} = current.value;

    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        Existing Password: <input id="existing" onChange={this.handleExistingChange}></input>
        {existingPassword === "empty" && 
          <div style={{color: "red"}}>
            Existing password can't be empty
          </div>}
        {existingPassword === "valid" && 
          <div style={{color: "green"}}>
            Existing password is valid
          </div>}
        <br />
        New Password: <input id="first" onChange={this.handleFirstPasswordChange}></input>
        Repeat New Password: <input id="second" onChange={this.handleSecondPasswordChange}></input>
        {newPasswords === "not_equal" &&
          <div style={{color: "red"}}>
            New passwords don't match
          </div>}
        {newPasswords === "empty" &&
          <div style={{color: "red"}}>
            New passwords can't be empty
          </div>}
        {newPasswords === "valid" &&
          <div style={{color: "green"}}>
            Passwords are valid
          </div>}
      </div>
    );
  }
}

export default PasswordFormXState;
