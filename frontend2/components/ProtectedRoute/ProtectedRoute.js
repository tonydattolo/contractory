import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { map } from "@metamask/jazzicon/colors";



// export default function ProtectedRoute({ children, isLoggedIn }) {
export default function ProtectedRoute() {
  
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const accessToken = useSelector(state => state.auth.accessToken);

  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isAuthenticated || currentUser === null) {
        setLoggedIn(false);
        // router.push("/login", undefined, { shallow: true })
      } else {
        setLoggedIn(true);
      }
    }
  }, [window]);
  // }, [isAuthenticated, currentUser]);

  const handleRedirect = () => {
    router.push("/login", undefined, { shallow: true })
  }

  useEffect(() => {
    if (!loggedIn) {
    
    }
  }, [loggedIn]);


  return (
    <>
      {loggedIn ? (
        children

      ) : (
        handleRedirect()
      )
      } 
    </>
  )
}

// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired = loggedIn,
// };
ProtectedRoute.defaultProps = {
  isLoggedIn: false,
};