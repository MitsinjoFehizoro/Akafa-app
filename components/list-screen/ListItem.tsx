import { PopupAndSong, Song } from "@/tools/type";
import { RowView } from "../RowView";
import { Pressable, StyleSheet } from "react-native";
import { CustomText } from "../CustomText";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { rgbaColor } from "@/tools/rgbaColor";
import { handleTheme } from "@/hooks/useContextTheme";
import { useAndroidRipple } from "@/hooks/useAndroidRipple";


type Props = {
	type: string,
	song: Song,
	setShowPopupAndSetSelectedSong: (p: PopupAndSong) => void
}
export function ListItem({ type, song, setShowPopupAndSetSelectedSong }: Props) {
	const { colors, isDark } = handleTheme()
	return (
		<Link href={{ pathname: type === 'tononkira' ? '/lyrics' : '/partition', params: { songTitle: song.title, type: type } }} asChild >
			<Pressable
				style={{ borderRadius: 8, overflow: isDark ? 'hidden' : 'visible' }}
				android_ripple={{...useAndroidRipple()}}
			>
				<RowView style={[styles.row, { backgroundColor: colors.onSecondary, elevation: isDark ? 0 : 4 }]}>
					<CustomText style={{ width: '95%' }} numberOfLines={1} ellipsizeMode='tail' color='grayDark'>{song.title}</CustomText>
					{
						song.isPartition && (
							<Pressable
								style={styles.pressable}
								onPress={() => setShowPopupAndSetSelectedSong({ isShowPopup: true, selectedSong: song.title })}
								android_ripple={{ color: rgbaColor(colors.secondary, 0.3), foreground: true }}
							>
								<Entypo name='dots-three-vertical' size={8} color={colors.grayDark} />
							</Pressable>
						)
					}
				</RowView>
			</Pressable >
		</Link >
	)
}
const styles = StyleSheet.create({
	row: {
		height: 36,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		borderRadius: 8,
		shadowColor: '#BABABA'
	},
	pressable: {
		width: 32, height: 32,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: "center",
		overflow: 'hidden'
	}
})