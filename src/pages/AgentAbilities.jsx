import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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
    return (
      <div className="text-center">
        <div className="Loading  opacity-40">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center">
        <div className="Loading  opacity-40">Error : ... {error}</div>
      </div>
    );
  }
  return (
    <>
      <div className="agent-abilities">
        <Link to={`/`}>
          <div className="absolute ">
            <img
              className="w-[20%] m-10"
              src="https://cdn.discordapp.com/attachments/1144637676016898219/1167534638571458610/home.png?ex=654e7a5d&is=653c055d&hm=22f5125b5dd05a59114a504399630c1848cf6618dab66f5153d0184e1c54d745&"
            ></img>
          </div>
        </Link>
        {agentById && (
          <div className="agent">
            <div className="lg:px-[22%] pt-[2%]">
              <h1
                className="text-rose-500 text-center text-[50px] font-bold"
                title={agentById.displayName}
              >
                {agentById.displayName}
              </h1>

              <p className="px-20 tracking-wider font-semibold mt-4">
                {agentById.description}
              </p>
            </div>
            <div className="agent-portrait-abilities  flex justify-center lg:px-[10%]">
              <div className="agent-portrait mt-10 h-[900px] w-[500px]">
                <img
                  src={agentById.fullPortraitV2}
                  alt={agentById.displayName}
                  className="w-full h-full object-cover "
                  title={agentById.displayName}
                />
              </div>

              <div className="abilities mx-[20px] mt-10 ">
                <div className="role  flex text-center ">
                  <p
                    className="agent-type font-bold tracking-wider text-[30px]"
                    title={agentById.role.displayName}
                  >
                    {agentById.role.displayName}
                  </p>
                  <img
                    src={agentById.role.displayIcon}
                    className=" h-[25px] mt-3 ml-2 "
                    title={agentById.role.displayName}
                  />
                </div>
                <p className="tracking-wider">{agentById.role.description}</p>
                <div className="mb-16 ">
                  {agentById.abilities
                    .filter((ability) => ability.slot !== "passive") // Filter out "passive" abilities
                    .slice(0, 4) // Take the first 4 abilities
                    .map((ability) => (
                      <li
                        key={ability.slot}
                        className="list-none flex py-4 my-[10%]"
                      >
                        <img
                          title={ability.displayName}
                          src={ability.displayIcon}
                          alt={ability.displayName}
                          className="h-[80px] w-[80px] opacity-70 my-4"
                        />
                        <div className="abilities-name absolute pl-6 py-4 ml-40 w-[38%] transition-transform transform hover:scale-110 duration-500 ease-in-out cursor-default ">
                          <div className="flex font-bold text-[20px] tracking-wider bg-transparent">
                            <p className=" bg-transparent">{ability.slot}</p>:
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
