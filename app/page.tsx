"use client";
import { useEffect, useState } from "react";
import {
  ExteriorWorkType,
  InteriorWorkType,
  Permit,
  ResidentialWorkType,
  exteriorWorkOptions,
  interiorWorkOptions,
  residentialWorkOptions,
} from "./helpers/types";
import { Selection } from "./components/selection";
import { spoofServer } from "./helpers/server-spoof";
import { PermitDisplay } from "./components/permit-display";

export default function Home() {
  const [residentialWorkType, setResidentialWorkType] = useState<
    ResidentialWorkType | undefined
  >();
  const [residentialWorkSelection, setResidentialWorkSelection] = useState<
    InteriorWorkType[] | ExteriorWorkType[] | undefined
  >();
  const [permit, setPermit] = useState<Permit | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const residentialTypeSelectDisplay = (
    <Selection<ResidentialWorkType>
      options={residentialWorkOptions}
      onSelect={(tag) => setResidentialWorkType(tag as ResidentialWorkType)}
    />
  );
  const interiorTypeSelectDisplay = (
    <Selection<InteriorWorkType>
      options={interiorWorkOptions}
      onSelect={(tag) => setResidentialWorkSelection(tag as InteriorWorkType[])}
      multi
    />
  );
  const exteriorTypeSelectDisplay = (
    <Selection<ExteriorWorkType>
      options={exteriorWorkOptions}
      onSelect={(tag) => setResidentialWorkSelection(tag as ExteriorWorkType[])}
      multi
    />
  );
  const outputDisplay = loading ? (
    <>loading...</>
  ) : (
    permit && <PermitDisplay type={permit.type} plans={permit.plans} />
  );
  const clearButton = (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        setResidentialWorkType(undefined);
        setResidentialWorkSelection(undefined);
      }}
    >
      Clear
    </button>
  );
  useEffect(() => {
    if (!residentialWorkType || !residentialWorkSelection) return;
    setPermit(undefined); // reset after selection is made
    if (!residentialWorkSelection.length) return;
    setLoading(true);
    spoofServer(residentialWorkType, residentialWorkSelection)
      .then((result) => setPermit(result))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [residentialWorkSelection]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!residentialWorkType && residentialTypeSelectDisplay}
      {residentialWorkType === "interior_work" && interiorTypeSelectDisplay}
      {residentialWorkType === "exterior_work" && exteriorTypeSelectDisplay}
      {residentialWorkSelection && outputDisplay}
      {clearButton}
    </main>
  );
}
