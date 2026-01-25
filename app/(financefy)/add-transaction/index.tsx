import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import {
    Calendar,
    Check,
    ChevronRight,
    Notebook,
    X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";

// --- DATA DUMMY ---
const WALLETS = [
  { id: "1", name: "Cash", icon: "💵" },
  { id: "2", name: "Bank BCA", icon: "🏦" },
  { id: "3", name: "E-Wallet (Gopay)", icon: "📱" },
];

const CATEGORIES = [
  { id: "1", name: "Makanan", icon: "🍔", type: "expense" },
  { id: "2", name: "Transportasi", icon: "🚗", type: "expense" },
  { id: "3", name: "Gaji", icon: "💰", type: "income" },
  { id: "4", name: "Hiburan", icon: "🎬", type: "expense" },
  { id: "5", name: "Kesehatan", icon: "💊", type: "expense" },
];

export default function AddTransactionScreen() {
  const router = useRouter();

  // States
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [excludeFromReport, setExcludeFromReport] = useState(false);

  // Selection States
  const [selectedWallet, setSelectedWallet] = useState(WALLETS[0]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Pilih Kategori",
    icon: "✨",
  });

  // UI States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState<{
    show: boolean;
    type: "wallet" | "category";
  }>({ show: false, type: "wallet" });

  const openPicker = (pickerType: "wallet" | "category") => {
    setModalVisible({ show: true, type: pickerType });
  };

  const renderPickerItem = ({ item }: any) => {
    const isSelected =
      modalVisible.type === "wallet"
        ? selectedWallet.name === item.name
        : selectedCategory.name === item.name;

    return (
      <TouchableOpacity
        style={[styles.pickerItem, isSelected && styles.pickerItemActive]}
        onPress={() => {
          if (modalVisible.type === "wallet") setSelectedWallet(item);
          else setSelectedCategory(item);
          setModalVisible({ ...modalVisible, show: false });
        }}
      >
        <Text style={styles.pickerIcon}>{item.icon}</Text>
        <Text style={styles.pickerText}>{item.name}</Text>
        {isSelected && <Check size={18} color="#2ecc71" />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={20}>
          <X color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaksi Baru</Text>
        <TouchableOpacity onPress={() => console.log("Save")}>
          <Text style={styles.saveBtn}>Simpan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* TYPE SELECTOR */}
        <View style={styles.typeSelector}>
          {["expense", "income", "debt"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              style={[styles.typeBtn, type === t && styles.typeBtnActive]}
            >
              <Text
                style={[styles.typeLabel, type === t && styles.typeLabelActive]}
              >
                {t === "expense"
                  ? "Keluar"
                  : t === "income"
                    ? "Masuk"
                    : "Hutang"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* INPUT NOMINAL */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Jumlah Nominal</Text>
          <View style={styles.amountInputRow}>
            <Text style={styles.currency}>Rp</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>
        </View>

        {/* FORM ITEMS */}
        <View style={styles.formSection}>
          {/* Picker Wallet */}
          <TouchableOpacity
            style={styles.formItem}
            onPress={() => openPicker("wallet")}
          >
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>{selectedWallet.icon}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Metode Pembayaran</Text>
              <Text style={styles.itemValue}>{selectedWallet.name}</Text>
            </View>
            <ChevronRight size={18} color="#D1D1D1" />
          </TouchableOpacity>

          {/* Picker Category */}
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
              Transaksi ini tidak akan masuk dalam kalkulasi budget bulanan.
            </Text>
          </View>
          <Switch
            value={excludeFromReport}
            onValueChange={setExcludeFromReport}
            trackColor={{ false: "#EEEEEE", true: "#2ecc71" }}
          />
        </View>
      </ScrollView>

      {/* MODAL PICKER (BOTTOM SHEET STYLE) */}
      <Modal visible={modalVisible.show} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {" "}
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
                  ? WALLETS
                  : CATEGORIES.filter((c) =>
                      type === "expense"
                        ? c.type === "expense"
                        : c.type === "income",
                    )
              }
              renderItem={renderPickerItem}
              keyExtractor={(item) => item.id}
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
