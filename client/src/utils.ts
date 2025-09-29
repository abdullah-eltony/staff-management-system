export function formatDate(dateStr: string, locale: string = "en-US") {
  const date = new Date(dateStr);

  return date.toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isAdmin() {
  return localStorage.getItem("user_role") === "admin" || localStorage.getItem("user_role") === "manager";
}


export function isCurrentUser(employee_id: number) {
  return Number(localStorage.getItem("user_id")) === employee_id;
}