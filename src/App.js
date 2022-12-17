import { Fragment, useState } from "react";

import ToDos from "./components/Form/ToDos";
import Header from "./components/Header/Header";
import ErrorModal from "./components/modal/ErrorModal";

function App() {
  const [showMain, setShowMain] = useState(false);

  const onShrinkHandler = () => {
    setTimeout(() => {
      setShowMain(true);
    }, 500);
  };

  return (
    <Fragment>
      <Header onShrink={onShrinkHandler} />
      {showMain && (
        <main>
          <ToDos />
        </main>
      )}
    </Fragment>
  );
}

export default App;
