
import { DataContextProvider } from "@/hooks/useContextGetAllSongs";
import { ThemeContextProvider } from "@/hooks/useContextTheme";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<DataContextProvider>
			<ThemeContextProvider>
				<Stack
					screenOptions={{ headerShown: false }}
				/>
			</ThemeContextProvider>
		</DataContextProvider>
	)
}
