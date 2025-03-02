
import { rgbaColor } from "@/tools/rgbaColor";
import { handleTheme } from "./useContextTheme";

export function useAndroidRipple() {
	const { colors } = handleTheme()
	return {
		color: rgbaColor(colors.grayLight, 0.3),
		foreground: true
	}
}