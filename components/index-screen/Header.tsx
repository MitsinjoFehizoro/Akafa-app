import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { PADDING } from "@/constants/PADDING";
import { CountSong } from "./CountSoung";
import { RowView } from "../RowView";
import { Logo } from "./Logo";
import { useEffect } from "react";
import { useContextGetAllSongs } from "@/hooks/useContextGetAllSongs";
import { useGetSongs } from "@/hooks/useGetSongs";

export function Header() {
	const colors = useThemeColor()

	const { allDataSongs, getAllDataSongs } = useContextGetAllSongs()
	useEffect(() => {
		getAllDataSongs()
	}, [])
	
	const { songsWithPartition, getSongsWithPartition } = useGetSongs()
	useEffect(() => {
		getSongsWithPartition()
	}, [allDataSongs])

	return (
		<RowView style={[styles.container, { backgroundColor: colors.primary }]}>
			<Logo />
			<RowView>
				<CountSong icon='mic' count={allDataSongs.length} />
				<CountSong icon='note' count={songsWithPartition.length} />
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
