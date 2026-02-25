import { MessageData } from "@/types/message";
import api from "@/lib/api";

export class MessageService {
  public status: "idle" | "loading" | "succeeded" | "failed" = "idle";
  public error: string | null = null;

  async sendMessage(data: MessageData) {
    this.status = "loading";
    this.error = null;

    try {
      const response = await api.post("/contact/sendMessage", data);
      this.status = "succeeded";
      return response.data;
    } catch (err: any) {
      this.status = "failed";
      this.error = err.response?.data?.message || err.message || "Xəta baş verdi";
      throw err;
    }
  }
}
export type Status = "idle" | "loading" | "succeeded" | "failed";

