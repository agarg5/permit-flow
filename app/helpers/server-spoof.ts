import { InteriorWorkType, ExteriorWorkType, Permit } from "./types";

export async function spoofServer(
  workType: InteriorWorkType | ExteriorWorkType
): Promise<Permit | undefined> {
  switch (workType) {
    // interior
    case "new_laundry_room":
    case "new_bathroom":
      return { type: "OTC", plans: true };
    case "bathroom_remodel":
    case "other_interior":
      return { type: "OTC", plans: false };

    // exterior
    case "other_exterior":
      return { type: "In-House" };
    case "garage_door_replacement":
    case "exterior_doors":
      return { type: "OTC", plans: true };
    case "reroofing":
      return { type: "OTC", plans: false };
    case "building_fences":
      return { type: "None" };
  }
}
