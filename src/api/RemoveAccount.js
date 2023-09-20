import Api from "./Api";

export async function removeAccount(id) {
  try {
    await Api.delete(`/accounts/${id}`);
  } catch (error) {
    alert("Loading failed: " + error.message);
  }
}
