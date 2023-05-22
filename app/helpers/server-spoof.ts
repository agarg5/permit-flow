import assert from "assert";
import {
  InteriorWorkType,
  ExteriorWorkType,
  Permit,
  ResidentialWorkType,
} from "./types";

export async function spoofServer(
  residentialWorkType: ResidentialWorkType,
  workTypes: InteriorWorkType[] | ExteriorWorkType[]
): Promise<Permit | undefined> {
  if (residentialWorkType === "interior_work") {
    const works = workTypes as InteriorWorkType[];
    return {
      type: "OTC",
      plans:
        works.includes("new_laundry_room") || works.includes("new_bathroom"),
    };
  } else if (residentialWorkType === "exterior_work") {
    const works = workTypes as ExteriorWorkType[];
    if (works.includes("other")) return { type: "In-House" };
    if (
      works.includes("garage_door_replacement") ||
      works.includes("exterior_doors")
    )
      return { type: "OTC", plans: true };
    if (works.includes("reroofing")) return { type: "OTC", plans: false };
    return { type: "None" };
  }
  assert("residential work type must be either interior_work or exterior_work");
}
