export default function newFormatDate(date: string) {
  const formattedDate = new Date(date).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return formattedDate.replace("pukul", "");
}
