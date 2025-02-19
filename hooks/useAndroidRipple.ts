import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";

export function useAndroidRipple() {
	const colors = useThemeColor()
	return {
		color: rgbaColor(colors.grayLight, 0.3),
		foreground: true
	}
}