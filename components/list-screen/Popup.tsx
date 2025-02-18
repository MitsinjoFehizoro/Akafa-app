import { PADDING } from "@/constants/PADDING";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Entypo } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { RowView } from "../RowView";
import { CustomText } from "../CustomText";
import { ItemAllSong } from "../index-screen/ItemAllSong";
import { rgbaColor } from "@/tools/rgbaColor";
import { Logo, SecondLogo } from "../index-screen/Logo";
import { PopupAndSong } from "@/tools/type";

type PropsPopup = {
	showPopupAndSelectedSong: PopupAndSong,
	setShowPopupAndSetSelectedSong: (p: PopupAndSong) => void
}
export function Popup({ showPopupAndSelectedSong, setShowPopupAndSetSelectedSong }: PropsPopup) {
	const colors = useThemeColor()
	return (
		<Modal transparent visible={showPopupAndSelectedSong.isShowPopup} animationType='slide'>
			<Pressable style={styles.pressable} onPress={() => setShowPopupAndSetSelectedSong({ isShowPopup: false, selectedSong: '' })} />
			<View style={styles.container}>
				<Pressable style={[styles.geste, { backgroundColor: colors.grayWhite }]} onPress={() => setShowPopupAndSetSelectedSong({ isShowPopup: false, selectedSong: '' })} />
				<View style={[styles.popup, { backgroundColor: colors.grayWhite }]}>
					<View style={styles.logo}>
						<SecondLogo />
					</View>
					<View style={{ borderColor: rgbaColor(colors.grayLight, 0.4) }} >
						<ItemAllSong
							pathname='/lyrics'
							type='tononkira'
							icon='mic'
							songTitle={showPopupAndSelectedSong.selectedSong}
						/>
						<ItemAllSong
							pathname='/partition'
							type='solfa'
							icon='note'
							songTitle={showPopupAndSelectedSong.selectedSong}
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	pressable: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0, 0.4)'
	},
	container: {
		position: 'absolute',
		right: 0, bottom: 0,
		width: '100%',
		gap: 12,
	},
	geste: {
		width: 72,
		height: 6,
		borderRadius: 8,
		alignSelf: 'center'
	},
	popup: {
		paddingHorizontal: 36,
		paddingVertical: 44,
		borderTopStartRadius: 16,
		borderTopEndRadius: 16,
	},
	logo: {
		alignItems: 'center',
		paddingBottom: 24,
	}
})