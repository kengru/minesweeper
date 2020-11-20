import axios from "axios";
import { Config } from "./config";

export const odin = axios.create({
  baseURL: Config.ODIN_URL
});
