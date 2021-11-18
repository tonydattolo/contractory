import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccess, setLogout } from "slices/authSlice";

export default function RefreshJWT() {

  const dispatch = useDispatch();

 
  const [refreshJWT, { 
    data: refreshData,
    loading: refreshLoading,
    error: refreshError,
    isError: refreshIsError,
    isSuccess: refreshIsSuccess,
    isLoading: refreshIsLoading, 
  }] = useRefreshJWT();
 
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const access = useSelector(state => state.auth.access);
  const refresh = useSelector(state => state.auth.refresh);
  const lastRefresh = useSelector(state => state.auth.lastRefresh);

  const handleLogout = async () => {
    dispatch(setLogout())
    router.push("/", undefined, { shallow: true })
  }

  useEffect(() => {

    // check if time since last refresh is greater than 1 week, if so, logout
    if (lastRefresh && lastRefresh.getTime() < Date.now() - 604800000) {
      handleLogout();
    }

    // if timesincelastrefresh greater than 15 minutes, refreshJWT
    if (timeSinceLastRefresh() > 15) {
      handleRefresh()
    }
  }, []);

  useEffect(() => {
    if (refreshIsSuccess) {
      dispatch(setAccess(refreshData.access))
    }
  }, [refreshIsSuccess])

  // grab current time, and time of last refresh, and return the difference in minutes
  function timeSinceLastRefresh() {
    const currentTime = new Date();
    const lastRefresh = new Date(lastRefresh);
    const timeDiff = currentTime - lastRefresh;
    const minutes = Math.floor((timeDiff / 1000) / 60);
    return minutes;
  }


  const handleRefresh = async () => {
    try {
      await refreshJWT({ refresh }) 
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <>
    </>
  )
}