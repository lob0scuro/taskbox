export const convertTime = (time) => {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${ampm}`;
};

export const trimDate = (date) => {
  const trimmedDate = date.replace(" 00:00:00 GMT", "");
  return trimmedDate;
};

export const currentDay = () => {
  const date = new Date();

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();

  const getOrdinal = (n) => {
    if (n >= 11 && n <= 13) return n + "th";
    switch (n % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
      default:
        return n + "th";
    }
  };

  return `${dayOfWeek}, ${month} ${getOrdinal(day)}`;
};

export const renderUserOptions = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return <option value="">Users not found</option>;
  }
  return arr.map(({ id, full_name }) => (
    <option value={id} key={id}>
      {full_name}
    </option>
  ));
};

export const fetchAllUsers = async () => {
  try {
    const response = await fetch("/read/fetch_all_users");
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.error };
    }
    return { success: true, users: data.users };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const fetchOneUser = async (id) => {
  try {
    const response = await fetch(`/read/fetch_one_user/${id}`);
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error };
    }
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const completeTask = async (id) => {
  try {
    const response = await fetch(`/update/complete_task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error };
    }
    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const redoTask = async (id) => {
  try {
    const response = await fetch(`/update/redo_task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error };
    }
    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
