import styled from "styled-components";

export const Container = styled.div`
  .header {
    background: ${(props) => props.theme.colors.primary};
    padding: 1rem;

    .headerBox {
      display: flex;
      justify-content: space-between;
      max-width: 500px;
      margin: auto;
      padding: 0 1rem;

      .logo{
        font-size: 1.5rem;
        color: #fff;
        
        strong{
            color: ${(props) => props.theme.colors.logo};
        }
      }

      .light {
        color: #fff;
      }
    }
  }
  .content {
    margin: auto;
    max-width: 500px;
    padding: 1rem;

    .searchBarBox {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      background: ${(props) => props.theme.colors.input};
      border-radius: 1rem;
      padding-left: 1rem;

      .searchBar {
        background: transparent;
        color: ${(props) => props.theme.colors.text};
        width: 100%;
        padding: 0.5rem;
        border: 0;
      }
    }

    .boxTemp{
        background: ${(props) => props.theme.colors.input};
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        margin-top: 1rem;

        .name{
            display: flex;
            align-items: center;

            h1{
                margin-left: .4rem;
            }
        }

        .country{
            margin-left: 2.6rem;
        }
    }

    .boxDetails{
        background: ${(props) => props.theme.colors.input};
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        margin-top: 1rem;

        .text{
            strong{
                font-weight: 300;
            }

            p{
                font-weight: 600;
            }
        }
    }

    .activities{
        background: ${(props) => props.theme.colors.input};
        border-radius: 1rem;
        text-align: center;
        padding: 1rem 2rem;
        margin-top: 1rem;

        h2{
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
    }
  }
`;
