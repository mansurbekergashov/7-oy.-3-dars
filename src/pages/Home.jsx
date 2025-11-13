import Invoices from "../components/Invoices";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [filterElement, setFilterElement] = useState([
    {
      checked: "false",
      text: "draft",
    },
    {
      checked: "false",
      text: "pending",
    },
    {
      checked: "false",
      text: "paid",
    },
  ]);



  useEffect(() => {
    setLoading(true);
    fetch("https://json-api.uz/api/project/invoice-app-fn43/invoices")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setInvoices(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setError("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header
        total={invoices.length > 0 ? invoices.length : null}
        filterElement={filterElement}
        setFilterElement={setFilterElement}
      />
      <Invoices invoices={invoices} loading={loading} error={error} />
    </div>
  );
}
