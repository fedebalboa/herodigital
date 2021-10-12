const subscriptions = [];

export default (formData) => {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            if (subscriptions.indexOf(formData.email) !== -1) {
                return reject({
                    "status": "error",
                    "message": "Invalid Subscription request."
                })
            }

            subscriptions.push(formData.email)

            resovle({
                "status": "success",
                "message": "Thank you. You are now subscribed."
            })
        }, 300);
    });
}