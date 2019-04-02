export const sendToDatabase = async (address, data) => {
  const settings = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  let response = await fetch(address, settings);
  return response;
};

export const fetchFromDatabase = async address => {
  let response = await fetch(address);
  let json = await response.json();
  return json;
};

export const deleteFromDatabase = async address => {
  const settings = {
    method: 'delete'
  };
  let response = await fetch(address, settings);
  return response;
};
