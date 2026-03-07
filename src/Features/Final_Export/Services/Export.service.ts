// Services/Export.service.ts
import axios from "axios";

const API_URL = "https://skillsensebe-production.up.railway.app";

class ExportService {
  static async CreateAutomation(
newRepoName: string, user_id: string | number, envVars: Record<string, string | number> = {}  ) {
    const response = await axios.post(`${API_URL}/api/v1/automation`, {
      newRepoName,
      user_id,
      envVars,
    });
    return response.data;
  }
}

export default ExportService;
