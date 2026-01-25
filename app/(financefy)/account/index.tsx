import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut, // Tambahkan icon trash
  RefreshCw,
  Settings,
  ShieldCheck,
  Tag,
  Wallet
} from "lucide-react-native";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../services/database"; // Pastikan path import benar
import { styles } from "./styles";

export default function AccountScreen() {
  const router = useRouter();

  // Fungsi Reset Database
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
              // Menghapus tabel agar initDatabase di layout membuat ulang dengan kolom baru
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

  const MenuItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    color = "#333",
  }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.iconWrapper, { backgroundColor: color + "15" }]}>
        <Icon size={22} color={color} />
      </View>
      <View style={styles.menuText}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 1. Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editBadge}>
            <Settings size={14} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>IT Junior</Text>
        <Text style={styles.userEmail}>junior@kmobile.dev</Text>
        <TouchableOpacity style={styles.premiumBadge}>
          <ShieldCheck size={14} color="#f1c40f" />
          <Text style={styles.premiumText}>Pro Member</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Main Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Manajemen Data</Text>
        <View style={styles.card}>
          <MenuItem
            icon={Tag}
            title="Kelola Kategori"
            color="#2ecc71"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <MenuItem
            icon={Wallet}
            title="Daftar Dompet"
            subtitle="Tambah atau edit rekening & cash"
            color="#3498db"
            onPress={() => router.push("../wallets")}
          />
        </View>
      </View>

      {/* 3. Developer Tools (Baru) */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Developer Tools</Text>
        <View style={styles.card}>
          <MenuItem
            icon={RefreshCw}
            title="Reset Database Schema"
            subtitle="Hapus semua tabel & buat ulang"
            color="#e74c3c"
            onPress={resetDatabase}
          />
        </View>
      </View>

      {/* 4. App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Aplikasi</Text>
        <View style={styles.card}>
          <MenuItem
            icon={Bell}
            title="Notifikasi"
            color="#e67e22"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <MenuItem
            icon={HelpCircle}
            title="Bantuan & FAQ"
            color="#9b59b6"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* 5. Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <LogOut size={20} color="#e74c3c" />
        <Text style={styles.logoutText}>Keluar Aplikasi</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.versionText}>K-Mobile v1.0.0</Text>
        <Text style={styles.versionText}>Made for Great IT Future</Text>
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}
