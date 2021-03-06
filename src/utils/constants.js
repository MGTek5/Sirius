const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.REACT_APP_URL || "https://sirius.nirah.tech";
const NO_HEADER_FOOTER = ["/register", "/login"];
const POSITION_COLLECTION =
  process.env.REACT_APP_POSITION_COLLECTION || "618d4cfd4e0cb";
const PUSH_COLLECTION =
  process.env.REACT_APP_PUSH_COLLECTION || "618e9ec6320c8";
const USER_POSITION_COLLECTION =
  process.env.REACT_APP_USER_POSITION_COLLECTION || "618ea78c946a1";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWF0ZmlyZTE5OTkiLCJhIjoiY2t2anA4eGVmMDd0aDMzb3U1M2s0cWp6aSJ9.J6uwIZao8WEhN2An1pi76Q";
const CREATE_PUSH_FUNCTION =
  process.env.REACT_APP_CREATE_PUSH_FUNCTION || "61af3351df63d";
const PUBLIC_VAPID_KEY =
  process.env.REACT_APP_PUBLIC_VAPID ||
  "BOwaPhIbJ5g1vArjer2w2nnZocaEkT2-6o5bCe7bTQRdcys2VI05kyemeL__auZvHwXbSBaPsWx9WTShVPX4iWI";
export {
  BASE_URL,
  NO_HEADER_FOOTER,
  POSITION_COLLECTION,
  PUSH_COLLECTION,
  CREATE_PUSH_FUNCTION,
  USER_POSITION_COLLECTION,
  MAPBOX_TOKEN,
  PUBLIC_VAPID_KEY,
};
