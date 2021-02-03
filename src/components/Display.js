import React from "react";

const Display = (props) => {
  console.log("display props -", props.keyboards);

  const loaded = () => {
    return (
      <div className="display">
        <h1>Display Loaded</h1>
        {props.keyboards.keyboards.map((keyboard) => {
          return (
            <article key={keyboard._id}>
              <h2>{keyboard.name}</h2>
              <h2>{keyboard.type}</h2>
              <div className="keyboard-parts">
                <ul>
                  <li>{keyboard.parts.PCB}</li>
                  <li>{keyboard.parts.switch}</li>
                  <li>{keyboard.parts.keycaps}</li>
                  <li>{keyboard.parts.case}</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  props.selectCookbook(keyboard);
                  props.history.push("/edit");
                }}
              >
                Edit
              </button>
            </article>
          );
        })}
      </div>
    );
  };
  const loading = <h1>Loading...</h1>;
  return props.keyboards.length !== 0 ? loaded() : loading;
};

export default Display;
