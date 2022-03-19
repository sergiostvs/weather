import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --dark-mode-elements: hsl(209, 23%, 22%);
        --dark-mode-bg: hsl(207, 26%, 17%);
        --light-mode-elements: #fff;
        --light-mode-bg: hsl(0, 0%, 98%);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%; // 15px
        }
        @media (max-width: 720px) {
            font-size: 87.5%; // 14px
        }
    }

    body{
        -webkit-font-smoothing: antialiased;
        background: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
    }
`;
