
import { DataContextProvider } from "@/hooks/useContextGetAllSongs";
import { ThemeContextProvider } from "@/hooks/useContextTheme";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<DataContextProvider>
			<ThemeContextProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name='index' />
					<Stack.Screen name='info' />
					<Stack.Screen name='list' />
					<Stack.Screen name='lyrics' />
					<Stack.Screen name='partition' />
					<Stack.Screen name='setting' />
				</Stack>
			</ThemeContextProvider>
		</DataContextProvider>
	)
}
