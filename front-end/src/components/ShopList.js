import React, { useState, useEffect } from "react";
import Shop from "./Shop";
import { getShops } from "../services/shops";
import { useShops } from "../contexts/ShopsContext";
import ErrorMessage from "./utils/ErrorMessage";
import Loading from "./utils/Loading";
import CreateShop from "./CreateShop";

const ShopList = () => {
  const [state, setState] = useState({
    isPending: true
  });

  const filter = null;

  const {
    shopState: { error, lastDoc, shops, empty },
    dispatch
  } = useShops();

  const setIsPending = status => {
    setState({ ...state, isPending: status });
  };

  /** load the first time */
  useEffect(() => {
    getShops(dispatch, filter, lastDoc)
      .then(result => {
        setIsPending(false);
      })
      .catch(err => {
        setIsPending(false);
      });
    //eslint-disable-next-line
  }, []);

  const handleClick = e => {
    e.preventDefault();
    getShops(dispatch, filter, lastDoc, true)
      .then(result => {
        setIsPending(false);
      })
      .catch(err => {
        setIsPending(false);
      });
  };

  return (
    <>
      <CreateShop />
      {error && <ErrorMessage message={error} />}
      {state.isPending && <Loading />}
      {!state.isPending && shops && (
        <div className="row justify-content-center">
          {shops.map(shop => (
            <Shop key={shop.id} {...shop} />
          ))}
        </div>
      )}
      {!empty && (
        <button onClick={handleClick} className="btn btn-secondary btn-block">
          Ver Mais Resultados
        </button>
      )}
    </>
  );
};

export default ShopList;
