import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { LucideProps as LucideIconsProps } from "lucide-react-native";

import { styles } from "./styles";
import { colors } from "@/styles/theme";
import React from "react";

type ButtonProps = TouchableOpacityProps & {
    isLoading?: boolean
}

type IconProps = {
    icon: React.ComponentType<LucideIconsProps>
}

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            activeOpacity={.8}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? <ActivityIndicator size="small" color={colors.gray[100]} /> : children}
        </TouchableOpacity>
    )
}

function Title({ children }: TextProps) {
    return <Text style={styles.title}>{children}</Text>
}

function Icon({ icon: Icon }: IconProps) {
    return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title;
Button.Icon = Icon;

export { Button }