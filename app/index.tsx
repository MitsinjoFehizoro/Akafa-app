import { StatusBar, View } from "react-native";
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { Header } from "@/components/index-screen/Header";
import { Body } from "@/components/index-screen/Body";
import { Footer } from "@/components/Footer";
import { useLoadData } from "@/hooks/useLoadData";
import { handleTheme } from "@/hooks/useContextTheme";
import { Loading } from "@/components/index-screen/Loading";

export default function Index() {
	const { colors, getTheme } = handleTheme()
	const { isDataLoading, percentage } = useLoadData()
	const [loaded] = useFonts({
		'audiowide': require('@/assets/fonts/Audiowide-Regular.ttf'),
		'bakbakone': require('@/assets/fonts/BakbakOne-Regular.ttf')
	})

	useEffect(() => {
		getTheme()
	}, [])

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
		else SplashScreen.preventAutoHideAsync()
	}, [loaded]);

	if (!loaded) {
		return <View style={{ flex: 1, backgroundColor: colors.background }} />
	}

	return (
		<CustomSafeAreaView>
			{
				isDataLoading ? (
					<Loading percentage={percentage} />
				) : (
					<View style={{ flex: 1 }}>
						<StatusBar barStyle='light-content' backgroundColor={colors.primary} />
						<Header />
						<Body />
						<Footer menuActif='home' />
					</View>
				)
			}

		</CustomSafeAreaView>
	);
}

