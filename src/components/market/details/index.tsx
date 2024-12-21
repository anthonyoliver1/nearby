import { View, Text } from "react-native";

import { Phone, MapPin, Ticket } from "lucide-react-native";

import { styles } from "./styles";
import { Info } from "../info";

export type PropsDetails = {
    address: string;
    categoryId: string;
    coupons: number;
    cover: string;
    description: string;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    phone: string;
    rules: Rule[];
}

type Rule = {
    description: string;
    id: string;
    marketId: string;
}


type Props = {
    data: PropsDetails;
}

export function Details({ data }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.description}>{data.description}</Text>

            <View style={styles.group}>
                <Text style={styles.title}>Informações</Text>

                <Info icon={Ticket} description={`${data.coupons} cupons disponíveis`} />
                <Info icon={MapPin} description={data.address} />
                <Info icon={Phone} description={data.phone} />
            </View>

            <View style={styles.group}>
                <Text style={styles.title}>Regulamento</Text>

                {data.rules.map((item) => (
                    <Text
                        key={item.id}
                        style={styles.rule}
                    >
                        {`\u2022 ${item.description}`}
                    </Text>
                ))

                }
            </View>
        </View>
    )
}