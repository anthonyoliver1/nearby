import { Text, View } from "react-native";
import { styles } from "./style";
import { Ticket } from "lucide-react-native";
import { colors } from "@/styles/colors";

type Props = {
    code: string;
}

export function Coupon({ code }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Utilize esse cupom</Text>

            <View style={styles.content}>
                <Ticket size={24} color={colors.green.light} />
                <Text style={styles.code}>{code}</Text>
            </View>
        </View>
    )
}