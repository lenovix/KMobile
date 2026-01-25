import {
    Bell,
    ChevronRight,
    HelpCircle,
    LogOut,
    Settings,
    ShieldCheck,
    Tag,
    Wallet
} from "lucide-react-native";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AccountScreen() {
  // Komponen Menu Item agar kode lebih rapi (DRY - Don't Repeat Yourself)
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            subtitle="Atur kategori pengeluaran & pemasukan"
            color="#2ecc71"
            onPress={() => console.log("Navigasi ke halaman Kategori")}
          />
          <View style={styles.divider} />
          <MenuItem
            icon={Wallet}
            title="Daftar Dompet"
            subtitle="Tambah atau edit rekening & cash"
            color="#3498db"
            onPress={() => console.log("Navigasi ke halaman Dompet")}
          />
        </View>
      </View>

      {/* 3. App Settings */}
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

      {/* 4. Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <LogOut size={20} color="#e74c3c" />
        <Text style={styles.logoutText}>Keluar Aplikasi</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.versionText}>K-Mobile v1.0.0</Text>
        <Text style={styles.versionText}>Made for Great IT Future</Text>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
  },
  avatarContainer: { position: "relative" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#f1f2f6",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2ecc71",
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: { fontSize: 22, fontWeight: "bold", color: "#333", marginTop: 15 },
  userEmail: { fontSize: 14, color: "#999", marginTop: 4 },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 15,
    gap: 6,
  },
  premiumText: { color: "#f1c40f", fontSize: 12, fontWeight: "bold" },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#999",
    marginBottom: 10,
    marginLeft: 5,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  menuSubtitle: { fontSize: 12, color: "#999", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#f1f1f1", marginHorizontal: 15 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff7675",
    gap: 10,
  },
  logoutText: { color: "#e74c3c", fontWeight: "bold", fontSize: 16 },
  footer: { alignItems: "center", marginTop: 30 },
  versionText: { fontSize: 11, color: "#ccc" },
});
