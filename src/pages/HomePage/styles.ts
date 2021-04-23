import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-rows: 100%;
  grid-template-areas: "sidebar content";
  main {
    display: grid;
    grid-area: content;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        font-size: 60px;
        font-weight: 700;
        color: #172232;
      }

      .table-responsive {
        padding: 0px 60px;
      }

      .table-striped tbody tr:nth-of-type(2n + 1) {
        background-color: rgba(0, 0, 0, 0.2);
      }

      .table {
        margin-bottom: 0;
        background-color: #2f5ef7;
        color: #ffffff;
        border-radius: 10px;
      }

      .edit svg,
      .remove svg {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        transition: all 0.25s;

        &:hover {
          background-color: #172232;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
`;
