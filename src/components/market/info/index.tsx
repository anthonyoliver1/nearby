import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

import { LucideProps } from "lucide-react-native";
import { colors } from "@/styles/colors";


type Props = {
    description: string;
    icon: React.ComponentType<LucideProps>;
}

export function Info({ description, icon: Icon }: Props) {
    return (
        <View style={styles.container}>
            <Icon size={16} color={colors.gray[400]} />
            <Text style={styles.text}>{description}</Text>
        </View>
    )
}