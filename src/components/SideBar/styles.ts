import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 15%;
  background: #2f5ef7;

  display: flex;
  flex-direction: column;

  .logo {
    width: 100%;

    display: flex;
    align-items: center;

    padding: 6px 24px;

    background-color: #ffffff;
    color: #172232;

    img {
      width: 32px;
      height: 32px;
      margin-right: 5px;
    }
    p {
      font-size: 26px;
      font-weight: 500;
    }
  }

  div {
    display: flex;
    align-items: center;

    flex-direction: row;

    color: #ffffff;
    transition: all 0.3s;
    padding: 2px 24px;

    h1 {
      font-size: 24px;
    }

    &:hover {
      cursor: pointer;
      background-color: #172232;
    }
  }
`;
