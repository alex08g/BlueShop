import React, { useContext } from "react";
import LoaderCustom, { Types } from 'react-loader-spinner';

import { ThemeContext } from 'styled-components';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface LoaderProps {
  width?: number;
  height?: number;
  type?: Types;
}

const Loader: React.FC<LoaderProps> = ({ width=60, height=60, type="TailSpin"}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <LoaderCustom type={type} color={colors.primary} width={width} height={height} />
  );
};

export default Loader;
