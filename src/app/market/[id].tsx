import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

import { ScanLineIcon } from "lucide-react-native";

import { api } from "@/services/api";

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/info/coupon";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
    cover: string;
};

export default function Market() {
    const params = useLocalSearchParams<{ id: string }>();
    const [_, requestPermission] = useCameraPermissions();

    const [data, setData] = useState<DataProps>();
    const [coupon, setCoupon] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState<boolean>(false);
    const [couponIsFetching, setCouponIsFetching] = useState<boolean>(false);

    const scanRef = useRef(false);

    console.log(params)

    async function fetchMarket() {
        try {
            const { data } = await api.get<DataProps>('/markets/' + params.id);
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('[FETCH MARKET ERROR]', error);
            Alert.alert(
                "Erro",
                "Não foi possível carregar os dados :(",
                [
                    {
                        text: 'Ok',
                        onPress: () => router.back()
                    }
                ]
            )
        }
    }

    async function handleOpenCamera() {
        try {
            const { granted } = await requestPermission();

            if (!granted) {
                return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera");
            }

            setIsVisibleCameraModal(true);
            scanRef.current = false;
        } catch (error) {
            console.error('[HANDLE OPEN CAMERA ERROR]', error);
            Alert.alert("Câmera", "Não foi possível utilizar a câmera");
        }
    }

    async function getCoupon(id: string) {
        try {
            const { data } = await api.patch(`/coupons/${id}`);

            console.log(data)
            Alert.alert("Cupom", data.coupon);
            setCoupon(data.coupon)
            setCouponIsFetching(true);
        } catch (error) {
            console.error('[GET COUPON ERROR]', error);
            Alert.alert("Erro", "Não foi possível utilizar o cupom :(");
        } finally {
            setCouponIsFetching(false);
        }
    }

    function handleUseCoupon(id: string) {
        setIsVisibleCameraModal(false);

        Alert.alert(
            "Cupom",
            "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom ?",
            [
                { style: "cancel", text: "Não" },
                { text: "Sim", onPress: () => getCoupon(id) }

            ]
        )
    }

    useEffect(() => {
        fetchMarket();

    }, [params.id, coupon])

    if (isLoading) return <Loading />
    if (!data) return <Redirect href="/home" />

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="default" hidden={isVisibleCameraModal} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data.cover} />
                <Details data={data} />
                {coupon && <Coupon code={coupon} />}
            </ScrollView>

            <View style={{ padding: 32 }}>
                <Button onPress={handleOpenCamera}>
                    <Button.Icon icon={ScanLineIcon} />
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    autofocus="on"
                    onBarcodeScanned={({ data }) => {
                        if (data && !scanRef.current) {
                            scanRef.current = true;

                            handleUseCoupon(data);
                        }
                    }}
                />
                <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>

                    <Button
                        onPress={() => setIsVisibleCameraModal(false)}
                        isLoading={couponIsFetching}
                    >
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}