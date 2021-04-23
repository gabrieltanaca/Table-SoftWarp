import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  background-color: #f2f2f2;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      padding: 20px;

      font-size: 42px;
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
        background-color: #ffffff;
        color: #172232;
        cursor: pointer;
      }
    }

    .notPadding {
      padding: 0 !important;

      .btn {
        width: 100%;
        border: 0;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        font-size: 24px;
        background-color: transparent;
      }
    }
  }
`;

export const CreateUserLine = styled.tr`
  td {
    padding: 0.75rem 0.5rem;
    input {
      width: 95%;
    }
  }
`;
