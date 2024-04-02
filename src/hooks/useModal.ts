import { useContext } from "react";
import { ModalContext } from "../components/ModalContext/ModalContext";

export default function useModal() {
  return useContext(ModalContext);
}
