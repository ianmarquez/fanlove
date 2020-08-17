import { Request, Response, Router } from 'express';
import DBConnection from '../helper/DBConnection';

const router = Router();

const conn = DBConnection.getInstance().getConnection();

router.get('/get/:id', async (req: Request, res: Response): Promise<void> => {
  let status = 200;
  let response = {};
  try {
    const { id } = req.params;
    if (!id) {
      status = 400;
      response = 'Parameter Id must be defined.'
    } else {
      const dbRes = await conn('user').where({id});
      if (dbRes.length > 0) {
        status = 200;
        response = dbRes;
      } else {
        status = 404;
        response = 'User not found.'
      }
    }
  } catch (err) {
    status = 500;
    response = err;
  }

  res.status(status).json(response);
});

router.get('/get', async (req: Request, res: Response): Promise<void> => {
  try {
    const dbRes = await conn('user');
    res.send(dbRes);
  } catch (err) {
    res.send(err);
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      res.status(401).json({message: 'firstname and lastname is required.'});
    }
    await conn('user').insert({ firstName, lastName });
    res.status(200).json({ message: 'inserted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'an error has occured adding user to database.' });
  }
});

export default router;