import { PADDING } from "@/constants/PADDING";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";
import { CustomText } from "../CustomText";
import { RowView } from "../RowView";
import { Item } from "./Item";
import { Category } from "./Category";

export function Body() {
	const colors = useThemeColor()
	return (
		<View style={styles.body}>
			{/* All Song */}
			<View style={[styles.allSong, { backgroundColor: colors.grayWhite }]}>
				<CustomText variant='subtitle1' color='primary' style={{ marginBottom: 16 }}>Hira rehetra</CustomText>
				<View style={{ borderColor: colors.grayLightOpaque }} >
					<Item title='Tononkira' count={128} icon='mic' />
					<Item title='Solfa' count={110} icon='note' />
				</View>
			</View>
			{/* Category */}
			<View style={styles.category}>
				<CustomText variant='subtitle1' color='primary' style={{ marginBottom: 2, marginLeft: 4 }}>Fizarana</CustomText>
				<RowView style={styles.rowCategory}>
					<Category icon='adjust' title='fisaorana & fiderana' />
					<Category icon='direction' title='asa & fanoloratena' />
					<Category icon='eraser' title='fifonana & fibebahana' />
					<Category icon='key' title='vavaka & fangatahana' />
				</RowView>
				<RowView style={styles.rowCategory}>
					<Category icon='flag' title='faneva' />
					<Category icon='price-tag' title='noely' />
					<Category icon='spreadsheet' title='paska' />
					<Category icon='colours' title='hafa' />
				</RowView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	body: {
		position: 'relative',
		padding: PADDING.base,
		alignItems: 'center',
		flex: 1,
	},
	allSong: {
		position: 'absolute',
		zIndex: 2,
		top: -70,
		width: '100%',
		borderRadius: 6,
		elevation: .8,
		paddingHorizontal: 32,
		paddingVertical: 32,
		paddingBottom: 42,
		justifyContent: 'center',
	},
	spacer: {
		width: .5,
		height: '100%'
	},
	category: {
		flex: 1,
		width: '100%',
		marginTop: 150,
		paddingHorizontal: 4,
		gap: 16
	},
	rowCategory: {
		justifyContent: 'space-around'
	}
})