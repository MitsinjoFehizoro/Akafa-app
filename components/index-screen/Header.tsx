import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { PADDING } from "@/constants/PADDING";
import { CountSong } from "./CountSoung";
import { RowView } from "../RowView";
import { Logo } from "./Logo";
import { Song } from "@/tools/type";
import { DATASONGS } from "@/constants/DATASONGS";

export function Header() {
	const colors = useThemeColor()

	//A modifier rehefa misy mis a jour
	const countSoung = DATASONGS.length
	const countPartition = DATASONGS.filter(s => s.partition.isPartition === true).length

	return (
		<RowView style={[styles.container, { backgroundColor: colors.primary }]}>
			<Logo />
			<RowView>
				<CountSong icon='mic' count={countSoung} />
				<CountSong icon='note' count={countPartition} />
			</RowView>
		</RowView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: PADDING.base,
		paddingVertical: 8,
		position: 'relative',
		justifyContent: 'space-between',
	}
})
