
import { DataContextProvider } from "@/hooks/useContextGetAllSongs";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<DataContextProvider>
			<Stack
				screenOptions={{ headerShown: false }}
			/>
		</DataContextProvider>
	)
}
