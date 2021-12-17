import React from "react";

export interface HasInternetInterface {
  hasInternet: boolean;
}

const hasInternetContext = React.createContext({} as HasInternetInterface);

function useHasInternet() {
  const { hasInternet } = React.useContext(hasInternetContext);
  return hasInternet;
}

export { hasInternetContext, useHasInternet };
