const scanURL = process.env.NEXT_PUBLIC_ML_API_URL;

export const scanBrondolan = async (image: any) => {
  try {
    const res = await fetch(`${scanURL}/predict-brondolan`, {
      method: "POST",
      body: image,
    });

    return res;
  } catch (error) {
    throw new Error("Failed to scan brondolan");
  }
};

export const scanBongkahan = async (image: any) => {
  try {
    const res = await fetch(`${scanURL}/predict-bongkahan`, {
      method: "POST",
      body: image,
    });

    return res;
  } catch (error) {
    throw new Error("Failed to scan bongkahan");
  }
};
