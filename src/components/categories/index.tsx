import { FlatList, View } from "react-native";
import { Category } from "../category";
import { styles } from "./styles";

export type ICategories = {
    id: string;
    name: string;
}[]

type Props = {
    data: ICategories;
    selected: string;
    onSelected: (id: string) => void;
}

export function Categories({ data, selected, onSelected }: Props) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={
                ({ item }) => <Category
                    name={item.name}
                    iconId={item.id}
                    onPress={() => onSelected(item.id)}
                    isSelected={selected === item.id}
                />
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.content}
            style={styles.container}
        />
    )
}