export const OTHER_TAG = "other";

export const interiorWorkOptions = {
  new_bathroom: "New Bathroom",
  new_laundry_room: "New Laundry Room",
  bathroom_remodel: "Bathroom Remodel",
  [OTHER_TAG]: "Other Interior",
};
type interiorWorkOptionsType = typeof interiorWorkOptions;
export type InteriorWorkType = keyof interiorWorkOptionsType;

export const exteriorWorkOptions = {
  exterior_doors: "Exterior Doors",
  building_fences: "Building Fences",
  garage_door_replacement: "Garage Door Replacement",
  new_laundry_room: "New Laundry Room",
  reroofing: "Re-roofing",
  [OTHER_TAG]: "Other Exterior",
};
type exteriorWorkOptionsType = typeof exteriorWorkOptions;
export type ExteriorWorkType = keyof exteriorWorkOptionsType;

export type Permit = {
  type: "OTC" | "In-House" | "None";
  plans?: boolean;
};

export const residentialWorkOptions = {
  interior_work: "Interior Work",
  exterior_work: "Exterior Work",
};
type residentialWorkOptionsType = typeof residentialWorkOptions;
export type ResidentialWorkType = keyof residentialWorkOptionsType;
