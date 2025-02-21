import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font";
import { useContext, useEffect } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { Header } from "@/components/index-screen/Header";
import { Body } from "@/components/index-screen/Body";
import { Footer } from "@/components/Footer";
import { useLoadData } from "@/hooks/useLoadData";
import { useContextGetAllSongs } from "@/hooks/useContextGetAllSongs";

export default function Index() {
	const colors = useThemeColor()
	const { dataLoaded } = useLoadData()
	const [loaded] = useFonts({
		'audiowide': require('@/assets/fonts/Audiowide-Regular.ttf'),
		'bakbakone': require('@/assets/fonts/BakbakOne-Regular.ttf')
	})


	useEffect(() => {
		if (loaded && dataLoaded.song && dataLoaded.partition) SplashScreen.hideAsync();
		else SplashScreen.preventAutoHideAsync()
	}, [loaded, dataLoaded]);

	if (!loaded) {
		return <View />;
	}

	return (
		<CustomSafeAreaView>
			<StatusBar barStyle='light-content' backgroundColor={colors.primary} />
			<Header />
			<Body />
			<Footer />
		</CustomSafeAreaView>
	);
}

