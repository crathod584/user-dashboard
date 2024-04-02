import { observer } from "mobx-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import UserTableContainer from "../components/userForm/userTableContainer";

const Navigation = observer(() => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<UserTableContainer />} />
        </Route>
      </Routes>
    </Router>
  );
});

export default Navigation;
