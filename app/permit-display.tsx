import { Permit } from "./types";

export function PermitDisplay(props: Permit) {
  const { type, plans } = props;
  function getPermitTypeText() {
    switch (type) {
      case "In-House":
        return `In-House Review Process
              A building permit is required.
              ${plans ? "Include plan sets." : ""}
              Submit application for in-house review.`;
      case "OTC":
        return `A building permit is required.
              ${plans ? "Include plan sets." : ""}
              Submit application for OTC review.`;
      case "None":
        return "Nothing is required! You’re set to build.";
    }
  }
  return <div className="mb-5 text-xl text-bold">{getPermitTypeText()}</div>;
}
