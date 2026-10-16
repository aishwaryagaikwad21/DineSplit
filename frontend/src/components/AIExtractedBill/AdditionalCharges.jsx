
import React from "react";

const AdditionalCharges = ({
  bill,
  chargeNames,
  onChange,
  onBlur,
  onAmountChange,
}) => {
  const inputClass =
    "w-full min-w-0 rounded-lg border border-[#eadfc9] bg-[#fffbf2] px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

  const labelClass = "text-xs font-medium text-zinc-600";

  return (
    <div className="my-5">
      <h3 className="text-xl font-semibold text-zinc-900">
        Additional Charges
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.entries(bill.additionalCharges).map(
          ([chargeName, amount]) => (
            <div
              key={chargeName}
              className="flex min-w-0 flex-col gap-2 border-b border-[#eadfc9] pb-4 last:border-b-0 sm:last:border-b-0"
            >
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  Charge Name
                </label>

                <input
                  type="text"
                  value={chargeNames[chargeName] ?? chargeName}
                  onChange={(e) =>
                    onChange(chargeName, e.target.value)
                  }
                  onBlur={(e) =>
                    onBlur(chargeName, e.target.value)
                  }
                  className={inputClass}
                  placeholder="e.g. CGST"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  Amount (₹)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) =>
                    onAmountChange(chargeName, e.target.value)
                  }
                  className={inputClass}
                  placeholder="0.00"
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdditionalCharges;
