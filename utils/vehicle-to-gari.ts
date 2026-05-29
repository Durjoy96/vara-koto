export type VehicleId = "rickshaw" | "van" | "auto" | "cng" | "bus" | "train";

const vehicleMap: Record<string, string> = {
  rickshaw: "রিকশা",
  van: "ভ্যান",
  auto: "অটো",
  cng: "সিএনজি",
  bus: "বাস",
  train: "ট্রেন",
};

export function VehicleToGari(id: VehicleId | string): string {
  return vehicleMap[id] || id;
}
