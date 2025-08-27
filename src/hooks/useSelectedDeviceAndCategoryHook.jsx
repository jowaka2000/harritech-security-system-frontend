export const useSelectedDeviceAndCategoryHook = (category) => {
  let device = [];
  if (category === "Cameras") {
    device = [
      "Ip Cameras",
      "DVRs and NVRs",
      "Analogue HD Cameras",
      "Vehicle DVRs",
      "Vehicle Cameras",
    ];
  } else if (category === "Biometric Systems") {
    device = ["Access Control", "Attedance Systems", "Software and Solutions"];
  } else if (category === "Perimeter Security") {
    device = ["Electric Fence", "Automatic Gates"];
  } else if (category === "Alarm Systems") {
    device = ["Intruder alarm systems", "Fire alarm systems", "Fire doors"];
  } else {
    device = [];
  }

  return {device};
};
