import * as React from "react";

import Toggle from "./toggle";
import Counter from "./counter";
import PasswordForm from "./password-form";

const App = () => {
    return <div>
        <h1>XState Experiment</h1>
        <Toggle/>
        <Counter/>
        <br/>
        <PasswordForm/>
    </div>
}

export default App;
