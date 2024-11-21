import { atom } from "recoil";

export const selectedMarkerState = atom({
  key: "selectedMarkerState",
  default: null,
});

export const isModalOpenState = atom({
  key: "isModalOpenState",
  default: false,
});

export const mapCenterState = atom({
  key: "mapCenterState",
  default: { lat: 33.450701, lng: 126.570667 },
});
