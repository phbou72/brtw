import * as React from "react";

import { ThemeProvider, DefaultTheme, ThemeProps } from "styled-components";

import colors from "./colors";
import mediaQuery from "./mediaQuery";

const theme = {
    ...colors,
    ...mediaQuery,
};

interface IProps {
    children: React.ReactNode;
}

export const BaseTheme = (props: IProps) => {
    return (
        <ThemeProvider theme={theme}>
            <>{props.children}</>
        </ThemeProvider>
    );
};

export type IThemeProps = typeof theme;
export type ITheme<T = Record<string, unknown>> = ThemeProps<DefaultTheme & T>;
export default theme;
