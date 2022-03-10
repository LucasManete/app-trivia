export const saveLocalStorage = (local, itemTosave) => localStorage
  .setItem(local, JSON.stringify(itemTosave));

export const getLocalStorage = (localName) => JSON.parse(localStorage.getItem(localName));
