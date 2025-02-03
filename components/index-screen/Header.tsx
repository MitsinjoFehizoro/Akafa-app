import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, StyleSheet, View } from "react-native";
import { RowView } from "../RowView";
import { BigLogo, Logo } from "./Logo";
import { PADDING } from "@/constants/PADDING";
import { CustomText } from "../CustomText";
import { CountSong } from "./CountSoung";

export function Header() {
	const colors = useThemeColor()
	return (
		<View style={[styles.container, { backgroundColor: colors.primary }]}>
			<RowView style={styles.wrapper}>
				<Logo />
				<RowView>
					<CountSong icon='mic' count={128} />
					<CountSong icon='note' count={110} />
				</RowView>
			</RowView>
			<View style={styles.slogan}>
				<View style={styles.hihiraHoAnao}>
					<CustomText variant='subtitle3' style={{ opacity: 0.8, marginBottom : -4 }}>Raha mbola velona koa aho</CustomText>
					<CustomText variant='title1'>Hihira Ho Anao</CustomText>
				</View>
				<BigLogo style={styles.bigLogo} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 280,
		padding: PADDING.base,
		position: 'relative',
		gap: 8,
		overflow: 'hidden'
	},
	wrapper: {
		justifyContent: 'space-between',
	},
	slogan: {
		flex: 1,
		position: 'relative',
		justifyContent : 'center'
	},
	hihiraHoAnao :{
		marginLeft : 18,
		marginTop : -36,
	},
	bigLogo: {
		position: 'absolute',
		right: -12
	}
})