import axios from "axios"

class ContactUsService {
    static async SendContactUs(data: {name:string , email:string , message:string, user_id: string}){
        const res = await axios.post("https://skillsensebe-production.up.railway.app/api/v1/contact_us",data)
        return res.data;
    }
}

export default ContactUsService