import { PopupAndSong, Song } from "@/tools/type";
import { RowView } from "../RowView";
import { Pressable, StyleSheet } from "react-native";
import { SHADOW } from "@/constants/SHADOW";
import { CustomText } from "../CustomText";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { rgbaColor } from "@/tools/rgbaColor";


type Props = {
	type: string,
	song: Song,
	setShowPopupAndSetSelectedSong: (p: PopupAndSong) => void
}
export function ListItem({ type, song, setShowPopupAndSetSelectedSong }: Props) {
	const colors = useThemeColor()
	return (
		<Link href={{ pathname:type === 'tononkira' ? '/lyrics' :  '/partition', params: { songTitle: song.title, type: type } }} asChild >
			<Pressable
				style={{ borderRadius: 8 }}
				android_ripple={{ color: rgbaColor(colors.grayLight, 0.3), foreground: true }}
			>
				<RowView style={[styles.row, { backgroundColor: colors.grayWhite }]}>
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
		...SHADOW.base2,
		paddingHorizontal :16,
		borderRadius: 8
	},
	pressable: {
		width: 32, height: 32,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: "center",
		overflow: 'hidden'
	}
})