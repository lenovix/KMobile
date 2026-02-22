import { useRouter } from "expo-router";
import { ChevronLeft, Plus, Trash2, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../../services/database";

export default function CategoriesScreen() {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");
    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState("");
    const [icon, setIcon] = useState("🏷️");

    useEffect(() => { fetchCategories(); }, [activeTab]);

    const fetchCategories = async () => {
        const res: any[] = await db.getAllAsync(
            "SELECT * FROM categories WHERE type = ?", [activeTab]
        );
        setCategories(res);
    };

    const handleAdd = async () => {
        if (!name) return Alert.alert("Error", "Nama kategori wajib diisi");
        await db.runAsync(
            "INSERT INTO categories (name, icon, type) VALUES (?, ?, ?)",
            [name, icon, activeTab]
        );
        setName("");
        setModalVisible(false);
        fetchCategories();
    };

    const handleDelete = (id: number) => {
        Alert.alert("Hapus Kategori", "Yakin ingin menghapus ini?", [
            { text: "Batal" },
            {
                text: "Hapus", style: "destructive", onPress: async () => {
                    await db.runAsync("DELETE FROM categories WHERE id = ?", [id]);
                    fetchCategories();
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}><ChevronLeft color="#FFF" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Kelola Kategori</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}><Plus color="#2ecc71" /></TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                {(['expense', 'income'] as const).map((t) => (
                    <TouchableOpacity
                        key={t}
                        onPress={() => setActiveTab(t)}
                        style={[styles.tab, activeTab === t && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, activeTab === t && styles.activeTabText]}>
                            {t === 'expense' ? 'Pengeluaran' : 'Pemasukan'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.iconText}>{item.icon}</Text>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Trash2 size={18} color="#e74c3c" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Modal visible={modalVisible} animationType="fade" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Kategori Baru ({activeTab})</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}><X size={24} color="#333" /></TouchableOpacity>
                        </View>
                        <TextInput
                            placeholder="Ikon (Emoji)"
                            style={styles.input}
                            value={icon}
                            onChangeText={setIcon}
                            maxLength={2}
                        />
                        <TextInput
                            placeholder="Nama Kategori"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                        <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
                            <Text style={styles.saveBtnText}>Tambah Kategori</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, marginBottom: 20 },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    tabContainer: { flexDirection: 'row', backgroundColor: '#1a1a1a', borderRadius: 12, padding: 5, marginBottom: 20 },
    tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
    activeTab: { backgroundColor: '#2ecc71' },
    tabText: { color: '#999', fontWeight: 'bold' },
    activeTabText: { color: '#FFF' },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', padding: 15, borderRadius: 15, marginBottom: 10 },
    iconText: { fontSize: 22, marginRight: 15 },
    nameText: { flex: 1, color: '#FFF', fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: '#FFF', borderRadius: 20, padding: 20 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold' },
    input: { backgroundColor: '#F5F7F8', padding: 15, borderRadius: 12, marginBottom: 15 },
    saveBtn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 12, alignItems: 'center' },
    saveBtnText: { color: '#FFF', fontWeight: 'bold' }
});