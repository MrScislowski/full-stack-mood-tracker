const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://scislowski.dev";

console.log(
  `backend url is ${BACKEND_URL} because node env is ${process.env.NODE_ENV}`,
);

export default { BACKEND_URL };
