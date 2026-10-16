
import React from "react";

const Discount = ({ bill, onDiscountChange }) => {
  const inputClass =
    "w-full min-w-0 rounded-lg border border-[#eadfc9] bg-[#fffbf2] px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

  const labelClass = "text-xs font-medium text-zinc-600";

  return (
    <div className="my-5">
      <h3 className="text-xl font-semibold text-zinc-900">
        Discount
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label className={labelClass}>Discount (%)</label>

          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={bill.discount.percent}
            onChange={(e) =>
              onDiscountChange("percent", e.target.value)
            }
            className={inputClass}
            placeholder="0"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <label className={labelClass}>Discount Amount (₹)</label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={bill.discount.amount}
            onChange={(e) =>
              onDiscountChange("amount", e.target.value)
            }
            className={inputClass}
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
};

export default Discount;
