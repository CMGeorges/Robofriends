import React, { useState } from "react";
import "./AuthPanel.css";

function AuthPanel({ onCreateAccount, onLogin, errorMessage }) {
  const [mode, setMode] = useState("signup");
  const [formValues, setFormValues] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === "signup") {
      onCreateAccount(formValues);
      return;
    }

    onLogin({
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <section className="auth-panel">
      <div className="auth-panel-tabs" role="tablist" aria-label="Account access">
        <button
          type="button"
          className={mode === "signup" ? "auth-tab auth-tab-active" : "auth-tab"}
          onClick={() => setMode("signup")}
          aria-label="Open create account tab"
        >
          Create account
        </button>
        <button
          type="button"
          className={mode === "login" ? "auth-tab auth-tab-active" : "auth-tab"}
          onClick={() => setMode("login")}
          aria-label="Open login tab"
        >
          Login
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{mode === "signup" ? "Create your account" : "Welcome back"}</h2>
        <p>
          {mode === "signup"
            ? "Set up a lightweight demo account to personalize sharing."
            : "Sign in to manage your profile and share avatar QR codes."}
        </p>

        {mode === "signup" ? (
          <label className="auth-field" htmlFor="displayName">
            Display name
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={formValues.displayName}
              onChange={handleChange}
              required
            />
          </label>
        ) : null}

        <label className="auth-field" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="auth-field" htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </label>

        {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

        <button className="auth-submit" type="submit">
          {mode === "signup" ? "Continue" : "Sign in"}
        </button>
      </form>
    </section>
  );
}

export default AuthPanel;
