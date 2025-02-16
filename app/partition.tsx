import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { HeaderSimple } from "@/components/HeaderSimple";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Pdf from 'react-native-pdf';
import { Asset } from 'expo-asset'
import * as FileSystem from "expo-file-system";

export default function Partition() {
	const params = useLocalSearchParams()
	const [pdfUrl, setPdfUrl] = useState('')
	const copyPdf = async () => {
		const originalPdf = Asset.fromModule(require('@/assets/data/partitions/betlehema.pdf'))
		await originalPdf.downloadAsync()
		const pdfSystemUrl = FileSystem.documentDirectory + 'betlehema.pdf'
		await FileSystem.copyAsync({
			from: originalPdf.localUri!,
			to: pdfSystemUrl
		})
		setPdfUrl(pdfSystemUrl)
	}
	useEffect(() => {
		copyPdf()
	}, [])
	return (
		<CustomSafeAreaView>
			<HeaderSimple title={params.type.toString()} />
			{
				pdfUrl && (
					<Pdf
						source={{ uri: FileSystem.documentDirectory + 'betlehema.pdf' }}
						style={styles.pdf}
						trustAllCerts={false}
						onError={(error) => console.log(error)}
					/>
				)
			}

		</CustomSafeAreaView>
	)
}

const styles = StyleSheet.create({
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	}
})