export const doAsync = (f, args = []) => {
  setTimeout(() => {
    f.call(null, ...args);
  }, 1);
};
export const createAsyncFunction = f => (...args) => doAsync(f, args);
