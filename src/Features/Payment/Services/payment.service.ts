import axios from "axios";

const BASE_URL = "https://skillsensebeproduction.up.railway.app/api/v1/payment";

export interface BillingData {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

class PaymentService {
    /**
     * Initiates the payment process with Paymob.
     */
    static async initiatePayment(amount: number, type: "card" | "wallet" = "card", billingData?: BillingData) {
        try {
            const response = await axios.post(`${BASE_URL}/initiate`, {
                amount,
                billingData,
                type
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown }; message?: string };
            console.error("Payment Service Error (initiate):", err.response?.data || err.message);
            throw error;
        }
    }

    /**
     * Fetches InstaPay information for manual transfer.
     */
    static async getInstaPayInfo() {
        try {
            const response = await axios.get(`${BASE_URL}/instapay-info`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown }; message?: string };
            console.error("Payment Service Error (instapay):", err.response?.data || err.message);
            throw error;
        }
    }

    static async checkStatus(orderId: number, transactionId?: number, email?: string) {
        try {
            const response = await axios.post(`${BASE_URL}/check-status`, { orderId, transactionId, email });
            return response?.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown }; message?: string };
            console.error("Payment Service Error (check status):", err.response?.data || err.message);
            throw error;
        }
    }

    /**
     * Confirms the InstaPay transfer with the backend.
     */
    static async confirmInstapayPayment(email: string, amount: number) {
        try {
            const response = await axios.post(`${BASE_URL}/instapay-confirm`, {
                email,
                amount
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown }; message?: string };
            console.error("Payment Service Error (confirm instapay):", err.response?.data || err.message);
            throw error;
        }
    }
}

export default PaymentService;
