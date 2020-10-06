import React, { useState } from 'react';

import { ContainerBurguer } from './styles';

import { useOpen } from '../../../../contexts/burguerOpen';

import RightNav from '../RightNav';

const Burguer: React.FC = () => {
  const { open, setOpen } = useOpen();
  
  return (
    <>
      <ContainerBurguer open={open} onClick={() => setOpen(!open)} >
        <div />
        <div />
        <div />
      </ContainerBurguer>
      <RightNav open={open} />
    </>
  );
};

export default Burguer;
