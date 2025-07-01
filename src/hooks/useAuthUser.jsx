import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

const useAuthUser = () => {
  const { user, loading, refetchUser } = useContext(UserContext);
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setAuthUser(user);
      setIsLoading(false);
    }
  }, [user, loading]);

  return { authUser, isLoading, refetchUser };
};

export default useAuthUser;
