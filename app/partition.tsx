import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { HeaderSimple } from "@/components/HeaderSimple";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Parition() {
	const params = useLocalSearchParams()
	return (
		<CustomSafeAreaView>
			<HeaderSimple title={params.type.toString()} />
		</CustomSafeAreaView>
	)
}