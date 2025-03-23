import { createTheme } from "@v-uik/base";

const DEFAULT_SPACING = 4;

declare module '@v-uik/base' {
    interface Theme {
        spacing: (multiplier: number) => string;
    }
}

export const theme = createTheme({
    spacing: (multiplier: number) => `${multiplier * DEFAULT_SPACING}px`,
});