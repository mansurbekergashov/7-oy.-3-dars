import StatusBadge from "../components/StatusBadge";
import Invoices from "../components/Invoices";

export default function Home() {
  return (
    <div>
      <Invoices />
      <StatusBadge status="pending" />
    </div>
  );
}
