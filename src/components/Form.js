import React from "react";

const Form = (props) => {
  console.log("form props -", props);
  const [formData, setFormData] = React.useState(props.keyboard);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChange2 = (event) => {
    setFormData({
      ...formData,
      parts: { ...formData.parts, [event.target.name]: event.target.value },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-keyboard">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </div>
      <div className="form-keyboard-parts">
        <input
          type="text"
          name="PCB"
          value={formData.parts.PCB}
          onChange={handleChange2}
        />
        <input
          type="text"
          name="switch"
          value={formData.parts.switch}
          onChange={handleChange2}
        />
        <input
          type="text"
          name="keycaps"
          value={formData.parts.keycaps}
          onChange={handleChange2}
        />
        <input
          type="text"
          name="keycaps"
          value={formData.parts.case}
          onChange={handleChange2}
        />
      </div>
      <input type="submit" value={props.label} />
    </form>
  );
};

export default Form;
