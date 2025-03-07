import { Image, StyleSheet, View } from "react-native"
import { SecondLogo, ThirdLogo } from "../index-screen/Logo"
import { CustomText } from "../CustomText"
import { RowView } from "../RowView"
import { LinkProfil } from "./LinkProfil"
import { rgbaColor } from "@/tools/rgbaColor"
import { handleTheme } from "@/hooks/useContextTheme"

export function AkafaProfil() {
	const { colors, isDark } = handleTheme()
	return (
		<View style={styles.container}>
			<View style={[styles.pdp, { backgroundColor: colors.background }]}>
				<Image
					style={{ width: 120, height: 120 }}
					source={require('@/assets/images/akafa.png')}
				/>
			</View>
			<View style={[styles.wrapper, { backgroundColor: colors.background, borderColor: rgbaColor(colors.grayLight, 0.3) }]}>
				<SecondLogo />
				<View style={{ width: 210 }}>
					<CustomText style={{ textAlign: 'center' }} variant='subtitle2' color='grayLight'>Antsan'i KArmela FAnantenana Ambatolampy</CustomText>
				</View>
				<RowView>
					<LinkProfil icon='phone' title='034 83 517 50/038 10 230 44' />
					<LinkProfil icon='facebook-square' title="Antsan'i KArmela/FAnantenana" style={[styles.link, { borderColor: rgbaColor(colors.grayLight, 0.3) }]} />
					<LinkProfil icon='facebook' title='A.KA.FA/Ambatolampy' />
				</RowView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 68
	},
	pdp: {
		position: 'absolute',
		zIndex: 1,
		width: 136,
		height: 136,
		borderRadius: '50%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapper: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 16,
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingBottom: 24,
		paddingTop: 78,
		gap: 20
	},
	link: {
		borderStyle: 'solid',
		borderLeftWidth: 1,
		borderRightWidth: 1
	}
})