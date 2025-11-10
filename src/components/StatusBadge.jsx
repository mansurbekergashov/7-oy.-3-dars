export default function StatusBadge({ status = "draft" }) {
  const styles = {
    draft: {
      bg: "bg-[rgba(55, 59, 83, 5%)]",
      text: "text-[#373B53]",
      dot: "bg-[#373B53]",
    },
    pending: {
      bg: "bg-[rgba(255, 143, 0, 5%)]",
      text: "text-[#FF8F00]",
      dot: "bg-[#FF8F00]",
    },
    paid: {
      bg: "bg-[rgba(51,214,159, 5%)]",
      text: "text-[#33D69F]",
      dot: "bg-[#33D69F]",
    },
  };

  return (
    <span
      className={`inline-flex justify-center items-center gap-2 py-3 px-[18px] rounded-md  ${styles[status].bg} min-w-[104px]`}
    >
      <span
        className={`w-2 h-2 inline-flex ${styles[status].dot} rounded-full`}
      ></span>
      <span
        className={`capitalize ${styles[status].text} font-medium text-[12px]`}
      >
        {status}
      </span>
    </span>
  );
}
