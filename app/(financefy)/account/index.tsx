import { useRouter } from "expo-router";
import {
  RefreshCw,
  Tag,
  User,
  Wallet
} from "lucide-react-native";
import React from "react";
import {
  Alert,
  ScrollView,
  Text,
  View
} from "react-native";
import { MenuItem } from "../../../components/account/MenuItem";
import { db } from "../../services/database";
import { styles } from "./styles";

export default function AccountScreen() {
  const router = useRouter();

  const resetDatabase = () => {
    Alert.alert(
      "Developer Mode",
      "Hapus semua tabel? Ini akan menghapus seluruh data transaksi dan dompet untuk memperbarui skema database.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Hapus Semua",
          style: "destructive",
          onPress: async () => {
            try {
              await db.execAsync(`
                DROP TABLE IF EXISTS transactions;
                DROP TABLE IF EXISTS wallets;
              `);
              Alert.alert(
                "Berhasil",
                "Tabel dihapus. Silakan restart aplikasi (atau reload) untuk membuat ulang skema baru.",
              );
            } catch (err) {
              Alert.alert("Error", "Gagal menghapus tabel");
              console.error(err);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerSection}>
        <View style={styles.avatarCircle}>
          <User size={40} color="#FFF" />
        </View>
        <Text style={styles.userName}>Ichsanul Kamil Sudarmi</Text>
        <Text style={styles.userStatus}>Software Engineer</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Manajemen Data</Text>
        <View style={styles.card}>
          <MenuItem
            icon={Wallet}
            title="Daftar Dompet"
            subtitle="Atur rekening & arus kas kamu"
            color="#3498db"
            onPress={() => router.push("../wallets")}
          />
          <View style={styles.divider} />
          <MenuItem
            icon={Tag}
            title="Kelola Kategori"
            subtitle="Sesuaikan kategori transaksi"
            color="#2ecc71"
            onPress={() => router.push("../categories")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Sistem & Keamanan</Text>
        <View style={styles.card}>
          <MenuItem
            icon={RefreshCw}
            title="Reset Database"
            subtitle="Hapus permanen semua data"
            color="#e74c3c"
            onPress={resetDatabase}
          />
        </View>

        <Text style={{ textAlign: 'center', color: '#CCC', fontSize: 11, marginTop: 20 }}>
          Financefy v1.0.0-Beta • Build 2026
        </Text>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
