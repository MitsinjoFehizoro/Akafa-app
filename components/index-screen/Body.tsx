import { PADDING } from "@/constants/PADDING";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import { CustomText } from "../CustomText";
import { RowView } from "../RowView";
import { Item } from "./Item";
import { Category } from "./Category";
import { BigLogo } from "./Logo";

type Props = ScrollViewProps
export function Body() {
	const colors = useThemeColor()
	return (
		<View style={styles.body}>
			<View style={styles.hihiraHoAnao}>
				<CustomText variant='subtitle3' style={{ opacity: 0.8, marginBottom: -4 }}>Raha mbola velona koa aho</CustomText>
				<CustomText variant='title1'>Hihira Ho Anao</CustomText>
			</View>
			<View style={{ backgroundColor: colors.primary, }}>
				<BigLogo style={styles.bigLogo} />
			</View>
			<ScrollView style={styles.container} contentContainerStyle={{ gap: 16 }} >
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
					<View style={{ gap: 16 }}>
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
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	body: {
		position: 'relative',
		flex: 1
	},
	bigLogo: {
		alignSelf: 'flex-end',
	},
	hihiraHoAnao: {
		position: 'absolute',
		top: 68,
		left: 32,
		zIndex: 1,
	},
	container: {
		position: 'absolute',
		zIndex: 2,
		gap: 16,
		paddingHorizontal: PADDING.base,
		width: '100%',
		height: '100%',
	},
	allSong: {
		marginTop: 150,
		width: '100%',
		borderRadius: 6,
		elevation: .8,
		paddingHorizontal: 32,
		paddingVertical: 32,
		paddingBottom: 42,
		justifyContent: 'center',
	},
	category: {
		width: '100%',
		marginBottom: 78
	},
	rowCategory: {
		justifyContent: 'space-around'
	}
})