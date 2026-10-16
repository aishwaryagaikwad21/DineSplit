
import React from "react";

const BillDishes = ({ dishes, onDishChange }) => {
  const inputClass =
    "w-full min-w-0 rounded-lg border border-[#eadfc9] bg-[#fffbf2] px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100 disabled:bg-[#f8f4eb] disabled:text-zinc-600";

  const labelClass = "text-xs font-medium text-zinc-600";

  return (
    <div>
      <h3 className="text-xl font-semibold text-zinc-900">
        Dishes
      </h3>

      <div className="mt-3">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="grid grid-cols-4 max-sm:grid-cols-2 gap-x-4 gap-y-4 border-b border-[#eadfc9] py-5 last:border-b-0 sm:gap-x-6"
          >
            <div className="flex min-w-0 flex-col gap-1.5">
              <label className={labelClass}>Dish Name</label>

              <input
                type="text"
                value={dish.dishName}
                onChange={(e) =>
                  onDishChange(index, "dishName", e.target.value)
                }
                className={inputClass}
                placeholder="e.g. Paneer Tikka"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label className={labelClass}>Price (₹)</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={dish.price}
                onChange={(e) =>
                  onDishChange(index, "price", e.target.value)
                }
                className={inputClass}
                placeholder="0.00"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label className={labelClass}>Quantity</label>

              <input
                type="number"
                min="1"
                step="1"
                value={dish.quantity}
                onChange={(e) =>
                  onDishChange(index, "quantity", e.target.value)
                }
                className={inputClass}
                placeholder="1"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label className={labelClass}>Item Total</label>

              <input
                type="text"
                value={`₹${Number(dish.itemTotal || 0).toFixed(2)}`}
                readOnly
                className={`${inputClass} cursor-default font-semibold`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillDishes;
