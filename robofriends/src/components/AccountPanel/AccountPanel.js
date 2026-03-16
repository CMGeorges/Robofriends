import React, { useState } from "react";
import "./AccountPanel.css";

function AccountPanel({ account, onSaveProfile, onLogout }) {
  const [displayName, setDisplayName] = useState(account.displayName);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveProfile({ displayName });
  };

  return (
    <section className="account-panel">
      <div>
        <p className="account-label">Signed in as</p>
        <h2>{account.displayName}</h2>
        <p className="account-email">{account.email}</p>
      </div>

      <form className="account-form" onSubmit={handleSubmit}>
        <label htmlFor="profileDisplayName">Profile display name</label>
        <input
          id="profileDisplayName"
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <button type="submit">Save profile</button>
      </form>

      <button className="account-logout" type="button" onClick={onLogout}>
        Logout
      </button>
    </section>
  );
}

export default AccountPanel;
