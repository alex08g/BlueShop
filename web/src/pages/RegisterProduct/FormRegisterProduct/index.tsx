import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { RiArrowDownSLine } from 'react-icons/ri';
// import { useHistory } from "react-router-dom";

import { ThemeContext } from 'styled-components';

import api from "../../../services/api";
import { useOpen } from "../../../contexts/open";
import { useMessage } from "../../../contexts/messageError";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loader from "../../../components/Loader";

import {
  ContainerForm,
  ContainerLoader,
  ContainerSelect,
  Select,
  InputFile,
  ContainerInputFile
} from "./styles";

const FormRegisterProduct: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  // const history = useHistory();

  const { setOpenMessage } = useOpen();
  const { setMessageError } = useMessage();

  const [loader, setLoader] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [design, setDesign] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    
    data.append('name', name);
    data.append('price', price);
    data.append('genre', genre);
    data.append('category', category);
    data.append('brand', brand);
    data.append('design', design);
    images.forEach(image => {
      data.append('images', image);
    })

    setLoader(true);
    try {
      await api.post('/product', data);
      setLoader(false);

      alert('deu certo');
    } catch (err) {
      setOpenMessage(true);
      setMessageError(err.response.data.message);
    }
  }
 

  return (
    <>
      <ContainerForm onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          labelName="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="price"
          type="text"
          labelName="Price"
          onChange={(e) => setPrice(e.target.value)} 
        />
        <Input
          name="brand"
          type="text"
          labelName="Brand"
          onChange={(e) => setBrand(e.target.value)}
        />
        <Input
          name="designer"
          type="text"
          labelName="Designer(optional)"
          onChange={(e) => setDesign(e.target.value)}
        />
        <ContainerSelect>
          <RiArrowDownSLine color={colors.textPrimary} size={20}/>
          <Select defaultValue="Genre" onChange={e => setGenre(e.target.value)}>
            <option disabled hidden defaultValue="Genre">Genre</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
          </Select>
        </ContainerSelect>

        <ContainerSelect>
        <RiArrowDownSLine color={colors.textPrimary} size={20}/>
          <Select defaultValue="Category" onChange={e => setCategory(e.target.value)}>
          <option disabled hidden defaultValue="Category">Category</option>
            <option value="eletronics">Eletronics</option>
            <option value="sneakers">Sneakers</option>
          </Select>
        </ContainerSelect>

        <ContainerInputFile>
          <label htmlFor="arquivo" >Product Image</label>
          <InputFile type="file" multiple name="arquivo" onChange={handleImage}/>
        </ContainerInputFile>
        
        {loader ? (
          <ContainerLoader>
            <Loader width={40} height={40} />
          </ContainerLoader>
        ) : (
          <Button type="submit">Register</Button>
        )}
      </ContainerForm>

    </>
  );
};

export default FormRegisterProduct;
