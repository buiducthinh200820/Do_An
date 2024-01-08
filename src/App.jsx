import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { store } from "./Store";
import router from "./Router/index";
import { Provider, useDispatch } from "react-redux";
import { getCurrentUser } from "./Store/actions/auth.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageItem = localStorage.getItem("token");
    if (localStorageItem) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;
