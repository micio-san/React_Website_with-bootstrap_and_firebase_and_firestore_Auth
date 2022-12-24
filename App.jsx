import Navcomponent from "./components/Navcomponent"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import FirebaseCtxProvider from "./FirebaseCtx";
import Account from "./components/Account"

function App() {
  return (
    <FirebaseCtxProvider>
      <Navcomponent />
      <div className="cont">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </div>
    </FirebaseCtxProvider>

  );
}

export default App;
