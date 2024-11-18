import { atom } from "recoil";

export const selectedMarkerState = atom({
  key: "selectedMarkerState",
  default: null,
});

export const isModalOpenState = atom({
  key: "isModalOpenState",
  default: false,
});
