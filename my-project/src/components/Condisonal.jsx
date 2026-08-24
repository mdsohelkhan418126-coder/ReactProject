import { Register } from './Register';

export const Condisonal = () => {
  const isAdmin = true;
  return <div>{isAdmin && <Register />}</div>;
};
