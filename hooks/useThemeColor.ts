import { COLORS } from '@/constants/COLORS';
import { useColorScheme } from 'react-native';

export function useThemeColor() {
	const theme = useColorScheme() ?? 'light'
	return COLORS[theme]
}