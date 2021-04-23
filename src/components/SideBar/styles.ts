import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 15%;
  padding: 32px 24px;
  background: #2f5ef7;

  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;

    color: #ffffff;

    h1 {
      font-size: 24px;
    }

    &:hover {
    }
  }
`;
