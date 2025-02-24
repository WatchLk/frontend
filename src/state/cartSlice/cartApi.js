const baseUrl = "https://localhost:7003/api/Cart";

// Sync cart with cart db
export const syncCart = async (props) => {
  try {
    const dataToSend = {
      items: props.cart.map((c) => ({ ...c, userId: props.userId })),
    };
    const res = await fetch(`${baseUrl}/SyncCart/${props.userId}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify(dataToSend),
    });
    const data = await res.json();
    if (!data.succeeded) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Internal server error, Unable to sync cart"
    );
  }
};
