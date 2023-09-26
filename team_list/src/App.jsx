import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import TeamList from "./component/TeamList";
import TeamDetail from "./component/TeamDetail";

function App() {
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
    
      <Router>
        <Routes>
          <Route path='/teams' element={<TeamList />} />
          <Route path='/CreateTeam' element={<TeamDetail />} />
          <Route path='/:TeamName' element={<TeamDetail />} />
        </Routes>
        <TeamList setId={setId} setOpen={setOpen} />
        <TeamDetail id={id} open={open} setId={setId} setOpen={setOpen} />
      </Router>
    </>
  );
}

export default App;
