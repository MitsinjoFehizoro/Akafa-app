import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { CustomText } from "@/components/CustomText";
import { Footer } from "@/components/Footer";
import { HeaderSimple } from "@/components/HeaderSimple";
import { SearchBar } from "@/components/list-screen/SearchBar";
import { DATASONGS } from "@/constants/DATASONGS";
import { PADDING } from "@/constants/PADDING";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function () {
	const colors = useThemeColor()
	const params = useLocalSearchParams()
	const [value, setValue] = useState('')
	return (
		<CustomSafeAreaView>
			<View>
				<HeaderSimple title={params.listScreen.toString()} />
				<View style={[styles.search, { backgroundColor: colors.primary }]}>
					<SearchBar value={value} onChange={setValue} />
				</View>
			</View>
			<FlatList
				data={DATASONGS}
				keyExtractor={(item) => item.title}
				renderItem={({ item }) =>
					<ListItem song={item} type={params.listScreen.toString()} />
				}
			/>
			<Footer />
		</CustomSafeAreaView>

	)

}
const styles = StyleSheet.create({
	search: {
		paddingHorizontal: PADDING.base,
		paddingBottom: 24,
		paddingTop: 8
	}
})