"use server";
export const recapchaVerification = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPCHA_SERVER_KEY!,
        response: token,
      }),
    });

    const data = await res.json(); // Await the response JSON

    if (!data.success) {
      throw new Error(`reCAPTCHA verification failed: ${data["error-codes"]}`);
    }

    return data;
  } catch (error) {
    return Error(error);
  }
};
