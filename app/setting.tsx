import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { CustomText } from "@/components/CustomText";
import { Footer } from "@/components/Footer";
import { HeaderSimple } from "@/components/HeaderSimple";
import { FeedBack } from "@/components/setting-screen/FeedBack";
import { SettingComponent } from "@/components/setting-screen/SettingComponent";
import { ThemeItem } from "@/components/setting-screen/ThemeItem";
import { PADDING } from "@/constants/PADDING";
import { handleTheme } from "@/hooks/useContextTheme";
import { useUpdateData } from "@/hooks/useUpdateData";
import { rgbaColor } from "@/tools/rgbaColor";
import { ActivityIndicator,Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function Setting() {
	const { colors } = handleTheme()
	const { stateUpdateSong, stateUpdatePartitions, updateSongJson, updatePartitions } = useUpdateData()
	return (
		<CustomSafeAreaView>
			<HeaderSimple title='kirakira' />
			<ScrollView style={styles.container}>
				<SettingComponent title='theme' style={{ paddingVertical: 8 }}>
					<ThemeItem currentTheme='light' icon='light-up' />
					<ThemeItem currentTheme='dark' icon='moon' style={[styles.theme, { borderColor: rgbaColor(colors.grayLight, 0.3) }]} />
					<ThemeItem currentTheme='auto' icon='adjust' />
				</SettingComponent>
				<View style={{ height: 24 }} />
				<SettingComponent title="haka hira vaovao" style={{ gap: 24, paddingVertical: 24, paddingHorizontal: 8 }}>
					<View style={{ gap: 16 }}>
						<CustomText variant='body1' color='grayDark'>1. Activeo ny data.</CustomText>
						<CustomText variant='body1' color='grayDark'>1. Tsindrio ny bokotra etsy ambany.</CustomText>
					</View>
					{
						stateUpdatePartitions.isLoading || stateUpdateSong.isLoading ? (
							<View style={[styles.button, { backgroundColor: colors.secondary, opacity: 0.8 }]}>
								<ActivityIndicator color={colors.grayWhite} />
							</View>
						) : (
							<Pressable
								onPress={() => { updateSongJson(), updatePartitions() }}
								style={[styles.button, { backgroundColor: colors.secondary }]}
							>
								<CustomText variant='subtitle2' color='grayWhite'>Haka hira vaovao</CustomText>
							</Pressable>
						)
					}
				</SettingComponent>
				<View style={{ height: 24 }} />
				<FeedBack
					stateUpdateSong={stateUpdateSong}
					stateUpdatePartitions={stateUpdatePartitions}
				/>
			</ScrollView>
			<Footer menuActif='setting' />
		</CustomSafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: PADDING.base,
		paddingVertical: 24
	},
	wrapper: {
		paddingTop: 24,
		gap: 24
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 36,
		borderRadius: 8,
		paddingTop: 4
	},
	theme: {
		borderStyle: 'solid',
		borderTopWidth: 1,
		borderBottomWidth: 1
	}
})