import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { initDatabase } from "./services/database";

function RootLayoutNav() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="launcher" />
        <Stack.Screen name="(financefy)" />
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  );
}
