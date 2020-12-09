import styled from "styled-components";

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 65%;
  /* width: 80%; */

  margin: 20px 0px;

  @media (max-width: 768px) {
    min-height: 280px;
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  }
`;

export const ContainerTermOfService = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};

  label {
    margin-left: 5px;
  }
`;

export const ContainerLoader = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
