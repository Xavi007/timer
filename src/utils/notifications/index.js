import timer_up_icon from "./timer_icon.png";
import timer_up_image from "./image.jpeg";

export const timeUpNotification = () =>
  new Notification("Times Up!", {
    body: "You already know man.",
    icon: new URL("/notifications/timer_icon.png", window.location.hostname),
    image: new URL("/notifications/image.jpeg", window.location.hostname),
  });
