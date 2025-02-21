import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { HeaderSimple } from "@/components/HeaderSimple";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import Pdf from 'react-native-pdf';
import * as FileSystem from "expo-file-system";
import { PADDING } from "@/constants/PADDING";

export default function Partition() {
	const params = useLocalSearchParams()
	const songPartiton = params.songTitle.toString().toLocaleLowerCase().replaceAll(' ', '_') + '.pdf'
	const partitionUrl = `${FileSystem.documentDirectory}partitions/${songPartiton}`

	return (
		<CustomSafeAreaView>
			<HeaderSimple title={params.type.toString()} />
			<Pdf
				source={{ uri: partitionUrl }}
				style={styles.pdf}
				trustAllCerts={false}
				onError={(error) => console.log(error)}
			/>
		</CustomSafeAreaView>
	)
}

const styles = StyleSheet.create({
	pdf: {
		flex: 1,
		width: '100%',
		height: '100%',
		paddingVertical: PADDING.base,
		backgroundColor: '#ffffff'
	}
})