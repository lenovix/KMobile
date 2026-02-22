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
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { db } from "../../services/database";
import { keypadStyles, styles } from "./styles";

export default function AddTransactionScreen() {
  const router = useRouter();

  const [isKeypadVisible, setIsKeypadVisible] = useState(false);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [excludeFromReport, setExcludeFromReport] = useState(false);

  const [dbWallets, setDbWallets] = useState<any[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Pilih Kategori",
    icon: "✨",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState<{
    show: boolean;
    type: "wallet" | "category";
  }>({ show: false, type: "wallet" });

  useEffect(() => {
    loadWallets();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result: any[] = await db.getAllAsync("SELECT * FROM categories");
      setDbCategories(result || []);
    } catch (error) {
      console.log("Tabel categories belum siap.");
      setDbCategories([]);
    }
  };

  useEffect(() => {
    if (selectedCategory.name !== "Pilih Kategori") {
      const isCompatible = dbCategories.find(
        c => c.name === selectedCategory.name && c.type === type
      );
      if (!isCompatible) {
        setSelectedCategory({ name: "Pilih Kategori", icon: "✨" });
      }
    }
  }, [type]);

  const loadWallets = async () => {
    try {
      const result: any[] = await db.getAllAsync("SELECT * FROM wallets");
      setDbWallets(result || []);
      if (result && result.length > 0) {
        setSelectedWallet((prev: any) => prev ?? result[0]);
      }
    } catch (error) {
      console.log("Tabel wallets belum siap.");
      setDbWallets([]);
    }
  };

  const handleKeyPress = (val: string) => {
    if (val === "DEL") {
      setAmount((prev) => prev.toString().slice(0, -1));
    } else if (val === "AC") {
      setAmount("");
    } else if (val === "000") {
      if (amount === "" || /[+\-*/]$/.test(amount)) return;
      setAmount((prev) => prev + "000");
    } else if (["+", "-", "*", "/"].includes(val)) {
      if (amount === "" || /[+\-*/]$/.test(amount)) return;
      setAmount((prev) => prev + val);
    } else if (val === "=") {
      calculateResult();
    } else {
      if (amount === "0" && val === "0") return;
      setAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  const calculateResult = () => {
    try {
      const sanitizedExpression = amount.replace(/[^-()\d/*+.]/g, "");
      const result = new Function(`return ${sanitizedExpression}`)();

      setAmount(Math.max(0, Math.round(result)).toString());
    } catch (e) {
      Alert.alert("Format Salah", "Periksa kembali hitungan kamu.");
    }
  };

  const formatRibuan = (num: string) => {
    if (!num) return "0";
    return num
      .split(/([+\-*/])/)
      .map((part) => {
        if (["+", "-", "*", "/"].includes(part)) return ` ${part} `;
        return part.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      })
      .join("");
  };

  const handleSave = async () => {
    let calculatedAmount = 0;
    try {
      const sanitized = amount.replace(/[^-()\d/*+.]/g, "");
      calculatedAmount = parseFloat(new Function(`return ${sanitized}`)());
    } catch (e) {
      Alert.alert("Error", "Format hitungan salah.");
      return;
    }

    if (!calculatedAmount || calculatedAmount <= 0) {
      Alert.alert("Error", "Masukkan nominal yang valid");
      return;
    }
    if (!selectedWallet || selectedCategory.name === "Pilih Kategori") {
      Alert.alert("Error", "Lengkapi data dompet dan kategori");
      return;
    }

    try {
      const balanceChange = type === "expense" ? -calculatedAmount : calculatedAmount;

      await db.runAsync(
        `INSERT INTO transactions (type, amount, wallet_name, wallet_icon, category_name, category_icon, note, date, exclude_from_report) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          type,
          calculatedAmount,
          selectedWallet.name,
          selectedWallet.icon,
          selectedCategory.name,
          selectedCategory.icon,
          note,
          date.toISOString(),
          excludeFromReport ? 1 : 0,
        ],
      );

      await db.runAsync(
        "UPDATE wallets SET balance = balance + ? WHERE id = ?",
        [balanceChange, selectedWallet.id],
      );

      Alert.alert("Berhasil", "Transaksi disimpan!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Gagal menyimpan transaksi. Pastikan database tersedia.");
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaksi Baru</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.saveBtn, { opacity: amount && amount !== "0" ? 1 : 0.5 }]}>Simpan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setIsKeypadVisible(false)}
      >
        <View style={styles.typeSelector}>
          {["expense", "income"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              style={[styles.typeBtn, type === t && (t === "expense" ? { backgroundColor: '#ff4757' } : { backgroundColor: '#2ecc71' })]}
            >
              <Text style={[styles.typeLabel, type === t && { color: '#FFF' }]}>
                {t === "expense" ? "Pengeluaran" : "Pemasukan"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsKeypadVisible(true)}
          style={[styles.inputSection, isKeypadVisible && { borderBottomWidth: 2, borderBottomColor: type === 'expense' ? '#ff4757' : '#2ecc71' }]}
        >
          <Text style={styles.label}>Jumlah Nominal</Text>
          <View style={styles.amountInputRow}>
            <Text style={[styles.currency, { color: type === 'expense' ? '#ff4757' : '#2ecc71' }]}>Rp</Text>
            <Text numberOfLines={1} style={[keypadStyles.amountText, { color: amount ? "#1A1A1A" : "#CCC" }]}>
              {formatRibuan(amount)}
            </Text>
            {isKeypadVisible && <Check size={20} color="#2ecc71" onPress={() => setIsKeypadVisible(false)} />}
          </View>
        </TouchableOpacity>

        <View style={styles.formSection}>
          <TouchableOpacity
            style={styles.formItem}
            onPress={() => { setIsKeypadVisible(false); openPicker("wallet"); }}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>{selectedWallet?.icon || "❓"}</Text>
            </View>

            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Metode Pembayaran</Text>

              <Text style={styles.itemValue}>
                {selectedWallet?.name || "Pilih Dompet"}
              </Text>

              {selectedWallet && (
                <Text style={styles.itemSubValue}>
                  Saldo: Rp {selectedWallet.balance.toLocaleString("id-ID")}
                </Text>
              )}
            </View>

            <ChevronRight size={18} color="#D1D1D1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.formItem} onPress={() => { setIsKeypadVisible(false); openPicker("category"); }}>
            <View style={styles.iconCircle}><Text style={{ fontSize: 18 }}>{selectedCategory.icon}</Text></View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Kategori</Text>
              <Text style={styles.itemValue}>{selectedCategory.name}</Text>
            </View>
            <ChevronRight size={18} color="#D1D1D1" />
          </TouchableOpacity>

          <View style={styles.formItem}>
            <View style={styles.iconCircle}><Notebook size={20} color="#1A1A1A" strokeWidth={1.5} /></View>
            <TextInput
              style={[styles.itemContent, { fontSize: 15, color: "#1A1A1A" }]}
              placeholder="Tambahkan catatan..."
              value={note}
              onChangeText={setNote}
              onFocus={() => setIsKeypadVisible(false)}
            />
          </View>

          <TouchableOpacity style={styles.formItem} onPress={() => { setIsKeypadVisible(false); setShowDatePicker(true); }}>
            <View style={styles.iconCircle}><Calendar size={20} color="#1A1A1A" strokeWidth={1.5} /></View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Tanggal</Text>
              <Text style={styles.itemValue}>{date.toLocaleDateString("id-ID", { dateStyle: "long" })}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isKeypadVisible && (
        <View style={[keypadStyles.container, { borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1000 }]}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
              {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["000", "0", "DEL"]].map((row, i) => (
                <View key={i} style={keypadStyles.row}>
                  {row.map((k) => (
                    <TouchableOpacity key={k} style={[keypadStyles.key, { width: "30%" }]} onPress={() => handleKeyPress(k)}>
                      {k === "DEL" ? <X size={22} color="#e74c3c" /> : <Text style={keypadStyles.keyText}>{k}</Text>}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
            <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: "#EEE" }}>
              {["/", "*", "-", "+", "="].map((op) => (
                <TouchableOpacity
                  key={op}
                  style={[keypadStyles.key, { width: "100%", backgroundColor: op === "=" ? "#2ecc71" : "transparent" }]}
                  onPress={() => handleKeyPress(op)}
                >
                  <Text style={[keypadStyles.keyText, { color: op === "=" ? "#FFF" : "#2ecc71" }]}>{op}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

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
                  : dbCategories.filter((c) => c.type === type)
              }
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
                      if (modalVisible.type === "wallet") setSelectedWallet(item);
                      else setSelectedCategory(item);
                      setModalVisible({ ...modalVisible, show: false });
                    }}
                  >
                    <Text style={styles.pickerIcon}>{item.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.pickerText}>{item.name}</Text>
                      {modalVisible.type === "wallet" && (
                        <Text style={{ fontSize: 10, color: "#999" }}>
                          Saldo: Rp {item.balance.toLocaleString("id-ID")}
                        </Text>
                      )}
                    </View>
                    {isSelected && <Check size={18} color="#2ecc71" />}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#999' }}>Kategori belum dibuat.</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible({ ...modalVisible, show: false });
                      router.push("../categories");
                    }}
                  >
                    <Text style={{ color: '#2ecc71', marginTop: 10 }}>Tambah Sekarang</Text>
                  </TouchableOpacity>
                </View>
              )}
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
