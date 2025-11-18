import { formatDate } from "../functions";
import StatusBadge from "./StatusBadge";

export default function InvoiceCard({
  elId,
  paymentDue,
  clientName,
  total,
  status,
}) {
  return (
    <div className="py-4 px-8 rounded-xl shadow-md flex justify-between">
      <span className="font-bold text-[12px]">
        <span className="text-[#7E88C3]">#</span>
        {elId}
      </span>
      <time className="text-[#7E88C3]" dateTime={paymentDue}>
        Due {formatDate(paymentDue)}
      </time>
      <h3 className="text-[#858BB2]">{clientName}</h3>
      <span className="text-[16px] font-bold">{total}</span>
      <StatusBadge status={status} />
    </div>
  );
}
