import timer_up_icon from "./timer_icon.png";
import timer_up_image from "./image.jpeg";

export const timeUpNotification = () =>
  new Notification("Times Up!", {
    body: "You already know man.",
    icon: timer_up_icon,
    image: timer_up_image,
  });
