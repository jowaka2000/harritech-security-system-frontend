import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  isCamerasMenu: false,
  activeUrlName: "",
  isHomeMenu: false,
  isBiometricSystems: false,
  isPerimeterSecurity: false,
  isAlarmSystem: false,
  isSystemGuidance: false,
  isAboutUs: false,
  setIsHomeMenu: () => {},
  setIsBiometricSystems: () => {},
  setIsPerimeterSecurity: () => {},
  setIsAlarmSystem: () => {},
  setIsSystemGuidance: () => {},
  setIsAboutUs: () => {},
  setActiveUrlName: () => {},
  setIsCamerasMenu: () => {},
});

export const SecuritySystemsContextProvider = ({ children }) => {
  const [isCamerasMenu, setIsCamerasMenu] = useState(false);
  const [activeUrlName, setActiveUrlName] = useState("Home");
  const [isHomeMenu, setIsHomeMenu] = useState(false);
  const [isBiometricSystems, setIsBiometricSystems] = useState(false);
  const [isPerimeterSecurity, setIsPerimeterSecurity] = useState(false);
  const [isAlarmSystem, setIsAlarmSystem] = useState(false);
  const [isSystemGuidance, setIsSystemGuidance] = useState(false);
  const [isAboutUs, setIsAboutUs] = useState(false);

  return (
    <StateContext.Provider
      value={{
        isCamerasMenu,
        activeUrlName,
        isHomeMenu,
        isBiometricSystems,
        isPerimeterSecurity,
        isAlarmSystem,
        isSystemGuidance,
        isAboutUs,
        setIsHomeMenu,
        setIsBiometricSystems,
        setIsPerimeterSecurity,
        setIsAlarmSystem,
        setIsSystemGuidance,
        setIsAboutUs,
        setActiveUrlName,
        setIsCamerasMenu,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useSecuritySystemsContextProvider = () => useContext(StateContext);
