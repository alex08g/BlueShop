import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Eletronics from '../models/Eletronics';
import eletronics_view from '../views/eletronics_view';

export default {
  async index(req: Request, res: Response) {
    const eletronicsRepository = getRepository(Eletronics);

    const products = await eletronicsRepository.find({
      relations: ['images']
    });

    return res.json(eletronics_view.renderMany(products));
  },

  async show(req: Request, res: Response) {
    const eletronicsRepository = getRepository(Eletronics);
    const { id } = req.params;

    const product = await eletronicsRepository.findOneOrFail({
      relations: ["images"],
      where: { id }
    });

    return res.json(eletronics_view.render(product));
  },

  async store(req: Request, res: Response) {
    const eletronicsRepository = getRepository(Eletronics);
    const requestImages = req.files as Express.Multer.File[];
    
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const { name, price, description, item, brand } = req.body;

    const data = { name, price, description, item, brand, images };

    const schema = Yup.object().shape({
      name: Yup.string().required(), 
      price: Yup.number().required(), 
      description: Yup.string().required(), 
      item: Yup.string().required(), 
      brand: Yup.string(), 
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, { abortEarly: false });

    const product = eletronicsRepository.create(data);
    await eletronicsRepository.save(product);

    return res.status(201).json(eletronics_view.render(product));
  },

  async update(req: Request, res: Response) {
    const eletronicRespository = getRepository(Eletronics);
    const { id } = req.params;
    
    const { name, price, description, brand, item } = req.body;
    
    const data = {
      name,
      price,
      description,
      item,
      brand,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      description: Yup.string().required(),
      item: Yup.string().required(),
      brand: Yup.string(),
    });

    await schema.validate(data, { abortEarly: false });

    const resUpdate = await eletronicRespository.update(id, data);

    return !!resUpdate.affected
      ? res.status(200).json({ message: "Product updated with success :)" })
      : res.status(500);
  },
}