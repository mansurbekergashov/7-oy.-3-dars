import InvoiceCard from "./InvoiceCard";
import SkeletonLoading from "./SkeletonLoading";

export default function Invoices({ invoices, loading, error }) {
  
  
  if (loading) {
    return (
      <div className="flex flex-col container mx-auto px-10 mt-6 gap-4">
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    );
  }

  if (error) {
    return (
      <h1 className="text-center text-4xl py-20 font-bold opacity-70">
        Xatolik yuz berdi
      </h1>
    );
  }

  return (
    <div className="flex flex-col gap-4 container mx-auto px-10">
      {invoices.map((inv) => {
        return (
          <InvoiceCard
            clientName={inv.clientName}
            paymentDue={inv.paymentDue}
            elId={inv.elId}
            status={inv.status}
            total={inv.total}
            key={inv.id}
          />
        );
      })}
    </div>
  );
}
