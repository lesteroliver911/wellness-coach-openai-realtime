import wellnessCoach from "./wellnessCoach";
import { injectTransferTools } from "./utils";

const agents = injectTransferTools([wellnessCoach]);

export const allAgentSets = {
  wellnessCoach: agents
};

export const defaultAgentSetKey = "wellnessCoach";
