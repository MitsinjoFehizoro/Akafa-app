import { createContext, ReactNode, useContext, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "react-native";
import { COLORS } from "@/constants/COLORS";

interface themeContext {
	theme: 'light' | 'dark' | 'auto',
	setTheme: (s: 'light' | 'dark' | 'auto') => void,
	colors: typeof COLORS['light'],
	setColors: (c: typeof COLORS['light']) => void
}

const ThemeContext = createContext<themeContext>({
	theme: 'light',
	setTheme: () => { },
	colors: COLORS['light'],
	setColors: () => { }
})

export const handleTheme = () => {
	const { theme, setTheme, colors, setColors } = useContext(ThemeContext)
	const colorTheme = useColorScheme()
	const toggleTheme = async (value: 'light' | 'dark' | 'auto') => {
		try {
			if (value === 'auto') {
				setColors(COLORS[colorTheme ?? 'light'])
			} else {
				setColors(COLORS[value])
			}
			setTheme(value)
			await AsyncStorage.setItem('theme', value)
		} catch (error) {
			console.log('Error of toggleTheme : ', error)
		}
	}

	const getTheme = async () => {
		try {
			const currentTheme = await AsyncStorage.getItem('theme')
			if (currentTheme === 'auto') {
				setColors(COLORS[colorTheme ?? 'light'])
			} else {
				setColors(COLORS[currentTheme ? currentTheme as 'light' | 'dark' : 'light'])
			}
			setTheme(currentTheme ? currentTheme as 'light' | 'dark' | 'auto' : 'light')
		} catch (error) {
			console.log('Error of getTheme : ', error)
		}
	}

	return {
		theme,
		colors,
		getTheme,
		toggleTheme
	}
}

type Props = {
	children: ReactNode
}
export function ThemeContextProvider({ children }: Props) {
	const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light')
	const [colors, setColors] = useState<typeof COLORS['light']>(COLORS['light'])
	return (
		<ThemeContext.Provider value={{ theme, setTheme, colors, setColors }}>
			{children}
		</ThemeContext.Provider>
	)
}
