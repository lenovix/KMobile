import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { ChevronLeft, Plus, Trash2, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../services/database";
import { styles } from "./styles";

const BANK_OPTIONS = ["BCA", "Mandiri", "BNI", "BRI", "Bank Jago", "Seabank"];

export default function ManageWallets() {
  const router = useRouter();
  const [wallets, setWallets] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [type, setType] = useState<"bank" | "cash">("cash");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    const result: any[] = await db.getAllAsync("SELECT * FROM wallets");
    setWallets(result);
  };

  const handleAddWallet = async () => {
    const numericBalance = parseFloat(balance.replace(/[^0-9.-]+/g, "")) || 0;

    if (!name.trim()) return Alert.alert("Error", "Nama dompet tidak boleh kosong!");

    try {
      const finalIcon = type === "bank" ? "🏦" : "💵";

      await db.runAsync(
        "INSERT INTO wallets (name, icon, balance, type) VALUES (?, ?, ?, ?)",
        [name, finalIcon, numericBalance, type],
      );

      resetForm();
      fetchWallets();
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan ke database");
      console.error(error);
    }
  };

  const resetForm = () => {
    setName("");
    setBalance("0");
    setType("cash");
    setModalVisible(false);
  };

  const deleteWallet = (id: number) => {
    Alert.alert("Hapus Dompet", "Data transaksi terkait mungkin terpengaruh.", [
      { text: "Batal" },
      {
        text: "Hapus",
        onPress: async () => {
          await db.runAsync("DELETE FROM wallets WHERE id = ?", [id]);
          fetchWallets();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("../")}>
          <ChevronLeft color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daftar Dompet</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Plus color="#2ecc71" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={wallets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.walletCard}
            onPress={() => router.push({
              pathname: "/(financefy)/wallet-detail/[id]",
              params: { id: item.id }
            })}
          >
            <View style={styles.iconBox}>
              <Text style={{ fontSize: 20 }}>{item.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.walletName}>{item.name}</Text>
              <Text style={{ fontSize: 11, color: "#999" }}>
                {item.type === "bank" ? "Rekening Bank" : "Cash/Dompet"}
              </Text>
              <Text style={styles.walletBalance}>
                Rp {item.balance.toLocaleString("id-ID")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteWallet(item.id)}
              style={{ padding: 10 }}
            >
              <Trash2 size={20} color="#e74c3c" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tambah Baru</Text>
              <TouchableOpacity onPress={resetForm}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 20, gap: 10 }}>
              {["cash", "bank"].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => {
                    setType(t as any);
                    setName(t === "bank" ? BANK_OPTIONS[0] : "");
                  }}
                  style={{
                    flex: 1,
                    padding: 12,
                    borderRadius: 12,
                    alignItems: "center",
                    backgroundColor: type === t ? "#1A1A1A" : "#F5F7F8",
                  }}
                >
                  <Text
                    style={{
                      color: type === t ? "#FFF" : "#333",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text
              style={{
                fontSize: 13,
                color: "#999",
                marginBottom: 8,
                marginLeft: 5,
              }}
            >
              Sumber Dana
            </Text>

            {type === "bank" ? (
              <View
                style={[styles.input, { padding: 0, justifyContent: "center" }]}
              >
                <Picker
                  selectedValue={name}
                  onValueChange={(val) => setName(val)}
                  style={{ height: 55 }}
                >
                  {BANK_OPTIONS.map((bank) => (
                    <Picker.Item key={bank} label={bank} value={bank} />
                  ))}
                </Picker>
              </View>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Nama Dompet (ex: Dompet Utama)"
                value={name}
                onChangeText={setName}
              />
            )}

            <Text
              style={{
                fontSize: 13,
                color: "#999",
                marginBottom: 8,
                marginLeft: 5,
              }}
            >
              Saldo Saat Ini
            </Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              value={balance}
              onChangeText={setBalance}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleAddWallet}>
              <Text style={styles.saveBtnText}>Simpan Dompet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
