import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../components/AgentAbilities.css";

function Agent() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://valorant-api.com/v1/agents");

        if (response.data.status === "error") {
          throw new Error(response.data.message);
        }
        setAgents(response.data.data);
        // console.log("Data", response.data.data);
      } catch (e) {
        // console.error("Error fetch", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-[200px]">
        {/* <div className="Loading  opacity-40">Loading...</div> */}
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
  if (error) {
    return <div className="Error">Error: {error} </div>;
  }

  // API ที่ใช้มี agents ที่ชื่อซ้ำกัน 1 ตัว ซึ่ง agentนั้นไม่มี agent role จึงต้องสร้างเงื่อนไขนี้เพื่อไม่ให้แสดง agent ซ้ำ
  const filteredAgents = agents.filter(
    (agent) =>
      agent.displayName === agent.displayName &&
      agent.role &&
      agent.role.displayName
  );
  //   console.log(filteredAgents);
  //   console.log("Example agent:", agents[0]);
  // console.log(filteredAgents.map((agent) => agent.fullPortrait));

  const filteredResults = filteredAgents.filter((agent) =>
    agent.displayName.toLowerCase().startsWith(keyword.toLowerCase())
  );

  return (
    <>
      <div className="agent-section flex flex-col justify-center items-center ">
        <div className="slideDown">
          <h1
            title="Agents"
            className=" font-bold text-7xl mt-10 text-rose-500 "
            style={{ textShadow: "2px 4px 8px black" }}
          >
            AGENTS
          </h1>
          <div className="agent-filter">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="search for agents"
              className="m-[20p] bg-zinc-700 w-[300px] mt-4 mb-4 px-[10px] py-[5px] rounded-lg"
            />
          </div>
        </div>
        {filteredResults.length === 0 ? (
          <div className=" h-[60vh]">
            <p className="pt-[50%]">No results found.</p>
          </div>
        ) : (
          <div className="agent-container lg:px-[5%] flex flex-wrap justify-center items-center mt-10 mb-[180px] w-full">
            {filteredAgents
              .filter((agent) =>
                agent.displayName
                  .toLowerCase()
                  .startsWith(keyword.toLowerCase())
              )
              .map((agent) => (
                <div
                  key={agent.uuid}
                  className="agent-display lg:w-[18%]  md:w-[30%] w-[40%] p-10 text-center bg
               "
                >
                  <Link to={`/agent/${agent.uuid}`}>
                    <div className="bg-overlay relative w-full h-full overflow-hidden">
                      <img
                        src={agent.displayIcon}
                        alt={agent.displayName}
                        title={agent.displayName}
                        className=" w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-200 hover:opacity-100">
                        <img
                          src={agent.fullPortrait}
                          alt={agent.displayName}
                          title={agent.displayName}
                          className=" w-full h-full object-cover clip-top scale-[2.8] pt-[27%] mt-[15%]"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="role flex justify-center items-center pt-1 text-center mt-2 ">
                    <h1
                      title={agent.displayName}
                      className="agent-name  lg:text-[25px] font-bold text-rose-500"
                      style={{ textShadow: "2px 4px 8px black" }}
                    >
                      {agent.displayName}
                    </h1>
                    <img
                      src={agent.role.displayIcon}
                      className=" mx-2 w-[18px] h-[18px] mt-1 opacity-60"
                      title={agent.role.displayName}
                    />
                  </div>
                  {/* <p className="agent-type font-semibold tracking-wider">
                  Role - {agent.role.displayName}
                </p> */}
                </div>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
export default Agent;
