import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import {
  Calendar,
  Check,
  ChevronRight,
  Notebook,
  X,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../services/database";
import { keypadStyles, styles } from "./styles";

const CATEGORIES = [
  { id: "1", name: "Makanan", icon: "🍔", type: "expense" },
  { id: "2", name: "Transportasi", icon: "🚗", type: "expense" },
  { id: "3", name: "Gaji", icon: "💰", type: "income" },
  { id: "4", name: "Hiburan", icon: "🎬", type: "expense" },
  { id: "5", name: "Kesehatan", icon: "💊", type: "expense" },
];

export default function AddTransactionScreen() {
  const router = useRouter();

  // --- STATES ---
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState(""); // Angka murni disimpan di sini
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [excludeFromReport, setExcludeFromReport] = useState(false);

  // --- DATA STATES ---
  const [dbWallets, setDbWallets] = useState<any[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Pilih Kategori",
    icon: "✨",
  });

  // --- UI STATES ---
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState<{
    show: boolean;
    type: "wallet" | "category";
  }>({ show: false, type: "wallet" });

  useEffect(() => {
    loadWallets();
  }, []);

  const loadWallets = async () => {
    try {
      const result: any[] = await db.getAllAsync("SELECT * FROM wallets");
      setDbWallets(result);
      if (result.length > 0) setSelectedWallet(result[0]);
    } catch (error) {
      console.error("Gagal ambil wallet:", error);
    }
  };

  // --- LOGIC FUNCTIONS ---
  const handleKeyPress = (val: string) => {
    if (val === "DEL") {
      setAmount((prev) => prev.slice(0, -1));
    } else if (val === "000") {
      // Jangan tambahkan 000 jika masih kosong
      if (amount === "" || amount === "0") return;
      setAmount((prev) => prev + "000");
    } else {
      // Mencegah double nol di depan
      if (amount === "0" && val === "0") return;
      setAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  const formatRibuan = (num: string) => {
    if (!num) return "0";
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Masukkan nominal yang valid");
      return;
    }
    if (!selectedWallet || selectedCategory.name === "Pilih Kategori") {
      Alert.alert("Error", "Lengkapi data dompet dan kategori");
      return;
    }

    try {
      await db.runAsync(
        `INSERT INTO transactions (type, amount, wallet_name, wallet_icon, category_name, category_icon, note, date, exclude_from_report) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          type,
          parseFloat(amount),
          selectedWallet.name,
          selectedWallet.icon,
          selectedCategory.name,
          selectedCategory.icon,
          note,
          date.toISOString(),
          excludeFromReport ? 1 : 0,
        ],
      );

      const balanceChange =
        type === "expense" ? -parseFloat(amount) : parseFloat(amount);
      await db.runAsync(
        "UPDATE wallets SET balance = balance + ? WHERE id = ?",
        [balanceChange, selectedWallet.id],
      );

      Alert.alert("Berhasil", "Transaksi disimpan!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan transaksi.");
    }
  };

  const openPicker = (pickerType: "wallet" | "category") => {
    if (pickerType === "wallet" && dbWallets.length === 0) {
      Alert.alert("Ops!", "Buat dompet dulu di menu Akun.", [
        { text: "Ke Akun", onPress: () => router.push("/account") },
        { text: "Batal" },
      ]);
      return;
    }
    setModalVisible({ show: true, type: pickerType });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaksi Baru</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveBtn}>Simpan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* TYPE SELECTOR */}
        <View style={styles.typeSelector}>
          {["expense", "income"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              style={[styles.typeBtn, type === t && styles.typeBtnActive]}
            >
              <Text
                style={[styles.typeLabel, type === t && styles.typeLabelActive]}
              >
                {t === "expense" ? "Keluar" : "Masuk"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* INPUT NOMINAL (Custom View, No TextInput) */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Jumlah Nominal</Text>
          <View style={styles.amountInputRow}>
            <Text style={styles.currency}>Rp</Text>
            <Text
              style={[
                keypadStyles.amountText,
                { color: amount ? "#1A1A1A" : "#CCC" },
              ]}
            >
              {formatRibuan(amount)}
            </Text>
          </View>
        </View>

        {/* FORM ITEMS */}
        <View style={styles.formSection}>
          <TouchableOpacity
            style={styles.formItem}
            onPress={() => openPicker("wallet")}
          >
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>
                {selectedWallet?.icon || "❓"}
              </Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Metode Pembayaran</Text>
              <Text style={styles.itemValue}>
                {selectedWallet?.name || "Pilih Dompet"}
              </Text>
            </View>
            <ChevronRight size={18} color="#D1D1D1" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.formItem}
            onPress={() => openPicker("category")}
          >
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>{selectedCategory.icon}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Kategori</Text>
              <Text style={styles.itemValue}>{selectedCategory.name}</Text>
            </View>
            <ChevronRight size={18} color="#D1D1D1" />
          </TouchableOpacity>

          <View style={styles.formItem}>
            <View style={styles.iconCircle}>
              <Notebook size={20} color="#1A1A1A" strokeWidth={1.5} />
            </View>
            <TextInput
              style={[styles.itemContent, { fontSize: 15, color: "#1A1A1A" }]}
              placeholder="Tambahkan catatan..."
              value={note}
              onChangeText={setNote}
            />
          </View>

          <TouchableOpacity
            style={styles.formItem}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={styles.iconCircle}>
              <Calendar size={20} color="#1A1A1A" strokeWidth={1.5} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Tanggal Transaksi</Text>
              <Text style={styles.itemValue}>
                {date.toLocaleDateString("id-ID", { dateStyle: "long" })}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.switchSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>Abaikan Laporan</Text>
            <Text style={styles.switchSub}>
              Tidak masuk dalam kalkulasi budget.
            </Text>
          </View>
          <Switch
            value={excludeFromReport}
            onValueChange={setExcludeFromReport}
            trackColor={{ false: "#EEEEEE", true: "#2ecc71" }}
          />
        </View>
      </ScrollView>

      {/* KEYPAD */}
      <View style={keypadStyles.container}>
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["000", "0", "DEL"],
        ].map((row, i) => (
          <View key={i} style={keypadStyles.row}>
            {row.map((k) => (
              <TouchableOpacity
                key={k}
                style={keypadStyles.key}
                onPress={() => handleKeyPress(k)}
              >
                {k === "DEL" ? (
                  <X size={24} color="#e74c3c" />
                ) : (
                  <Text style={keypadStyles.keyText}>{k}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* MODAL PICKER (Reuse for Category & Wallet) */}
      <Modal visible={modalVisible.show} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Pilih {modalVisible.type === "wallet" ? "Dompet" : "Kategori"}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setModalVisible({ ...modalVisible, show: false })
                }
              >
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={
                modalVisible.type === "wallet"
                  ? dbWallets
                  : CATEGORIES.filter((c) => c.type === type)
              }
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              renderItem={({ item }) => {
                const isSelected =
                  modalVisible.type === "wallet"
                    ? selectedWallet?.id === item.id
                    : selectedCategory.name === item.name;
                return (
                  <TouchableOpacity
                    style={[
                      styles.pickerItem,
                      isSelected && styles.pickerItemActive,
                    ]}
                    onPress={() => {
                      if (modalVisible.type === "wallet")
                        setSelectedWallet(item);
                      else setSelectedCategory(item);
                      setModalVisible({ ...modalVisible, show: false });
                    }}
                  >
                    <Text style={styles.pickerIcon}>{item.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.pickerText}>{item.name}</Text>
                      {modalVisible.type === "wallet" && (
                        <Text style={{ fontSize: 10, color: "#999" }}>
                          Saldo: Rp {item.balance.toLocaleString()}
                        </Text>
                      )}
                    </View>
                    {isSelected && <Check size={18} color="#2ecc71" />}
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{ paddingBottom: 30 }}
            />
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowDatePicker(false);
            if (d) setDate(d);
          }}
        />
      )}
    </View>
  );
}
