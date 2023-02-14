// Dependencies
import { TypedUseSelectorHook, useSelector as useBaseSelector } from "react-redux";
import { RootState } from "../store";

const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;

export default useSelector;
