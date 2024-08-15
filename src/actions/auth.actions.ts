const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse | ErrorResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  console.log("response", response);
  if (!response.ok) {
    const error = await response.json();
    if (error.errorCode === 3001) {
      throw error;
    }
    if (error.errorCode && error.errorCode !== 3001) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }

  return response.json();
};
