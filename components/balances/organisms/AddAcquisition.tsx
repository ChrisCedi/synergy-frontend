"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AcquisitionForm } from "./AcquisitionForm";

export function AddAcquisition({
  companyData,
  balanceId,
}: {
  companyData: { name: string; capital: number };
  balanceId: number;
}) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold pb-6">Agregar adquisición</h2>
      {showForm ? (
        <div>
          <AcquisitionForm
            balanceId={balanceId}
            companyData={companyData}
            cancelForm={() => setShowForm(false)}
          />
        </div>
      ) : (
        <Button onClick={() => setShowForm(true)}>Agregar adquisición</Button>
      )}
    </div>
  );
}
