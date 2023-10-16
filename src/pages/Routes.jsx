import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
// import Agent from "./Agents";
import AgentId from "./AgentAbilities";

function RoutesForRender() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/agents" element={<Agent />} /> */}
      <Route path="/agent/:uuid" element={<AgentId />} />
    </Routes>
  );
}

export default RoutesForRender;
