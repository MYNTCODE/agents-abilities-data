import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Agent() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://valorant-api.com/v1/agents");

        if (response.data.status === "error") {
          throw new Error(response.data.message);
        }
        setAgents(response.data.data);
        console.log("Data", response.data.data);
      } catch (e) {
        console.error("Error fetch", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="Loading">Loading...</div>;
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
  console.log(filteredAgents.map((agent) => agent.fullPortrait));

  return (
    <>
      <div className="agent-section flex flex-col justify-center items-center">
        <div className="agent-filter">
          <input
            type="text"
            placeholder="Filter agents role"
            className="m-[20p] bg-zinc-700 w-[300px] mt-10 px-[10px] py-[5px] rounded-lg"
          />
        </div>

        <h1
          className=" font-bold text-7xl my-10 text-rose-500 "
          style={{ textShadow: "2px 4px 8px black" }}
        >
          Agent
        </h1>
        <div className="agent-container lg:px-[5%] flex flex-wrap justify-center items-center ">
          {filteredAgents.map((agent) => (
            <div
              key={agent.uuid}
              className="agent-display lg:w-[18%]  md:w-[30%] w-[40%] p-10 text-center bg
               "
            >
              {" "}
              <Link to={`/agent/${agent.uuid}`}>
                <div className="bg-overlay relative w-full h-full overflow-hidden">
                  <img
                    src={agent.displayIcon}
                    alt={agent.displayName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-200 hover:opacity-100">
                    <img
                      src={agent.fullPortrait}
                      alt={agent.displayName}
                      className="w-full h-full object-cover clip-top scale-[2.8] pt-[27%] mt-[15%]"
                    />
                  </div>
                </div>
              </Link>
              <h1
                className="agent-name mt-8 lg:text-[25px] font-bold text-rose-500"
                style={{ textShadow: "2px 4px 8px black" }}
              >
                {agent.displayName}
              </h1>
              <div className="role flex justify-center items-center pt-1 ">
                <p className="agent-type font-semibold tracking-wider">
                  Role - {agent.role.displayName}
                </p>
                <img
                  src={agent.role.displayIcon}
                  className=" mx-4 w-[20px] h-[20px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Agent;
