// Imports the styled and createGlobalStyle functions from the styled-components module
import styled, { createGlobalStyle } from 'styled-components';
// Imports the BGImage image
import BGImage from './images/kimberly-farmer-unsplash.jpg';

// Defines the GlobalStyle styled component, which sets global styles for the HTML and body elements
export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Libre Bodoni', sans-serif;
    box-sizing: border-box;
  }
`;

// Defines the Wrapper styled component, which sets styles for a div element
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #fff, #fafafa);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #cc4843);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #d4615b);
    border: 2px solid #cc4843;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`;