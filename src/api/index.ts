const api = (data: object) => {
  fetch("https://webhook.site/caf6960b-d60e-441c-a0c9-7bb51981d4d0", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
}

export default api;