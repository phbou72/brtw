import * as React from "react";
import styled from "styled-components";

import { BaseTheme } from "./theme";

const StyledApp = styled.div`
    background-color: red;
`;

const App = (): React.ReactElement => {
    return (
        <BaseTheme>
            <StyledApp className="App">App test 2</StyledApp>
        </BaseTheme>
    );
};

export default App;
