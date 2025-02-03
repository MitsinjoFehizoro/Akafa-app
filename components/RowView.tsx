import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
	gap?: number
}
export function RowView({ style, gap, ...rest }: Props) {
	return <View style={[style, styles.row, { gap: gap ?? undefined }]} {...rest} />
}
const styles = StyleSheet.create({
	row: {
		flexDirection: 'row', alignItems: 'center'
	}
})