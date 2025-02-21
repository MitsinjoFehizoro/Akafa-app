import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { CustomText } from "@/components/CustomText";
import { Footer } from "@/components/Footer";
import { HeaderSimple } from "@/components/HeaderSimple";
import { Congratulation } from "@/components/setting-screen/Congratulation";
import { SettingComponent } from "@/components/setting-screen/SettingComponent";
import { ThemeItem } from "@/components/setting-screen/ThemeItem";
import { PADDING } from "@/constants/PADDING";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUpdateData } from "@/hooks/useUpdateData";
import { Button, Pressable, StyleSheet, View } from "react-native";

export default function Setting() {
	const colors = useThemeColor()
	const { stateUpdateSong, stateUpdatePartitions, updateSongJson, updateParitions } = useUpdateData()
	return (
		<CustomSafeAreaView>
			<HeaderSimple title='kirakira' />
			<View style={styles.container}>
				<SettingComponent title='theme'>
					<ThemeItem />
					<ThemeItem isWithBorder={true} />
					<ThemeItem />
				</SettingComponent>
				<SettingComponent title="haka hira vaovao" style={{ gap: 24 }}>
					<View style={{ gap: 16 }}>
						<CustomText variant='body1' color='grayDark'>1. Activeo ny data.</CustomText>
						<CustomText variant='body1' color='grayDark'>1. Tsindrio ny bokotra etsy ambany.</CustomText>
					</View>
					<Pressable
						onPress={() => updateSongJson()}
						style={[styles.button, { backgroundColor: colors.secondary }]}>
						<CustomText variant='subtitle3' color='grayWhite'>Mettre à jour</CustomText>
					</Pressable>
				</SettingComponent>
				<Congratulation />
			</View>
			<Footer />
		</CustomSafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: PADDING.base,
		paddingVertical: 24,
		gap: 24
	},
	wrapper: {
		paddingTop: 24,
		gap: 24
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 36,
		borderRadius: 8
	}
})