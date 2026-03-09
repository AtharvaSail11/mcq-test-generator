import { createContext } from "react";
import type { McqTestInterface } from "../types/McqTypes";

export const McqTestContext=createContext<McqTestInterface | null>(null);