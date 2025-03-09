import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useLoadData } from "@/hooks/useLoadData";
import { handleTheme } from "@/hooks/useContextTheme";
import { Loading } from "@/components/index-screen/Loading";
import { router } from "expo-router";

export default function Index() {
	const { colors, getTheme } = handleTheme()
	const { isDataLoading, percentage } = useLoadData()
	const [loaded] = useFonts({
		'audiowide': require('@/assets/fonts/Audiowide-Regular.ttf'),
		'bakbakone': require('@/assets/fonts/BakbakOne-Regular.ttf')
	})

	useEffect(() => {
		console.log('theme loading')
		getTheme()
	}, [])

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
		else SplashScreen.preventAutoHideAsync()
	}, [loaded]);

	

	if (!loaded) {
		return <View style={{ flex: 1, backgroundColor: colors.background }} />
	}

	return <Loading isDataLoading={isDataLoading} percentage={percentage} />

}

