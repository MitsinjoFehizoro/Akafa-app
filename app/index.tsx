import { StatusBar, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { Header } from "@/components/index-screen/Header";
import { Body } from "@/components/index-screen/Body";
import { Footer } from "@/components/Footer";
import { CustomText } from "@/components/CustomText";


export default function Index() {
	const colors = useThemeColor()
	const [loaded] = useFonts({
		'audiowide': require('@/assets/fonts/Audiowide-Regular.ttf'),
		'bakbakone': require('@/assets/fonts/BakbakOne-Regular.ttf')
	})

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
		else SplashScreen.preventAutoHideAsync()
	}, [loaded]);

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

