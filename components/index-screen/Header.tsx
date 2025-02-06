import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { PADDING } from "@/constants/PADDING";
import { CountSong } from "./CountSoung";
import { RowView } from "../RowView";
import { Logo } from "./Logo";

export function Header() {
	const colors = useThemeColor()
	return (
		<RowView style={[styles.container, { backgroundColor: colors.primary }]}>
			<Logo />
			<RowView>
				<CountSong icon='mic' count={128} />
				<CountSong icon='note' count={110} />
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
