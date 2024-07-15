// loaclStorageService.ts
const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const clearAllLocalStorage = (): void => {
  localStorage.clear();
};

const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

export {
  getLocalStorage,
  setLocalStorage,
  clearAllLocalStorage,
  removeLocalStorageItem,
};
