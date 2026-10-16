import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ReceiptText, Plus } from "lucide-react";
import { Button } from "@base-ui/react/button";

import BillDishes from "@/components/AIExtractedBill/BillDishes";
import AddNewDishForm from "@/components/AIExtractedBill/AddNewDishForm";
import AdditionalCharges from "@/components/AIExtractedBill/AdditionalCharges";
import AddNewChargeForm from "@/components/AIExtractedBill/AddNewChargeForm";
import Discount from "@/components/AIExtractedBill/Discount";

import { confirmBillService } from "@/services/confirmBill";

const ManualBill = () => {
  const navigate = useNavigate();

  const [bill, setBill] = useState({
    dishes: [],
    subtotal: 0,
    additionalCharges: {
      CGST: 0,
      SGST: 0,
    },
    discount: {
      percent: "0%",
      amount: 0,
    },
    grandTotal: 0,
  });

  const [chargeNames, setChargeNames] = useState({});
  const [showDishForm, setShowDishForm] = useState(false);
  const [showChargeForm, setShowChargeForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newDish, setNewDish] = useState({
    dishName: "",
    price: "",
    quantity: "1",
  });

  const [newCharge, setNewCharge] = useState({
    name: "",
    amount: "",
  });

  // Recalculate bill totals
  const calculateTotals = (updatedBill) => {
    const subtotal = updatedBill.dishes.reduce(
      (total, dish) =>
        total +
        Number(dish.price || 0) * Number(dish.quantity || 0),
      0
    );

    const chargesTotal = Object.values(
      updatedBill.additionalCharges
    ).reduce((total, amount) => total + Number(amount || 0), 0);

    const discountAmount = Number(updatedBill.discount.amount || 0);

    return {
      ...updatedBill,
      subtotal,
      grandTotal: Math.max(
        0,
        subtotal + chargesTotal - discountAmount
      ),
    };
  };

  // Edit existing dish
  const handleDishChange = (index, field, value) => {
    setBill((prev) => {
      const dishes = prev.dishes.map((dish, i) => {
        if (i !== index) return dish;

        const updatedDish = {
          ...dish,
          [field]: value,
        };

        updatedDish.itemTotal =
          Number(updatedDish.price || 0) *
          Number(updatedDish.quantity || 0);

        return updatedDish;
      });

      return calculateTotals({ ...prev, dishes });
    });
  };

  // Add a new dish
  const handleAddDish = () => {
    const dishName = newDish.dishName.trim();
    const price = Number(newDish.price);
    const quantity = Number(newDish.quantity);

    if (
      !dishName ||
      newDish.price === "" ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      setError("Enter a valid dish name, price and quantity.");
      return;
    }

    setBill((prev) =>
      calculateTotals({
        ...prev,
        dishes: [
          ...prev.dishes,
          {
            dishName,
            price,
            quantity,
            itemTotal: price * quantity,
          },
        ],
      })
    );

    setNewDish({
      dishName: "",
      price: "",
      quantity: "1",
    });

    setError("");
    setShowDishForm(false);
  };

  const handleNewDishChange = (field, value) => {
    setNewDish((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Change an existing charge amount
  const handleChargeAmountChange = (chargeName, value) => {
    setBill((prev) =>
      calculateTotals({
        ...prev,
        additionalCharges: {
          ...prev.additionalCharges,
          [chargeName]: value,
        },
      })
    );
  };

  // Temporarily track charge name edits
  const handleChargeNameTyping = (oldName, value) => {
    setChargeNames((prev) => ({
      ...prev,
      [oldName]: value,
    }));
  };

  // Save a changed charge name
  const handleChargeNameChange = (oldName, newName) => {
    const name = newName.trim();

    if (!name || name === oldName) {
      setChargeNames((prev) => {
        const updated = { ...prev };
        delete updated[oldName];
        return updated;
      });
      return;
    }

    if (Object.hasOwn(bill.additionalCharges, name)) {
      setError("A charge with that name already exists.");
      setChargeNames((prev) => {
        const updated = { ...prev };
        delete updated[oldName];
        return updated;
      });
      return;
    }

    setBill((prev) => {
      const charges = { ...prev.additionalCharges };
      const amount = charges[oldName];

      delete charges[oldName];
      charges[name] = amount;

      return calculateTotals({
        ...prev,
        additionalCharges: charges,
      });
    });

    setChargeNames((prev) => {
      const updated = { ...prev };
      delete updated[oldName];
      return updated;
    });

    setError("");
  };

  // Add a new charge
  const handleNewChargeChange = (field, value) => {
    setNewCharge((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCharge = () => {
    const name = newCharge.name.trim();
    const amount = Number(newCharge.amount);

    if (
      !name ||
      newCharge.amount === "" ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      setError("Enter a valid charge name and amount.");
      return;
    }

    if (Object.hasOwn(bill.additionalCharges, name)) {
      setError("A charge with that name already exists.");
      return;
    }

    setBill((prev) =>
      calculateTotals({
        ...prev,
        additionalCharges: {
          ...prev.additionalCharges,
          [name]: amount,
        },
      })
    );

    setNewCharge({
      name: "",
      amount: "",
    });

    setError("");
    setShowChargeForm(false);
  };

  // Update discount
  const handleDiscountChange = (field, value) => {
    setBill((prev) => {
      const discount = { ...prev.discount };

      if (field === "percent") {
        discount.percent = value;

        const percent = Number(value.replace("%", ""));

        if (
          value.trim() !== "" &&
          Number.isFinite(percent) &&
          percent >= 0 &&
          percent <= 100
        ) {
          discount.amount = Number(
            ((prev.subtotal * percent) / 100).toFixed(2)
          );
        }
      } else {
        discount.amount = value;
      }

      return calculateTotals({
        ...prev,
        discount,
      });
    });
  };

  // Confirm and save the bill
  const handleConfirmBill = async () => {
    setError("");

    if (bill.dishes.length === 0) {
      setError("Please add at least one dish.");
      return;
    }

    const invalidDish = bill.dishes.some(
      (dish) =>
        !dish.dishName.trim() ||
        !Number.isFinite(Number(dish.price)) ||
        Number(dish.price) < 0 ||
        !Number.isInteger(Number(dish.quantity)) ||
        Number(dish.quantity) < 1
    );

    if (invalidDish) {
      setError("Please check the name, price and quantity of each dish.");
      return;
    }

    const invalidCharge = Object.values(
      bill.additionalCharges
    ).some(
      (amount) =>
        amount === "" ||
        !Number.isFinite(Number(amount)) ||
        Number(amount) < 0
    );

    if (invalidCharge) {
      setError("Please enter valid amounts for all charges.");
      return;
    }

    const percent = Number(bill.discount.percent.replace("%", ""));

    if (
      !Number.isFinite(percent) ||
      percent < 0 ||
      percent > 100 ||
      !Number.isFinite(Number(bill.discount.amount)) ||
      Number(bill.discount.amount) < 0
    ) {
      setError("Please enter a valid discount.");
      return;
    }

    try {
      setLoading(true);

      const billToSend = {
        dishes: bill.dishes.map((dish) => ({
          dishName: dish.dishName.trim(),
          price: Number(dish.price),
          quantity: Number(dish.quantity),
          itemTotal:
            Number(dish.price) * Number(dish.quantity),
        })),

        subtotal: bill.subtotal,

        additionalCharges: Object.fromEntries(
          Object.entries(bill.additionalCharges).map(
            ([name, amount]) => [name.trim(), Number(amount)]
          )
        ),

        discount: {
          percent: bill.discount.percent,
          amount: Number(bill.discount.amount),
        },

        grandTotal: bill.grandTotal,
      };

      const data = await confirmBillService(billToSend);

      navigate("/split-details", {
        state: {
          confirmBill: data,
        },
      });
    } catch (err) {
      setError(
        err.message || "Failed to confirm bill. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFBF2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cursor-pointer mb-6 flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <header className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
            <ReceiptText className="h-6 w-6 text-[#b86600]" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
            DineSplit
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            Enter bill details
          </h1>

          <p className="mt-2 text-zinc-600">
            Enter your dishes, prices and charges to calculate the bill.
          </p>
        </header>

        <div className="space-y-6">
          {/* Dishes */}
          <section className="rounded-2xl border border-[#F3E8D0] bg-white p-5 shadow-sm sm:p-7">
            <BillDishes
              dishes={bill.dishes}
              onDishChange={handleDishChange}
            />

            {showDishForm && (
              <AddNewDishForm
                newDish={newDish}
                onChange={handleNewDishChange}
                onSubmit={handleAddDish}
                onCancel={() => setShowDishForm(false)}
              />
            )}

            <div className="mt-5 flex justify-center">
              <Button
                type="button"
                onClick={() => setShowDishForm((prev) => !prev)}
                className="cursor-pointer rounded-xl bg-amber-400 px-6 py-3 font-semibold text-zinc-900 hover:bg-amber-500"
              >
                <div className="flex gap-1 items-center justify-center">
                    Add Dish
                    <Plus className="mt-1" size={17} />
                </div>
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-[#FFFBF2] p-4">
              <span className="font-semibold text-zinc-700">
                Subtotal
              </span>
              <span className="text-xl font-bold text-zinc-900">
                ₹{bill.subtotal.toFixed(2)}
              </span>
            </div>
          </section>

          {/* Additional charges */}
          <section className="rounded-2xl border border-[#F3E8D0] bg-white p-5 shadow-sm sm:p-7">
            <AdditionalCharges
              bill={bill}
              chargeNames={chargeNames}
              onChange={handleChargeNameTyping}
              onBlur={handleChargeNameChange}
              onAmountChange={handleChargeAmountChange}
            />

            {showChargeForm && (
              <AddNewChargeForm
                newCharge={newCharge}
                onChange={handleNewChargeChange}
                onAddCharge={handleAddCharge}
                onCancel={() => setShowChargeForm(false)}
              />
            )}

            <div className="mt-5 flex justify-center">
              <Button
                type="button"
                onClick={() => setShowChargeForm((prev) => !prev)}
                className="cursor-pointer rounded-xl bg-amber-400 px-6 py-3 font-semibold text-zinc-900 hover:bg-amber-500"
              >
                <div className="flex gap-1 items-center justify-center">
                    Add Charge
                    <Plus className="mt-1" size={17} />
                </div>
              </Button>
            </div>
          </section>

          {/* Discount */}
          <section className="rounded-2xl border border-[#F3E8D0] bg-white p-5 shadow-sm sm:p-7">
            <Discount
              bill={bill}
              onDiscountChange={handleDiscountChange}
            />
          </section>

          {/* Grand total */}
          <section className="rounded-2xl bg-zinc-900 p-5 text-white sm:p-7">
            <p className="text-sm text-zinc-300">Grand Total</p>
            <p className="mt-1 text-3xl font-bold">
              ₹{bill.grandTotal.toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Review your entries before confirming.
            </p>
          </section>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <Button
            type="button"
            onClick={handleConfirmBill}
            disabled={loading}
            className="cursor-pointer h-12 w-full rounded-xl bg-amber-400 font-semibold text-zinc-900 hover:bg-amber-500"
          >
            {loading ? "Confirming bill..." : "Confirm Bill"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ManualBill;