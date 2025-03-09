import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { Footer } from "@/components/Footer";
import { Body } from "@/components/index-screen/Body";
import { Header } from "@/components/index-screen/Header";
import { handleTheme } from "@/hooks/useContextTheme";
import { StatusBar } from "react-native";

export default function Home() {
	const { colors } = handleTheme()
	return (
		<CustomSafeAreaView>
			<StatusBar barStyle='light-content' backgroundColor={colors.primary} />
			<Header />
			<Body />
			<Footer menuActif='home' />
		</CustomSafeAreaView>
	)
}