"use client";
import { AccountProfileSchema, EmployeeType } from "@/@types/account.type";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface EmployeeHooks {
  employe: EmployeeType[];
  setEmploye: Dispatch<SetStateAction<EmployeeType[]>>;
}

export const EmployeeContext = createContext<EmployeeHooks | null>(null);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employe, setEmploye] = useState<EmployeeType[]>([]);
  return (
    <EmployeeContext.Provider value={{ employe, setEmploye }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error("Context not found!");
  return context;
};
