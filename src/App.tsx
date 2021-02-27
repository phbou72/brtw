import * as React from "react";
import styled, { css } from "styled-components";

import { BaseTheme } from "./theme";

const StyledApp = styled.div`
    background-color: red;
`;

const TestTheme = styled.div(({ theme }) => {
    return css`
        color: red;

        @media ${theme.desktop} {
            color: black;
        }

        margin-top: 16px;
    `;
});

const App = () => {
    return (
        <BaseTheme>
            <StyledApp>Styled App</StyledApp>
            <TestTheme>Test theme</TestTheme>
        </BaseTheme>
    );
};

export default App;
