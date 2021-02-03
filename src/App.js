import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Display from "./components/Display";
import Form from "./components/Form";

function App() {
  // Url variable
  const url = "https://keebpartpicker.herokuapp.com";

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

  // Function to get list of keyboards
  // const getKeyboards = () => {
  //   fetch(url + "/keyboards")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setKeyboards(data);
  //     });
  // };

  // Function to get list of keyboards axios
  const getKeyboards = () => {
    axios.get(url + "/keyboards").then((response) => {
      setKeyboards(response.data);
    });
  };

  // Function to delete a keyboard
  const deleteKeyboard = (keyboard) => {
    axios.delete(url + "/keyboards/" + keyboard._id).then(() => {
      getKeyboards();
    });
  };

  // Function to update a keyboard
  const handleUpdate = (keyboard) => {
    console.log("keyboard id", keyboard);
    axios.put(url + "/keyboards/" + keyboard._id, keyboard).then(() => {
      getKeyboards();
    });
  };

  // Function to create a keyboard
  const handleCreate = (keyboard) => {
    axios.post(url + "/keyboards", keyboard).then(() => {
      getKeyboards();
    });
  };

  // UseEffect to run getKeyboards right away
  React.useEffect(() => {
    getKeyboards();
  }, []);

  return (
    <div className="App">
      <Link to="/create">
        <button>Create a Keeb</button>
      </Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(rp) => (
            <Display
              {...rp}
              keyboards={keyboards}
              selectKeyboard={selectKeyboard}
              deleteKeyboard={deleteKeyboard}
            />
          )}
        />
        <Route
          exact
          path="/create"
          render={(rp) => (
            <Form
              {...rp}
              label="create"
              keyboard={emptyKeyboard}
              handleSubmit={handleCreate}
            />
          )}
        />
        <Route
          exact
          path="/edit"
          render={(rp) => (
            <Form
              {...rp}
              label="update"
              keyboard={selectedKeyboard}
              handleSubmit={handleUpdate}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
