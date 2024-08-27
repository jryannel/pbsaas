import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCircleCheck, IconExclamationCircle, IconInfoCircle } from "@tabler/icons-react";

const timeout = 3000;

export function notifyInfo(message: string): string {
  return notifications.show({
    title: 'Info',
    message,
    color: 'blue',
    icon: <IconInfoCircle size={16} />,
  });
}

export function notifyOpen(message: string) {
  console.log("notifyOpen", message);
  notifications.show({
    title: "Open",
    message,
    color: "blue",
    autoClose: timeout,
    withCloseButton: true,
  });
}

export function notifyError(message: string) {
  console.error("notifyError", message);
  notifications.show({
    title: "Error",
    message,
    color: "red",
    autoClose: true,
    icon: <IconAlertCircle size={16} />,
  });
}

export function notifyValid(message: string) {
  console.log("notifyValid", message);
  notifications.show({
    title: "Valid",
    message,
    color: "green",
    autoClose: timeout,
    withCloseButton: true,
    icon: <IconCircleCheck size={16} />,
  });
}

export function notifyInvalid(message: string) {
  console.log("notifyInvalid", message);
  notifications.show({
    title: "Invalid",
    message,
    color: "red",
    autoClose: false,
    withCloseButton: true,
    icon: <IconExclamationCircle size={16} />,
  });
}

export function notifySuccess(message: string) {
  console.log("notifySuccess", message);
  notifications.show({
    title: "Success",
    message,
    color: "green",
    autoClose: timeout,
    withCloseButton: true,
    icon: <IconCircleCheck size={16} />,
  });
}


export function notifyNotSupported(message: string) {
  console.log("notifyNotSupported", message);
  notifications.show({
    title: "Not Supported",
    message,
    color: "red",
    autoClose: false,
    withCloseButton: true,
    icon: <IconExclamationCircle size={16} />,
  });
}
