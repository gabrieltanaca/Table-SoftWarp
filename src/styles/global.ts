import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
  body, 
  div,
  h1{
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 0;
  }
  button {
    border: 0;
    cursor: pointer;
  }
  
`;
