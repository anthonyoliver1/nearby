import { Text, View } from "react-native";
import { styles } from "./styles";
import { Step } from "../step";

import {
    MapPin,
    QrCode,
    Ticket
} from "lucide-react-native";

export function Steps() {
    const listSteps = [
        { title: "Encontre estabelecimentos", description: "Veja locais perto de você que são parceiros Nearby", icon: MapPin },
        { title: "Ative o cupom com QR Code", description: "Escaneie o código no estabelecimento para usar o benefício", icon: QrCode },
        { title: "Garanta vantagens perto de você", description: "Ative cupons onde estiver, em diferentes tipos de estabelecimento ", icon: Ticket },
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Veja como funciona:</Text>

            {
                listSteps.map((item, index) => (
                    <Step key={index.toString()} title={item.title} description={item.description} icon={item.icon} />
                ))
            }
        </View>
    )
}