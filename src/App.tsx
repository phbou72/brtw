import * as React from "react";
import styled, { css } from "styled-components";

import { BaseTheme } from "./theme";

const StyledApp = styled.div`
    background-color: red;
`;

const TestTheme = styled.div(
    ({ theme }) => css`
        margin-top: 16px;
        color: red;

        ${theme.desktop} {
            color: black;
            background: tomato;
        }
    `
);

const App = () => {
    return (
        <BaseTheme>
            <StyledApp>Styled App</StyledApp>
            <TestTheme>Test theme</TestTheme>
        </BaseTheme>
    );
};

export default App;
