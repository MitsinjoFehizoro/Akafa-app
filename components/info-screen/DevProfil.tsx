import { useThemeColor } from "@/hooks/useThemeColor"
import { SettingComponent } from "../setting-screen/SettingComponent"
import { RowView } from "../RowView"
import { Image, StyleSheet, View } from "react-native"
import { LinkProfil } from "./LinkProfil"
import { CustomText } from "../CustomText"
import { rgbaColor } from "@/tools/rgbaColor"

export function DevProfil() {
	const colors = useThemeColor()
	return (
		<SettingComponent style={{ gap: 20 }} title='Développeur'>
			<RowView gap={16}>
				<Image
					style={{ width: 50, height: 50 }}
					source={require('@/assets/images/mitsinjo.png')}
				/>
				<View>
					<CustomText variant='subtitle3' color='grayDark'>RANAIVOARISAONA</CustomText>
					<CustomText variant='body2' color='grayDark'>Andriatsitohaina Mitsinjo Fehizoro</CustomText>
				</View>
			</RowView>
			<RowView>
				<LinkProfil icon='phone' title='034 83 517 50/038 10 230 44' />
				<LinkProfil icon='envelope-open' title="mitsinjofehizoro/@gmail.com" style={[styles.link, { borderColor: rgbaColor(colors.grayLight, 0.3) }]} />
				<LinkProfil icon='facebook' title='Mitsinjo Fehizoro Andriatsitohaina' />
			</RowView>
		</SettingComponent>
	)
}

const styles = StyleSheet.create({
	link: {
		borderStyle: 'solid',
		borderLeftWidth: 1,
		borderRightWidth: 1
	}
})