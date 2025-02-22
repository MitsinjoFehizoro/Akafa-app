import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { CustomText } from "@/components/CustomText";
import { Footer } from "@/components/Footer";
import { HeaderSimple } from "@/components/HeaderSimple";
import { BigLogo, ThirdLogo } from "@/components/index-screen/Logo";
import { AkafaProfil } from "@/components/info-screen/AkafaProfil";
import { DevProfil } from "@/components/info-screen/DevProfil";
import { LinkProfil } from "@/components/info-screen/LinkProfil";
import { RowView } from "@/components/RowView";
import { SettingComponent } from "@/components/setting-screen/SettingComponent";
import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Info() {
	const colors = useThemeColor()
	const insets = useSafeAreaInsets();
	return (
		<CustomSafeAreaView>
			<RowView style={[styles.header, { backgroundColor: colors.primary, top: insets.top }]}>
				<Pressable
					style={[styles.back, {backgroundColor : colors.primary}]}
					onPress={router.back}
					android_ripple={{ color: rgbaColor(colors.secondary, 0.3), foreground: true }}
				>
					<FontAwesome6 name='arrow-left' size={18} color={colors.grayWhite} />
				</Pressable>
				<BigLogo />
			</RowView>
			<ScrollView style={styles.body}>
				<View style={styles.wrapper}>
					<AkafaProfil />
					<DevProfil />
				</View>
			</ScrollView>
			<Footer />
		</CustomSafeAreaView>
	)
}

const styles = StyleSheet.create({
	body: {
		flex: 1
	},
	header: {
		position: 'absolute',
		width: '100%',
		paddingBottom : 56,
		justifyContent: 'flex-end'
	},
	back: {
		position: 'absolute',
		top : 8,
		left : 16,
		zIndex:1,
		width: 32, height: 32,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: "center",
		overflow: 'hidden'
	},
	wrapper: {
		paddingTop: 92,
		paddingBottom: 64,
		paddingHorizontal: 16,
		gap: 24
	},
})