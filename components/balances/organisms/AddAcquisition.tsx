"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AcquisitionForm } from "./AcquisitionForm";

export function AddAcquisition({
  companyData,
}: {
  companyData: { name: string; capital: number };
}) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="mt-4">
      {showForm ? (
        <div>
          <AcquisitionForm
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
