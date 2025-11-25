import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import StatusBadge from "../components/StatusBadge";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import EditElementSheet from "../components/EditElementSheet";
import Empty from "../components/Empty";
import { formatDate } from "../functions";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleDelete() {
    setDeleteLoading(true);
    fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        toast.success(res);
        back();
      })
      .catch(() => {
        setError("Xatolik");
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  function setPaid() {
    setLoading(true);
    fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "paid",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setInvoice(res);
      })
      .catch(() => {
        setError("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function back() {
    navigate(-1);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setInvoice(res);
        console.log(res);
        
      })
      .catch(() => {
        setError("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error)
    return (
      <div className="pt-5 pl-5">
        <Button className="mb-5" onClick={back} variant={"secondary"}>
          <ArrowLeft />
          Back
        </Button>
        <Empty />
      </div>
    );
  
  if (loading)
    return (
      <h1 className="text-center text-4xl py-30 font-bold opacity-70">
        Loading...
      </h1>
    );

  return (
    invoice && (
      <div className="py-10">
        <div className="container mx-auto px-10">
          <Button className="mb-5" onClick={back} variant={"secondary"}>
            <ArrowLeft />
            Back
          </Button>
          <div className="rounded-md shadow px-10 py-3 flex justify-between ">
            <span className="inline-flex items-center gap-5">
              Status <StatusBadge status={invoice.status} />
            </span>
            <div className="flex gap-5">
              <EditElementSheet invoice={invoice} setInvoice={setInvoice} />
              <Button
                disabled={deleteLoading}
                onClick={handleDelete}
                variant={"destructive"}
              >
                {deleteLoading && <RefreshCcw className="animate-spin mr-4" />}{" "}
                Delete
              </Button>
              {invoice.status === "pending" && (
                <Button onClick={setPaid} variant={"outline"}>
                  Mark as Paid
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM PARENT */}
        <div className="mx-10 mt-6 shadow rounded-md">
          
          <div className="flex justify-between px-10 pt-12">
            <span>
              <div className="flex items-end">
                <span className="text-[#888EB0] text-[18px]">#</span>
                <h2 className="text-[#0C0E16] text-[18px] font-bold">{invoice.id}</h2>
              </div>
              <p className="text-[#888EB0]">{invoice.description ? invoice.description : "---"}</p>
            </span>
            <span className="text-[#888EB0] flex flex-col items-end">
              <p>{invoice.senderAddress.street ? invoice.senderAddress.street : "Sender's Street Adress"}</p>
              <p>{invoice.senderAddress.city ? invoice.senderAddress.city : "Sender's city"}</p>
              <p>{invoice.senderAddress.postCode ? invoice.senderAddress.postCode : "Sender's Post Code"}</p>
              <p>{invoice.senderAddress.country ? invoice.senderAddress.country : "Sender's country"}</p>
            </span>
          </div>


          <div className="flex justify-between px-10 mt-12 max-sm:">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[#7E88C3] mb-3">Invoice Date</p>
                <time className="text-[#0C0E16] text-[18px] font-bold" dateTime={invoice.paymentDue}>
                  {invoice.paymentDue ? `${formatDate(invoice.paymentDue)}` : "---"}
               </time>
              </div>
              <div>
                <p className="text-[#7E88C3] mb-3">Payment Due</p>
                <time className="text-[#0C0E16] text-[18px] font-bold" dateTime={invoice.paymentDue}>
                  {invoice.paymentDue ? `${formatDate(invoice.paymentDue)}` : "---"}
                </time>
              </div>
            </div>
            <div>
              <p className="text-[#7E88C3]">Bill To</p>
                <h1 className="text-[#0C0E16] text-[18px] font-bold mt-3">{invoice.clientName ? invoice.clientName : "---"}</h1>
                <div className="text-[#7E88C3]">
                  <p>{invoice.clientAddress.street ? invoice.senderAddress.postCode : "---"}</p>
                  <p>{invoice.clientAddress.city ? invoice.senderAddress.city : "---"}</p>
                  <p>{invoice.clientAddress.postCode ? invoice.senderAddress.postCode : "---"}</p>
                  <p>{invoice.clientAddress.country ? invoice.senderAddress.country : "---"}</p>
                </div>
            </div>
            <div>
              <p className="text-[#7E88C3]">Sent To</p>
              <h1 className="text-[#0C0E16] text-[18px] font-bold mt-3">{invoice.clientEmail ? invoice.clientEmail : "---"}</h1>
            </div>
          </div>


          {/* TOTAL */}
          <div className="mx-10 mt-12 bg-[#F9FAFE] rounded-md">
            <div className="flex justify-between px-10 pt-10 text-[#7E88C3]">
              <p>Item Name</p>
              <p>QTY.</p>
              <p>Price</p>
              <p>Total</p>
            </div>

            <div className="flex justify-between px-10 mt-8">
                <h1 className="text-[#0C0E16] text-[14px] font-bold">{invoice.items[0]?.name}</h1>
                <p>{invoice.items[0]?.quantity}</p>
                <p>{invoice.items[0]?.price}</p>
                <p>{invoice.items[0]?.total}</p>
            </div>
            <div className="flex justify-between px-10 my-4">
              <h1 className="text-[#0C0E16] text-[14px] font-bold">{invoice.items[1]?.name}</h1>
              <p>{invoice.items[1]?.quantity}</p>
              <p>{invoice.items[1]?.price}</p>
              <p>{invoice.items[1]?.total}</p>
            </div>
            <div className="flex justify-between px-10">
              <h1 className="text-[#0C0E16] text-[14px] font-bold">{invoice.items[2]?.name}</h1>
              <p>{invoice.items[2]?.quantity}</p>
              <p>{invoice.items[2]?.price}</p>
              <p>{invoice.items[2]?.total}</p>
            </div>

            <div className="flex justify-between bg-[#373B53] px-10 text-white rounded-b-md p-10">
              <p className="font-medium">Amount Due</p>
              <p className="text-[24px] font-bold">£{invoice.total} </p>
            </div>

            
          </div>
          

        </div>


      </div>

     
    )
  );
}



