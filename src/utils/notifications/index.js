export const timeUpNotification = () => {
  let baseUrl = window.location.protocol;
  baseUrl += "//";
  baseUrl += window.location.hostname;

  const iconUrl = new URL("/notifications/timer_icon.png", baseUrl);
  const imageUrl = new URL("/notifications/image.jpeg", baseUrl);

  console.log("BASE URL", baseUrl);
  console.log("ICON URL", iconUrl.href);
  console.log("IMAGE URL", imageUrl.href);

  return new Notification("Times Up!", {
    body: "You already know man.",
    icon: iconUrl.href,
    image: imageUrl.href,
  });
};
