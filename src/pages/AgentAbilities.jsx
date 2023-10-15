import axios from "axios";
import { useEffect, useState } from "react";

function AgentId() {
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
  return (
    <>
      <h1>Agent id page test</h1>
    </>
  );
}
export default AgentId;
