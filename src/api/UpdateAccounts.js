import Api from "./Api";

export async function updateAccount(data) {
  try {
    await Api.put(`/accounts/${data.id}`, data);
  } catch (error) {
    alert("Loading failed: " + error.message);
  }
}
