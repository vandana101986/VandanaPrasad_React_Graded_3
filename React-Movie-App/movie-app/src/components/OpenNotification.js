import { notification } from "antd";

const OpenNotification = (messages, types) => {
    notification.open({
        message: types,
        type: types,
        duration: 3,
        description: messages
    });
};

export default OpenNotification;