import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { Footer } from "@/components/Footer";
import { HeaderSimple } from "@/components/HeaderSimple";
import { ListItem } from "@/components/list-screen/ListItem";
import { Popup } from "@/components/list-screen/Popup";
import { SearchBar } from "@/components/list-screen/SearchBar";
import { DATASONGS } from "@/constants/DATASONGS";
import { PADDING } from "@/constants/PADDING";
import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";
import { PopupAndSong } from "@/tools/type";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, View } from "react-native";

export default function List() {
	const colors = useThemeColor()
	const params = useLocalSearchParams()
	const [searchValue, setSearchValue] = useState('')
	const allSong = params.type.toString() === 'solfa' ? DATASONGS.filter(data => data.isPartition) : DATASONGS
	const [songs, setSongs] = useState(allSong)
	useEffect(() => {
		setSongs(allSong.filter(s => s.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())))
	}, [searchValue])

	//Keyboard
	const [isShowKeyboard, setIsShowKeyboard] = useState(false)
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setIsShowKeyboard(true);
			}
		);

		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setIsShowKeyboard(false);
			}
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, [])

	//Popup
	const [showPopupAndSelectedSong, setShowPopupAndSetSelectedSong] = useState<PopupAndSong>({
		isShowPopup: false, selectedSong: ''
	})
	return (
		<CustomSafeAreaView>
			<View>
				<HeaderSimple title={params.type.toString()} />
				<View style={[styles.search, { backgroundColor: colors.primary }]}>
					<SearchBar
						value={searchValue}
						onChange={setSearchValue}
					/>
				</View>
			</View>

			{
				songs.length !== 0 ? (
					<FlatList
						data={songs}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) =>
							<ListItem song={item} type={params.type.toString()} setShowPopupAndSetSelectedSong={setShowPopupAndSetSelectedSong} />
						}
						contentContainerStyle={{ padding: 16, gap: 8 }}
					/>
				) : (
					<View style={styles.breakSearch}>
						<FontAwesome5 name='searchengin' size={72} color={rgbaColor(colors.secondary, 0.4)} />
					</View>
				)
			}
			{
				!isShowKeyboard && (
					<Footer />
				)
			}
			<Popup showPopupAndSelectedSong={showPopupAndSelectedSong} setShowPopupAndSetSelectedSong={setShowPopupAndSetSelectedSong} />
		</CustomSafeAreaView>

	)

}
const styles = StyleSheet.create({
	search: {
		paddingHorizontal: PADDING.base,
		paddingBottom: 16,
		paddingTop: 8
	},
	breakSearch: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

})