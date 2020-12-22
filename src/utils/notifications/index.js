export const timeUpNotification = () => {
  let baseUrl = window.location.protocol;
  baseUrl += "//";
  baseUrl += window.location.hostname;

  console.log("BASE URL", baseUrl);

  return new Notification("Times Up!", {
    body: "You already know man.",
    icon: new URL("/notifications/timer_icon.png", baseUrl),
    image: new URL("/notifications/image.jpeg", baseUrl),
  });
};
