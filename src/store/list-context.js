import React from "react";

const defaultContext = {
  items: [],
};

export const ListContext = React.createContext(defaultContext);

const ListContextProvider = (props) => {
  return (
    <ListContext.Provider value={props.tasks}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
