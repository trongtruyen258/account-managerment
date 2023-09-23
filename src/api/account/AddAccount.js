import Api from "../Api";

export async function addAccount(data) {
  try {
    await Api.post(`/accounts`, data);
  } catch (error) {
    alert("Loading failed: " + error.message);
  }
}
