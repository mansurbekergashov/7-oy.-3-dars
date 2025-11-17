export function formatDate(date) {
  const year = date.split("-")[0];
  const month = Number(date.split("-")[1]);
  const day = date.split("-")[2];

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[month]} ${year}`;
}

export function objFormatter(obj) {
  const result = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (key.includes(".")) {
        const piece = key.split(".");
        const objValue = {
          [piece[1]]: value,
        };

        return [piece[0], objValue];
      } else {
        return [key, value];
      }
    })
  );

  console.log(result);
}
