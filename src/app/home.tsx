import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import { api } from "@/services/api"
import { Categories, ICategories } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { router } from "expo-router";

type MarketProps = PlaceProps & {
    latitude: number;
    longitude: number;
};

const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494
}

export default function Home() {
    const [categories, setCategories] = useState<ICategories>([]);
    const [category, setCategory] = useState<string>("");
    const [markets, setMarkets] = useState<MarketProps[]>([]);
    // const [currentLocation, setCurrentLocation] = useState({})

    async function fetchCategories() {
        try {
            const { data } = await api.get<ICategories>("/categories");
            setCategories(data);
            setCategory(data[0].id);
        } catch (error) {
            console.error('[FETCH CATEGORIES ERROR]', error);
            Alert.alert("Categorias", "Não foi possível carregar as categorias :(");
        }
    }

    async function fetchPlaces() {
        try {
            if (!category) return;

            const { data } = await api.get<MarketProps[]>('/markets/category/' + category);
            setMarkets(data);
        } catch (error) {
            console.error('[FETCH PLACES ERROR]', error);
            Alert.alert("Locais", "Não foi possível carregar os locais :(")
        }
    }

    async function getLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();

            if (granted) {
                const location = await Location.getCurrentPositionAsync();
                console.log(location)
            }
        } catch (error) {
            console.error('[GET LOCATION ERROR]', error);
            Alert.alert("Localização", "Não foi possível usar a localização :(")
        }
    }

    useEffect(() => {
        fetchCategories();
        getLocation()
    }, [])

    useEffect(() => {
        fetchPlaces();
    }, [category])

    return (
        <View style={{ flex: 1, backgroundColor: '#CECECE' }}>
            <Categories data={categories} selected={category} onSelected={setCategory} />

            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <Marker
                    identifier="current"
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    }}
                    image={require("@/assets/location.png")}
                />

                {
                    markets.map((item) => (
                        <Marker
                            key={item.id}
                            identifier={item.id}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude
                            }}
                            image={require("@/assets/pin.png")}
                        >
                            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: colors.gray[600],
                                            fontFamily: fontFamily.medium
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: colors.gray[600],
                                            fontFamily: fontFamily.regular
                                        }}
                                    >
                                        {item.address}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))
                }
            </MapView>

            <Places data={markets} />
        </View>
    )
}