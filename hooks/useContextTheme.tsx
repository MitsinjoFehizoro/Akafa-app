import { createContext, ReactNode, useContext, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "react-native";

interface themeContext {
	theme: 'light' | 'dark' | 'auto',
	setTheme: (s: 'light' | 'dark' | 'auto') => void
}

const ThemeContext = createContext<themeContext>({
	theme: 'light',
	setTheme: () => { }
})

export const handleTheme = () => {
	const { theme, setTheme } = useContext(ThemeContext)

	const toggleTheme = async (value: 'light' | 'dark' | 'auto') => {
		try {
			if (value === 'auto') setTheme(useColorScheme() ?? 'light')
			setTheme(value)
			await AsyncStorage.setItem('theme', value)
		} catch (error) {
			console.log('Error of toggleTheme : ', error)
		}
	}

	const getTheme = async () => {
		try {
			const currentTheme = await AsyncStorage.getItem('theme')
			if (currentTheme === 'auto')
				return setTheme(useColorScheme() ?? 'light')
			setTheme(currentTheme ? currentTheme as 'light' | 'dark' | 'auto' : 'light')
		} catch (error) {
			console.log('Error of getTheme : ', error)
		}
	}

	return {
		theme,
		getTheme,
		toggleTheme
	}
}

type Props = {
	children: ReactNode
}
export function ThemeContextProvider({ children }: Props) {
	const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light')
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
