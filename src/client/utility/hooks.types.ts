/**
 * File contains Redux specific hook typings and definitions
 * Recommend practice for TypeScript
 * ref: https://redux.js.org/tutorials/typescript-quick-start#define-typed-hooks
 */
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../store"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
