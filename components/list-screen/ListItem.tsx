import { Song } from "@/tools/type";
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
	song: Song
}
export function ListItem({ type, song }: Props) {
	const colors = useThemeColor()
	return (
		<Link href={{ pathname: '/song', params: { songTitle: song.title, type: type } }} asChild>
			<Pressable
				style={{ borderRadius: 8 }}
				android_ripple={{ color: rgbaColor(colors.grayLight, 0.3), foreground: true }}
			>
				<RowView style={[styles.row, { backgroundColor: colors.grayWhite }]}>
					<CustomText color='grayDark'>{song.title}</CustomText>
					<Entypo name='dots-three-vertical' size={8} color={colors.grayDark} />
				</RowView>
			</Pressable>
		</Link>
	)
}
const styles = StyleSheet.create({
	row: {
		height: 36,
		alignItems: 'center',
		justifyContent: 'space-between',
		...SHADOW.base1,
		paddingLeft: 16,
		paddingRight: 12,
		borderRadius: 8
	}
})