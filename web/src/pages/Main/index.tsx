import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { PropsSneakers } from "../../store/ducks/sneakers";
import { PropsEletronics } from "../../store/ducks/eletronics";
import { RootState } from "../../store/ducks";

import Header from "../../components/Header";
// import Loader from "../../components/Loader";
import Product from "./Product";
import Aside from "./Aside";

import { useCategory } from "../../contexts/category";

import * as Styles from "./styles";

const Main: React.FC = () => {
  const { category } = useCategory();

  const [eletronicsFiltered, setEletronicsFiltered] = useState<
    PropsEletronics[]
  >([]);
  const [sneakersFiltered, setSneakersFiltered] = useState<PropsSneakers[]>([]);

  const { sneakersData } = useSelector((state: RootState) => state.sneakers);
  const { eletronicsData } = useSelector(
    (state: RootState) => state.eletronics
  );

  const filterData = useCallback(() => {
    switch (category.name) {
      case "eletronics":
        setEletronicsFiltered(
          eletronicsData.filter((e) => e.item === category.item)
        );
        break;
      case "sneakers":
        if (category.item === "all") setSneakersFiltered(sneakersData);
        else
          setSneakersFiltered(
            sneakersData.filter((e) => e.genre === category.item)
          );
        break;
    }
  }, [category, eletronicsData, sneakersData]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  console.log(sneakersFiltered);
  console.log(eletronicsFiltered);

  return (
    <Styles.Container>
      <Header />

      <Styles.ContainerInput>
        <Styles.Input type="text" name="search" placeholder="Search..." />
      </Styles.ContainerInput>

      <Styles.Wrapper>
        <Aside />

        <Styles.ContainerProducts>
          {category.name === "eletronics" &&
            eletronicsFiltered.length !== 0 &&
            eletronicsFiltered.map((e) => (
              <Product
                key={e.id}
                price={e.price}
                img={e.images[0].url}
                title={e.name}
                description={""}
              />
            ))}

          {category.name === "sneakers" &&
            sneakersFiltered.length !== 0 &&
            sneakersFiltered.map((s) => (
              <Product
                key={s.id}
                price={s.price}
                img={s.images[0].url}
                title={s.name}
                description={""}
              />
            ))}
        </Styles.ContainerProducts>
      </Styles.Wrapper>
    </Styles.Container>
  );
};

export default Main;
