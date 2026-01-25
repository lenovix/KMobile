import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Kita buat komponen wrapper agar useSafeAreaInsets bisa bekerja
function RootLayoutNav() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white", // Pastikan background konsisten
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="launcher" />
        <Stack.Screen name="(financefy)" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    // SafeAreaProvider harus membungkus seluruh aplikasi
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  );
}
