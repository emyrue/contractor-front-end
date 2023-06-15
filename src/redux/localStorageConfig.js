const saveToLocalStorage = (bearerToken) => {
  try {
    const serializedToken = JSON.stringify(bearerToken);
    localStorage.setItem('Authorization', serializedToken);
  } catch (e) {
    console.warn(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedToken = localStorage.getItem('Authorization');
    if (serializedToken === null) return undefined;
    return JSON.parse(serializedToken);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export { saveToLocalStorage, loadFromLocalStorage };
