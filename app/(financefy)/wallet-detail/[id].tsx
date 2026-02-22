import { db } from "@/app/services/database";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, TrendingDown, TrendingUp } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WalletDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [wallet, setWallet] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const wData: any = await db.getFirstAsync("SELECT * FROM wallets WHERE id = ?", [id as string]);
            setWallet(wData);

            const tData: any[] = await db.getAllAsync(
                "SELECT * FROM transactions WHERE wallet_name = ? ORDER BY date DESC",
                [wData.name as string]
            );
            setTransactions(tData);
        } catch (error) {
            console.error("Error loading wallet detail:", error);
        }
    };

    const formatCurrency = (val: number) => "Rp " + val.toLocaleString("id-ID");

    if (!wallet) return <View style={styles.container}><Text>Loading...</Text></View>;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.navigate("../")}>
                    <ChevronLeft color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{wallet.name}</Text>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.iconBig}>{wallet.icon}</Text>
                <Text style={styles.label}>Saldo Saat Ini</Text>
                <Text style={styles.amount}>{formatCurrency(wallet.balance)}</Text>
            </View>

            <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.transCard}>
                        <View style={[styles.typeIcon, { backgroundColor: item.type === 'income' ? '#2ecc7120' : '#e74c3c20' }]}>
                            {item.type === 'income' ?
                                <TrendingDown color="#2ecc71" size={20} /> :
                                <TrendingUp color="#e74c3c" size={20} />
                            }
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.transNote}>{item.note || item.category_name}</Text>
                            <Text style={styles.transDate}>{item.date}</Text>
                        </View>
                        <Text style={[styles.transAmount, { color: item.type === 'income' ? '#2ecc71' : '#e74c3c' }]}>
                            {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Belum ada transaksi di dompet ini.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 50, marginBottom: 20 },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    balanceCard: { backgroundColor: '#1a1a1a', padding: 30, borderRadius: 20, alignItems: 'center', marginBottom: 25 },
    iconBig: { fontSize: 40, marginBottom: 10 },
    label: { color: '#aaa', fontSize: 14 },
    amount: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
    sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
    transCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', padding: 15, borderRadius: 15, marginBottom: 10 },
    typeIcon: { padding: 10, borderRadius: 12 },
    transNote: { color: '#fff', fontSize: 15, fontWeight: '500' },
    transDate: { color: '#666', fontSize: 12 },
    transAmount: { fontSize: 15, fontWeight: 'bold' },
    emptyText: { color: '#666', textAlign: 'center', marginTop: 20 }
});