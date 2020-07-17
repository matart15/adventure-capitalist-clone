import { notification } from "antd";

export const Notification = ({
  message,
  description,
  type,
}: {
  type: "success" | "error";
  message: string;
  description: string;
}) => {
  notification.open({
    type,
    message,
    description,
  });
};
