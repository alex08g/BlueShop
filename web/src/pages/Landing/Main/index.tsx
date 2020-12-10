import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";

import { getEletronics } from "../../../store/ducks/eletronics";
import { getSneakers } from "../../../store/ducks/sneakers";
import { getProducts } from "../../../store/ducks/products";
import { RootState } from "../../../store/ducks";

import BigProduct from "../BigProduct";
import HeaderMain from "./HeaderMain";
import Loader from "../../../components/Loader";

import { useOpen } from "../../../contexts/burguerMenu";

import * as Styles from "./styles";

const Main: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const { ProductsData, ProductsError, ProductsLoading } = useSelector(
    (state: RootState) => state.products
  );

  const { sneakersData, sneakersError, sneakersLoading } = useSelector(
    (state: RootState) => state.sneakers
  );
  const { eletronicsData, eletronicsError, eletronicsLoading } = useSelector(
    (state: RootState) => state.eletronics
  );

  const { open } = useOpen();

  const load = useCallback(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    Aos.init({ duration: 1800 });
    load();
  }, [load]);

  return (
    <Styles.Container open={open}>
      <HeaderMain />
      {console.log(ProductsData)}

      {ProductsLoading ? (
        <Styles.ContainerLoader>
          <Loader width={100} height={100} type="ThreeDots" />
        </Styles.ContainerLoader>
      ) : ProductsData.length !== 0 &&
         (
        <Styles.ContainerMain>
          <hr />
          <h1>New Products</h1>

          <div className="container-product">
            <BigProduct
              image={ProductsData[0].images[0].url}
              title={ProductsData[0].name}
              price={Number(ProductsData[0].price)}
              description={ProductsData[0].description}
            />
          </div>

          <hr />

          <Styles.ContainerNike>
            <h1>The best's of the Blue</h1>

            <div className="container-product">
              <BigProduct
                image={ProductsData[0].images[0].url}
                title={ProductsData[0].name}
                price={Number(ProductsData[0].price)}
                description={ProductsData[0].description}
                reverse="row-reverse"
              />
            </div>

            <hr />

            <div className="container-product">
              <BigProduct
                image={ProductsData[0].images[0].url}
                title={ProductsData[0].name}
                price={Number(ProductsData[0].price)}
                description={ProductsData[0].description}
              />
            </div>
          </Styles.ContainerNike>
        </Styles.ContainerMain>
      )} 
    </Styles.Container>
  );
});

export default Main;
