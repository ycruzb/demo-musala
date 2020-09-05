import fetch from "isomorphic-unfetch";

export async function getAllGatewaysIds() {
  const res = await fetch(`${process.env.BASE_PATH}/api/gateways`);
  const data = await res.json();

  return data.gateways.map((gateway) => {
    return {
      params: {
        id: gateway._id,
      },
    };
  });
}

export async function getGatewayData(id) {
  const res = await fetch(`${process.env.BASE_PATH}/api/gateway/${id}`);
  const data = await res.json();

  // Combine the data with the id
  return {
    id,
    ...data.gateway,
  };
}
