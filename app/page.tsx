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
} from "./types";
import { Selection } from "./selection";
import { spoofServer } from "./server-spoof";
import { PermitDisplay } from "./permit-display";

export default function Home() {
  const [residentialWorkType, setResidentialWorkType] = useState<
    ResidentialWorkType | undefined
  >();
  const [residentialWorkSelection, setResidentialWorkSelection] = useState<
    InteriorWorkType | ExteriorWorkType | undefined
  >();
  const [permit, setPermit] = useState<Permit | undefined>();

  const residentialTypeSelectDisplay = (
    <Selection<ResidentialWorkType>
      options={residentialWorkOptions}
      onSelect={(tag) => setResidentialWorkType(tag)}
    />
  );
  const interiorTypeSelectDisplay = (
    <Selection<InteriorWorkType>
      options={interiorWorkOptions}
      onSelect={(tag) => setResidentialWorkSelection(tag)}
    />
  );
  const exteriorTypeSelectDisplay = (
    <Selection<ExteriorWorkType>
      options={exteriorWorkOptions}
      onSelect={(tag) => setResidentialWorkSelection(tag)}
    />
  );
  const outputDisplay = permit ? (
    <PermitDisplay type={permit.type} plans={permit.plans} />
  ) : (
    <>loading...</>
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
    if (!residentialWorkSelection) return;
    setPermit(undefined);
    spoofServer(residentialWorkSelection)
      .then((result) => setPermit(result))
      .catch((error) => alert(error));
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
