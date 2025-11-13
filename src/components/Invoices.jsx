import InvoiceCard from "./InvoiceCard";

export default function Invoices({invoices, loading, error}) {
  
  if (loading) {
  }

  if (error) {
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
