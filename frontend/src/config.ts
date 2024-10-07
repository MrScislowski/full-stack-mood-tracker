const BACKEND_URL =
  process.env.NODE === "development"
    ? "http://localhost:3000"
    : "https://scislowski.dev";

export default { BACKEND_URL };
