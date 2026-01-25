import * as Haptics from "expo-haptics"; // Import Haptics
import { Tabs, useRouter } from "expo-router"; // Tambah useRouter
import { History, Home, PieChart, Plus, User } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function FinancefyLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2ecc71",
        tabBarInactiveTintColor: "#95a5a6",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transaksi",
          tabBarIcon: ({ color }) => <History size={22} color={color} />,
        }}
      />

      {/* TOMBOL TAMBAH (+) DENGAN NAVIGASI REAL */}
      <Tabs.Screen
        name="add-transaction"
        options={{
          title: "",
          tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={0.8} // Efek memudar saat ditekan
              style={styles.addButtonWrapper}
              onPress={() => {
                // Memberikan feedback getaran
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                // Navigasi ke halaman input
                router.push("/(financefy)/add-transaction");
              }}
            >
              <View style={styles.addButtonCircle}>
                <Plus size={32} color="white" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="budget"
        options={{
          title: "Anggaran",
          tabBarIcon: ({ color }) => <PieChart size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Akun",
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    paddingBottom: 10,
    paddingTop: 8,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    // Shadow untuk membuat tab bar melayang
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  addButtonWrapper: {
    top: -25, // Membuat tombol lebih menonjol ke atas
    justifyContent: "center",
    alignItems: "center",
    width: 70, // Area sentuh yang lebih luas
  },
  addButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    // Shadow khusus tombol agar terlihat 3D
    elevation: 8,
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
