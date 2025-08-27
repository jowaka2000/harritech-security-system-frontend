import ipCamera from "../assets/security-systems/ip_camera1.png";
import dvrsAndNvrs from "../assets/security-systems/dvrs_nvrs2.png";
import analogueHdCamera from "../assets/security-systems/analogue_hd_camera.jpeg";
import vehicleDvrs from "../assets/security-systems/vehicle_dvrs.png";
import vehicleCameras from "../assets/security-systems/vehicle_camera.png";

export const Cameras = [
  {
    id: 1,
    category: "Camera",
    name: "Ip Cameras",
    desName: "IP Camera Installation",
    price: 8000,
    image: ipCamera,
    shortDes:
      "Offers high-resolution video surveillance with remote access through any internet-connected device.",
  },
  {
    id: 2,
    category: "Camera",
    name: "DVRs and NVRs",
    desName: "DVRs and NVRs",
    price: 10000,
    image: dvrsAndNvrs,
    shortDes:
      "Essential componets of security system working with both analogue cameras and recording video streams from IP camera",
  },
  {
    id: 3,
    category: "Camera",
    name: "Analogue HD Cameras",
    desName: "Analogue HD Cameras",
    price: 5000,
    image: analogueHdCamera,
    shortDes:
      "High-definition analogue cameras bring superior quality video surveillance with an easy-to-install setup.",
  },
  {
    id: 4,
    category: "Camera",
    name: "Vehicle DVRs",
    desName: "Vehicle DVRs Installation",
    price: 3000,
    image: vehicleDvrs,
    shortDes:
      "Vehicle DVRs capture every moment on the road, ensuring safety and accountability for your vehicle.",
  },
  {
    id: 5,
    category: "Camera",
    name: "Vehicle Cameras",
    desName: "Vehicle Cameras",
    price: 10000,
    image: vehicleCameras,
    shortDes:
      "Protect your vehicle from theft and accidents with high-quality vehicle cameras.",
  },
];



export const biometricSystems = [];