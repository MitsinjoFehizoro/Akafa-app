import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { StyleSheet, TextInput, View } from "react-native"
import { RowView } from "../RowView"
import { handleTheme } from "@/hooks/useContextTheme"

type Props = {
	value: string,
	onChange: (v: string) => void
}
export function SearchBar({ value, onChange }: Props) {
const { colors } = handleTheme()
	return (
		<RowView gap={8} style={[styles.container, { backgroundColor: colors.onSecondary }]}>
			<FontAwesome name='search' size={12} color={colors.primary} />
			<TextInput
				style={[styles.input, {color : colors.grayDark}]}
				value={value}
				onChangeText={onChange}
				placeholder="Hitady..."
				placeholderTextColor={colors.grayDark}
			/>
		</RowView>
	)
}
const styles = StyleSheet.create({
	container: {
		height: 36,
		borderRadius: 36,
		paddingHorizontal: 16
	},
	input: {
		flex: 1,
		fontSize: 10,
		lineHeight: 16,
	}
})