import React, { useEffect, useState } from "react";
import AccountPanel from "../../components/AccountPanel/AccountPanel";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import CardList from "../../components/CardList/CardList";
import EnvironmentBadge from "../../components/EnvironmentBadge/EnvironmentBadge";
import SearchBox from "../../components/SearchBox/SearchBox";
import SharePanel from "../../components/SharePanel/SharePanel";
import Scroll from "../../components/Scroll/Scroll";
import { createAppConfig } from "../../config/appConfig";
import { authService } from "../../services/auth/authService";
import { fetchRobots } from "../../services/robots/robotService";
import "./App.css";

function App() {
  const runtimeConfig = createAppConfig();
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [account, setAccount] = useState(null);
  const [selectedRobot, setSelectedRobot] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadRobots = async () => {
      try {
        const [users, authenticatedAccount] = await Promise.all([
          fetchRobots(),
          authService.getAuthenticatedAccount(),
        ]);

        if (isMounted) {
          setRobots(users);
          setAccount(authenticatedAccount);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || "Something went wrong while loading robots.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRobots();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleCreateAccount = async (credentials) => {
    const nextAccount = await authService.registerAccount(credentials);
    setAuthErrorMessage("");
    setAccount(nextAccount);
  };

  const handleLogin = async (credentials) => {
    try {
      const nextAccount = await authService.loginAccount(credentials);
      setAuthErrorMessage("");
      setAccount(nextAccount);
    } catch (error) {
      setAuthErrorMessage(error.message);
    }
  };

  const handleSaveProfile = async ({ displayName }) => {
    const updatedAccount = await authService.updateAccountProfile({ displayName });
    setAccount(updatedAccount);
  };

  const handleLogout = () => {
    authService.clearSession();
    setAccount(null);
    setSelectedRobot(null);
  };

  const handleShareAvatar = (robot) => {
    setSelectedRobot(robot);
  };

  const filteredRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <main className="app-shell">
      <section className="app-panel">
        <header className="app-hero">
          <EnvironmentBadge environment={runtimeConfig.environment} />
          <p className="app-kicker">System update</p>
          <h1>RoboFriends</h1>
          <p className="app-subtitle">
            A refreshed directory experience that is easier to use on phones, tablets,
            and desktops, with profile access and QR avatar sharing.
          </p>
        </header>

        {account ? (
          <AccountPanel
            account={account}
            onSaveProfile={handleSaveProfile}
            onLogout={handleLogout}
          />
        ) : (
          <AuthPanel
            onCreateAccount={handleCreateAccount}
            onLogin={handleLogin}
            errorMessage={authErrorMessage}
          />
        )}

        {account ? (
          <SearchBox searchField={searchField} searchChange={handleSearchChange} />
        ) : null}

        {account && selectedRobot && runtimeConfig.enableQrSharing ? (
          <SharePanel
            robot={selectedRobot}
            accountName={account.displayName}
            onClose={() => setSelectedRobot(null)}
          />
        ) : null}

        {isLoading ? (
          <section className="app-state" aria-live="polite">
            <h2>Loading robots...</h2>
            <p>Pulling the latest crew into the directory.</p>
          </section>
        ) : errorMessage ? (
          <section className="app-state app-state-error" aria-live="assertive">
            <h2>Unable to load robots</h2>
            <p>{errorMessage}</p>
          </section>
        ) : !account ? (
          <section className="app-state" aria-live="polite">
            <h2>Sign in to explore and share</h2>
            <p>Create an account or log in to browse robot profiles and generate QR codes.</p>
          </section>
        ) : (
          <Scroll>
            {filteredRobots.length ? (
              <CardList robots={filteredRobots} onShareAvatar={handleShareAvatar} />
            ) : (
              <section className="app-state" aria-live="polite">
                <h2>No matches found</h2>
                <p>Try a different name to find another robot friend.</p>
              </section>
            )}
          </Scroll>
        )}
      </section>
    </main>
  );
}

export default App;
