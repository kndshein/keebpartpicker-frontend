import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Display from "./components/Display";
import Form from "./components/Form";

function App() {
  // Url variable
  const url = "http://localhost:4000";

  // Empty Keyboard for State
  const emptyKeyboard = {
    name: "",
    type: "",
    parts: {
      PCB: "",
      switch: "",
      keycaps: "",
      case: "",
    },
  };

  // States
  const [keyboards, setKeyboards] = React.useState([]);
  const [selectedKeyboard, setSelectedKeyboard] = React.useState(emptyKeyboard);

  // Function to select keyboard
  const selectKeyboard = (keyboard) => {
    setSelectedKeyboard(keyboard);
  };

  // Function to get list of dog
  const getKeyboards = () => {
    fetch(url + "/keyboards")
      .then((response) => response.json())
      .then((data) => {
        setKeyboards(data);
      });
  };

  // Function to get list of dogs axios
  const getKeyboards = () => {
    axios.get(url + "/keyboards").then((response) => {
      setKeyboards(response.data);
    });
  };

  React.useEffect(() => {
    getKeyboards();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(rp) => (
            <Display
              {...rp}
              keyboards={keyboards}
              selectKeyboard={selectKeyboard}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
