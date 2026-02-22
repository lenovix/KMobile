import * as Haptics from "expo-haptics";
import { Tabs, useRouter } from "expo-router";
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
        name="transactions/index"
        options={{
          title: "Transaksi",
          tabBarIcon: ({ color }) => <History size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="add-transaction/index"
        options={{
          title: "",
          tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.addButtonWrapper}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
        name="account/index"
        options={{
          title: "Akun",
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="wallet-detail/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="wallets/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="categories/index"
        options={{
          href: null,
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
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  addButtonWrapper: {
    top: -25,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
  addButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
