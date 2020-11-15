import styled from "styled-components";

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100%;
  width: 100%;

  margin: 30px 0px;
  /* padding: 20px; */

  input {
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  }
`;

export const ConteinerTermOfService = styled.div`
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

export const ContainerInputFile = styled.div`
  margin: 30px 0px;

  height: 120px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .new-image {
    width: 100%;
    height: 90px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px dashed ${({ theme }) => theme.colors.textPrimary};
    border-radius: 20px;

    padding: 20px 0;
  }

  .input-file {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 15px;

    font-size: 2rem;
  }
`;

export const InputFile = styled.input`
  display: none;
`;

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
`;

export const ImageContainer = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 90px;
    border-radius: 20px;

    object-fit: cover;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;

    cursor: pointer;
  }
`;
