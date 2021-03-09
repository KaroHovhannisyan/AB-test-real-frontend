import ServiceBase from "../../../services/apiServiceBase";

class AbTestService extends ServiceBase {

  async getUsers(request) {
    const response = await this.get(`${this.apiUrl}/users`, request);

    return response;
  }

  async saveUsers(request) {
    const response = await this.post(`${this.apiUrl}/users/add`, request);

    return response;
  }

  async getCalculate(request) {
    const response = await this.get(`${this.apiUrl}/users/rolling-retention/${request}`);

    return response;
  }

  async deleteUser(userId) {
    const response = await this.delete(`${this.apiUrl}/users/${userId}`);

    return response;
  }

}

export default new AbTestService();
