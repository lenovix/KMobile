import * as Haptics from "expo-haptics";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
    icon: any;
    title: string;
    subtitle?: string;
    onPress: () => void;
    color?: string;
}

export const MenuItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    color = "#333",
}: MenuItemProps) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <TouchableOpacity style={styles.menuItem} onPress={handlePress} activeOpacity={0.7}>
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
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    menuText: {
        flex: 1,
        marginLeft: 12,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    menuSubtitle: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },
});