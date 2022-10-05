import { useEffect, useState, useRef } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { Outlet, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode
      const verifyRefreshToken = async () => {
        console.log("Verifying refresh token");
        try {
          //const response
          await refresh();
          // { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
    // eslint-disable-next-line
  }, []);
  let content;
  if (!persist) {
    // persist no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    // persist yes token no
    console.log("loading");
    content = <Spinner />;
  } else if (isError) {
    // persist yes  token no
    console.log("error");
    content = (
      <div className="alert alert-danger">
        <strong>Warning!</strong> {error.data?.message} <br />
        <Link to="/login">Please login again</Link>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist: yes , token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
