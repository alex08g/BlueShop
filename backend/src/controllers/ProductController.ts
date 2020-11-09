import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Products from '../models/Products';
import product_view from '../views/product_view';

export default {
  async index(req: Request, res: Response) {
    const productRepository = getRepository(Products);

    const products = await productRepository.find({
      relations: ['images']
    });

    return res.json(product_view.renderMany(products));
  },

  async show(req: Request, res: Response) {
    const productRepository = getRepository(Products);
    
    const { category } = req.params;
    
    const products = await productRepository.find({ 
      where: { category },
      relations: ['images']
    });

    if(products.length === 0) {
      return res.status(404).json({ message: 'Products not found :(' });
    }

    return res.json(product_view.renderMany(products));
  },

  async store(req: Request, res: Response) {
    const productRepository = getRepository(Products);
    const requestImages = req.files as Express.Multer.File[];
    
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const { name, price, description, genre, category, brand, design } = req.body;

    const data = { name, price, description, genre, category, brand, design, images };

    const schema = Yup.object().shape({
      name: Yup.string().required(), 
      price: Yup.number().required(), 
      description: Yup.string().required(), 
      genre: Yup.string().required(),
      category: Yup.string().required(), 
      brand: Yup.string(), 
      design: Yup.string(), 
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, { abortEarly: false });

    const product = productRepository.create(data);
    await productRepository.save(product);

    return res.status(201).json(product_view.render(product));
  }
}