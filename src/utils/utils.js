import siteConfig from "../../siteConfig";

export async function updateFields(blogId, feild, value, session) {
  let fields = {};
  try {
    const currentUser = session?.user?.email;
    if (!currentUser) {
      console.error("User is not logged in");
      return;
    }

    if (!Array.isArray(value)) {
      throw new Error("Invalid likes data");
    }

    fields[feild] = value;

    const response = await fetch(`/api/updateFeilds?id=${blogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: fields }),
    });

    if (!response.ok) {
      throw new Error("Failed to update likes");
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error updating likes:", error.message);
  }
}

export const isValidArray = (_array) => {
  if (_array && _array.length > 0) {
    return true;
  }
  return false;
};

export function customDate(date) {
  const _date = new Date(date);
  // Array of month names
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

  // Extract date components
  const day = _date.getDate();
  const month = months[_date.getMonth()];
  const year = _date.getFullYear().toString().slice(-2); // Get last two digits of the year
  let hours = _date.getHours();
  const minutes = _date.getMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format the date and time
  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;

  return function (...args) {
    const context = this;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export function shareOnWhatsApp(path) {
  const url = process.env.SITE + path; // Replace with your URL
  const text = "Check this out!"; // Customize your message
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    text + " " + url
  )}`;
  window.open(whatsappUrl, "_blank");
}

export function shareOnX(path) {
  const url = process.env.SITE + path; // Replace with your URL
  const text = "Check this out!"; // Customize your text
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;
  window.open(twitterUrl, "_blank", "width=600,height=400");
}

export function shareOnLinkedIn(path) {
  const url = process.env.SITE + path; // Replace with your URL
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;
  window.open(linkedInUrl, "_blank", "width=600,height=400");
}

export function copyLink(path) {
  const url = process.env.SITE + path; // Replace with your URL
  if (!url) {
    console.error("No link provided to copy.");
    return;
  }

  navigator.clipboard
    .writeText(url)
    .then(() => {
      console.log("Link copied to clipboard:", url);
    })
    .catch((err) => {
      console.error("Failed to copy link:", err);
    });
}

export function shareOnFacebook(path) {
  const url = process.env.SITE + path; // Replace with your URL
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  window.open(fbShareUrl, "_blank", "width=600,height=400");
}

export function isCsr() {
  if (window != undefined) {
    return true;
  }
  return false;
}

export function highlightSelection() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.style.backgroundColor = "yellow";
  range.surroundContents(span);
}
