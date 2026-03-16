import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AccountHeader from "./src/components/AccountHeader";
import AuthCard from "./src/components/AuthCard";
import RobotCard from "./src/components/RobotCard";
import SearchBar from "./src/components/SearchBar";
import ShareSheet from "./src/components/ShareSheet";
import StatePanel from "./src/components/StatePanel";
import {
  clearSession,
  getAuthenticatedAccount,
  loginAccount,
  registerAccount,
  updateAccountProfile,
} from "./src/services/auth/authService";
import { fetchRobots } from "./src/services/robots/robotService";

export default function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [account, setAccount] = useState(null);
  const [selectedRobot, setSelectedRobot] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadInitialState = async () => {
      try {
        const [users, authenticatedAccount] = await Promise.all([
          fetchRobots(),
          getAuthenticatedAccount(),
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

    loadInitialState();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleCreateAccount = async (credentials) => {
    const nextAccount = await registerAccount(credentials);
    setAuthErrorMessage("");
    setAccount(nextAccount);
  };

  const handleLogin = async (credentials) => {
    try {
      const nextAccount = await loginAccount(credentials);
      setAuthErrorMessage("");
      setAccount(nextAccount);
    } catch (error) {
      setAuthErrorMessage(error.message);
    }
  };

  const handleSaveProfile = async ({ displayName }) => {
    const updatedAccount = await updateAccountProfile({ displayName });
    setAccount(updatedAccount);
  };

  const handleLogout = async () => {
    await clearSession();
    setAccount(null);
    setSelectedRobot(null);
  };

  const renderRobotList = () => {
    if (isLoading) {
      return <StatePanel title="Loading robots..." description="Pulling the crew into your app." />;
    }

    if (errorMessage) {
      return <StatePanel title="Unable to load robots" description={errorMessage} tone="error" />;
    }

    if (!account) {
      return (
        <StatePanel
          title="Sign in to explore"
          description="Create an account or log in to browse robot profiles and share avatar QR cards."
        />
      );
    }

    if (!filteredRobots.length) {
      return (
        <StatePanel
          title="No matches found"
          description="Try a different robot name to keep exploring."
        />
      );
    }

    return (
      <FlatList
        data={filteredRobots}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <RobotCard robot={item} onShare={setSelectedRobot} />}
        scrollEnabled={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>React Native mobile app</Text>
          <Text style={styles.title}>RoboFriends</Text>
          <Text style={styles.subtitle}>
            A true mobile app shell for iOS and Android with account access, robot search,
            and QR avatar sharing.
          </Text>
        </View>

        {account ? (
          <AccountHeader
            account={account}
            onSaveProfile={handleSaveProfile}
            onLogout={handleLogout}
          />
        ) : (
          <AuthCard
            onCreateAccount={handleCreateAccount}
            onLogin={handleLogin}
            errorMessage={authErrorMessage}
          />
        )}

        {account ? <SearchBar value={searchField} onChangeText={setSearchField} /> : null}

        {account && selectedRobot ? (
          <ShareSheet
            robot={selectedRobot}
            accountName={account.displayName}
            onClose={() => setSelectedRobot(null)}
          />
        ) : null}

        {renderRobotList()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#061730",
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 36,
    backgroundColor: "#061730",
  },
  hero: {
    paddingTop: 20,
    paddingBottom: 20,
    gap: 10,
  },
  eyebrow: {
    color: "#9ff4e8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  title: {
    color: "#efffff",
    fontSize: 42,
    fontWeight: "900",
  },
  subtitle: {
    color: "#b5d7dd",
    lineHeight: 22,
    fontSize: 15,
  },
  listContent: {
    gap: 14,
    paddingBottom: 24,
  },
});
