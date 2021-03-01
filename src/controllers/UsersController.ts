import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';

class UsersController{

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required().required("Nome é obrigatório!"),
      email: yup.string().email("Este email não é válido!").required()
    });

    // if(!( await schema.isValid(request.body))) {
    //   return response.status(400).json({
    //     error: "Validation Failed!"
    //   })
    // }

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error: error})
    }
    
    const usersRepository = getCustomRepository(UsersRepository);

    // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if(userAlreadyExists){
      return response.status(400).json({
        error : "User already exists!"        
      })
    }

    const user = usersRepository.create({
      name, email
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UsersController };
