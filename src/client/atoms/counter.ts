import { atom, selector } from "recoil";

export const counter = atom({
  key: "counter",
  default: 0
});

export const previousCount = selector({
  key: "previous",
  get: ({ get }) => {
    const count = get(counter);
    return count - 1;
  }
});
