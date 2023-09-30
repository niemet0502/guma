import * as jwt from 'jsonwebtoken';

export const authContext = ({ req }) => {
  if (req.headers?.authorization) {
    const header = req.headers.authorization
      ? (req.headers.authorization as string).split(' ')
      : null;

    const token = header[1];

    const user: any = jwt.verify(token, 'shhhhh');

    return { user };
  }
};
