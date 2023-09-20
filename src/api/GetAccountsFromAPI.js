import Api from "./Api";

export async function getAccounts() {
  let dataAccount;
  try {
    const response = await Api.get(`/accounts`);
    dataAccount = response.data;
  } catch (error) {
    alert("Loading failed: " + error.message);
  }
  return dataAccount;
}
