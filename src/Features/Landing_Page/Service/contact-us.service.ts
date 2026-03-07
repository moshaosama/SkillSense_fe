import axios from "axios"

class ContactUsService {
    static async SendContactUs(data: {name:string , email:string , message:string, user_id: string}){
        const res = await axios.post("https://skillsensebeproduction.up.railway.app/api/v1/contact_us",data)
        return res.data;
    }
}

export default ContactUsService