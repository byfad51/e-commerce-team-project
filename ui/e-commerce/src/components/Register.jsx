import React, { useState } from "react";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
    };
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      //const data = await JSON.stringify(user);
      console.log(user);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;