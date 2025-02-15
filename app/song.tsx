import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Song (){
	const params = useLocalSearchParams()
	return (
		<CustomSafeAreaView>
			<Text>{params.songTitle.toString()}</Text>
			<Text>{params.type.toString()}</Text>
		</CustomSafeAreaView>
	)
}