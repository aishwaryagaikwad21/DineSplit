import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const splitResult = location.state?.splitResult;

  // Handle missing router state, such as refreshing the page.
  if (!splitResult) {
    return (
      <main className="min-h-screen bg-[#FFFBF2] p-6">
        <h1 className="text-2xl font-bold text-zinc-900">
          Split result unavailable
        </h1>

        <p className="mt-2 text-zinc-600">
          Please calculate the split again.
        </p>

        <button
          onClick={() => navigate("/get-started")}
          className="mt-5 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white"
        >
          Start again
        </button>
      </main>
    );
  }

  const { members, totalAmount, splitType } = splitResult;

  const downloadMemberPDF = (member) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("DineSplit", 20, 20);

    doc.setFontSize(14);
    doc.text("Your Bill Summary", 20, 32);

    doc.setFontSize(12);
    doc.text(`Name: ${member.name}`, 20, 48);
    doc.text(`Split type: ${splitType}`, 20, 58);

    doc.setFontSize(14);
    doc.text("Your items", 20, 75);

    let y = 87;

    if (member.items?.length) {
      member.items.forEach((item) => {
        // Add a new page if the content exceeds the page.
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(11);
        doc.text(item.dishname, 20, y);
        doc.text(
          `Rs. ${Number(item.amount).toFixed(2)}`,
          190,
          y,
          { align: "right" }
        );

        y += 10;
      });
    } else {
      doc.setFontSize(11);
      doc.text("No individual items listed.", 20, y);
      y += 10;
    }

    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.text(
      `Total amount owed: Rs. ${Number(member.amountOwed).toFixed(2)}`,
      20,
      y
    );

    doc.setFontSize(10);
    doc.text(
      `Full group bill: Rs. ${Number(totalAmount).toFixed(2)}`,
      20,
      y + 12
    );

    const safeName = member.name.replace(/[^a-z0-9]/gi, "_");

    doc.save(`DineSplit_${safeName}.pdf`);
  };

  return (
    <main className="min-h-screen bg-[#FFFBF2] px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-zinc-900">
          Your split is ready!
        </h1>

        <p className="mt-2 text-zinc-600">
          Download each person's bill summary to share with them.
        </p>

        <div className="mt-6 rounded-2xl border border-[#F3E8D0] bg-white p-5">
          <p className="text-sm text-zinc-500">Total group bill</p>

          <p className="mt-1 text-3xl font-bold text-zinc-900">
            ₹{Number(totalAmount).toFixed(2)}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {members.length} members · {splitType} split
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {members.map((member) => (
            <div
              key={member._id || member.name}
              className="rounded-2xl border border-[#F3E8D0] bg-white p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-zinc-900">
                    {member.name}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {member.items?.length ?? 0} listed items
                  </p>

                  <p className="mt-2 text-xl font-bold text-amber-600">
                    ₹{Number(member.amountOwed).toFixed(2)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => downloadMemberPDF(member)}
                  className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-600"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}