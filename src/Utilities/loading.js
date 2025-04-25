let loading = false;
let subscribers = [];

export const setLoading = (value) => {
  loading = value;
  subscribers.forEach((fn) => fn(loading));
};

export const getLoading = () => loading;

export const subscribeLoading = (fn) => {
  subscribers.push(fn);
  return () => {
    subscribers = subscribers.filter((sub) => sub !== fn);
  };
};