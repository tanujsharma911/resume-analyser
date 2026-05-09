import { api } from "./axios";

export const generateResumeReport = async (form: FormData) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/resume/generate-report",
      data: form,
    };
    const res = await api.request(config);

    return res;
  } catch (error) {
    console.log(error);
  }
};
