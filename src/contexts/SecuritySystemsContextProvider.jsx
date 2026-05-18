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

  const [productsAndSolutions, setProductsAndSolutions] = useState([]);

  const fetchNamesUrl = () => {
    axiosClient
      .get("/systems/get-systems-names")
      .then((res) => {
       
        const formatted = res.data.map((category, index) => ({
          id: index + 1,
          name: category.name,
          elements: category.elements
            .sort((a, b) => {
              // SAFETY CHECK: Convert to lowercase string, default to empty string
              const aType = (a.type || "").toLowerCase();
              const bType = (b.type || "").toLowerCase();

              // DEBUG: Check console to see what types are actually coming back
              // console.log('Comparing:', aType, bType);

              if (aType === "perimeter" && bType !== "perimeter") return -1;
              if (aType !== "perimeter" && bType === "perimeter") return 1;
              return 0;
            })
            .map((el) => ({
              id: el.id,
              url: el.url,
              public_url:el.public_url,
              name: el.name,
              shortDescription: el.shortDescription,
              front_image: el.front_image,
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
