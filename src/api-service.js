export default {
  getItems: () => {
    const options = {
      method: 'GET',
    };
    return fetch('/api/items', options)
      .then(response => response.json());
  },
};
