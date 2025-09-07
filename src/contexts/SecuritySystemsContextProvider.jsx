import { createContext, useContext, useState } from "react";
import axiosClient from "../axiosClient";

const StateContext = createContext({
  isCamerasMenu: false,
  activeUrlName: "",
  isHomeMenu: Boolean,
  isBiometricSystems: Boolean,
  isPerimeterSecurity: Boolean,
  isAlarmSystem: false,
  isSystemGuidance: Boolean,
  isAboutUs: Boolean,
  productsAndSolutions: [],
  fetchNamesUrl: () => {},
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

  const [productsAndSolutions, setProductsAndSolutions] = useState([
    {
      id: 1,
      name: "Cameras",
      elements: [
        { id: 1, name: "IP Cameras" },
        { id: 2, name: "DVRs and NVRs" },
        { id: 3, name: "Analogue HD Cameras" },
        { id: 4, name: "Vehicle DVRs" },
        { id: 5, name: "Vehicle Cameras" },
      ],
    },
    {
      id: 2,
      name: "Biometric",
      elements: [
        { id: 1, name: "Access Control" },
        { id: 2, name: "Attendance Systems" },
        { id: 3, name: "Software and Solutions" },
      ],
    },
    {
      id: 3,
      name: "Perimeter",
      elements: [
        { id: 1, name: "Electric Fence" },
        { id: 2, name: "Automatic Gates" },
      ],
    },
    {
      id: 4,
      name: "Alarm",
      elements: [
        { id: 1, name: "Intruder Alarm Systems" },
        { id: 2, name: "Fire Alarm Systems" },
        { id: 3, name: "Fire Doors" },
      ],
    },
    {
      id: 5,
      name: "Guidance",
      elements: [
        { id: 1, name: "CCTV Installation Guide" },
        { id: 2, name: "Home Security Systems Setup" },
        { id: 3, name: "Security Consultancy" },
      ],
    },
  ]);

  const fetchNamesUrl = () => {
    axiosClient
      .get("/systems/get-systems-names")
      .then((res) => {
        const formatted = res.data.map((category, index) => ({
          id: index + 1,
          name: category.name,
          elements: category.elements.map((el) => ({
            id: el.id,
            url: el.url,
            name: el.name,
          })),
        }));

        setProductsAndSolutions(formatted);
      })
      .catch((err) => {
        console.error("Error fetching systems:", err);
      });
  };

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
        productsAndSolutions,
        fetchNamesUrl,
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
