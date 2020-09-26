let headers = new Headers();

let getPostHeaders = () => {
  return {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: headers,
  };
};

export { getPostHeaders };
