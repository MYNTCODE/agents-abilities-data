import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

function AgentId() {
  const [agentById, setAgentById] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const fetchData = async (uuid) => {
    try {
      const response = await axios.get(
        `https://valorant-api.com/v1/agents/${uuid}`
      );

      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }
      setAgentById(response.data.data);

      console.log("Data", response.data.data);
      console.log("Agent Id", response.data.data[0].displayName);
    } catch (e) {
      console.error("Error fetch", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params.uuid);
  }, []);

  if (loading) {
    return <div className="Loading">Loading...</div>;
  }
  if (error) {
    return <div className="Error">Error: {error} </div>;
  }
  return (
    <>
      <div className="agent-abilities">
        {agentById && (
          <div className="agent">
            <div className="lg:px-[22%] pt-[2%]">
              <h1 className="text-rose-500 text-center text-[50px] font-bold">
                {agentById.displayName}
              </h1>
              <p className="px-20 tracking-wider font-semibold">
                {agentById.description}
              </p>
            </div>
            <div className="agent-portrait-abilities  flex justify-center lg:px-[20%]">
              <div className="agent-portrait h-[700px] w-[800px]">
                <img
                  src={agentById.fullPortraitV2}
                  alt={agentById.displayName}
                  className="w-full h-full object-cover "
                  title={agentById.displayName}
                />
              </div>

              <div className="abilities mx-[20px] mt-10 ">
                <div className="role  flex text-center ">
                  <p className="agent-type font-bold tracking-wider text-[30px]">
                    {agentById.role.displayName}
                  </p>
                  <img
                    src={agentById.role.displayIcon}
                    className=" h-[25px] mt-3 ml-2 "
                  />
                </div>
                <p className=" tracking-wider">{agentById.role.description}</p>
                <div className="mt-10 mb-16">
                  {agentById.abilities
                    .filter((ability) => ability.slot !== "passive") // Filter out "passive" abilities
                    .slice(0, 4) // Take the first 4 abilities
                    .map((ability) => (
                      <li
                        key={ability.slot}
                        className="list-none flex mt-10 ml-10"
                      >
                        <img
                          title={ability.displayName}
                          src={ability.displayIcon}
                          alt={ability.displayName}
                          className="h-[80px] w-[80px] opacity-70"
                        />
                        <div className="abilities-name p-0 pl-20 bg-transparent transition-transform transform hover:scale-110  duration-500 ease-in-out cursor-default ">
                          <div className="flex font-bold text-[20px] tracking-wider ">
                            <p className="">{ability.slot}</p>:
                            <p className="pl-2 ">{ability.displayName}</p>
                          </div>
                          <p className="">{ability.description}</p>
                        </div>
                      </li>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
export default AgentId;
