import { createContext, ReactNode, useContext, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "react-native";
import { COLORS } from "@/constants/COLORS";

interface themeContext {
	theme: 'light' | 'dark' | 'auto',
	setTheme: (s: 'light' | 'dark' | 'auto') => void,
	colors: typeof COLORS['light'],
	setColors: (c: typeof COLORS['light']) => void,
	isDark: boolean,
	setIsDark: (b: boolean) => void
}

const ThemeContext = createContext<themeContext>({
	theme: 'light',
	setTheme: () => { },
	colors: COLORS['light'],
	setColors: () => { },
	isDark: false,
	setIsDark: () => { }
})

export const handleTheme = () => {
	const { theme, setTheme, colors, setColors, isDark, setIsDark } = useContext(ThemeContext)
	const colorTheme = useColorScheme()
	const toggleTheme = async (value: 'light' | 'dark' | 'auto') => {
		try {
			if (value === 'auto') {
				setColors(COLORS[colorTheme ?? 'light'])
				setIsDark(colorTheme === 'dark' ? true : false)
			} else {
				setColors(COLORS[value])
				setIsDark(value === 'dark' ? true : false)
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
				setIsDark(colorTheme === 'dark' ? true : false)
			} else {
				setColors(COLORS[currentTheme ? currentTheme as 'light' | 'dark' : 'light'])
				setIsDark(currentTheme === 'dark' ? true : false)
			}
			setTheme(currentTheme ? currentTheme as 'light' | 'dark' | 'auto' : 'light')
		} catch (error) {
			console.log('Error of getTheme : ', error)
		}
	}

	return {
		theme,
		colors,
		isDark,
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
	const [isDark, setIsDark] = useState(false)
	return (
		<ThemeContext.Provider value={{ theme, setTheme, colors, setColors, isDark, setIsDark }}>
			{children}
		</ThemeContext.Provider>
	)
}
