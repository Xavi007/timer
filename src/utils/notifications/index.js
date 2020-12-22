export const timeUpNotification = () => {
  const baseUrl = window.location.hostname;

  console.log("BASE URL", baseUrl);

  return new Notification("Times Up!", {
    body: "You already know man.",
    icon: new URL("/notifications/timer_icon.png", window.location.hostname),
    image: new URL("/notifications/image.jpeg", window.location.hostname),
  });
};
