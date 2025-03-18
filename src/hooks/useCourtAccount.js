import { useAuthUser } from 'src/@crema/utility/AuthHooks';

export const useCourtAccount = () => {
  const { user } = useAuthUser();
  const isCourtAccount = user?.organization_id === 12;
  return {
    isCourtAccount,
  };
};
