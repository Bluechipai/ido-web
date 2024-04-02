import {useContext} from "react";
import {MessageContext} from "../provider/MessageProvider";

export function useMessage() {
  const {showMessage, showError, destoryMessageBox} = useContext(MessageContext);
  return {showMessage, showError, destoryMessageBox}
}
