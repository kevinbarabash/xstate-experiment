import * as React from "react";

import Toggle from "./toggle";
import Counter from "./counter";
import PasswordForm from "./password-form";
import TrafficLight from "./traffic-light";

const App = () => {
    return <div>
        <h1>XState Experiment</h1>
        <Toggle/>
        <Counter/>
        <br/>
        <PasswordForm/>
        <br/>
        <TrafficLight/>
    </div>
}

export default App;
