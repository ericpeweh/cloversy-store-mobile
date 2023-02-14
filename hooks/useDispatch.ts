// Dependencies
import { useDispatch as useBaseDispatch } from "react-redux";
import { AppDispatch } from "../store";

const useDispatch: () => AppDispatch = useBaseDispatch;

export default useDispatch;
