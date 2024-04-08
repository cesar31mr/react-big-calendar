import axios from "axios";
import { DateEntity } from "../models/date_model";
import { urlDeleteDate, urlGetDatesByUser, urlUpdateDate } from "../utils/endpoints";

export async function getDatesByUser(user: string): Promise<DateEntity[]> {
    var result: DateEntity[] = [];
    try {
        var res = await axios.post(urlGetDatesByUser, { user: user })
        if (res.status === 200) {
            var tmp = res.data;
            result = tmp["dates"];
        }
    } catch (error) {
        throw error;
    }
    return result;
}

export async function deleteDate(id: string): Promise<boolean> {
    var result = false;
    try {
        if (!id) {
            throw new Error("Id no puede ser nulo");
        }
        
        var tmp = await axios.delete(urlDeleteDate, { data: { id: id } });
        if (tmp.status === 200) {
            result = true;
        }
    } catch (error) {
        throw error;
    }
    return result;
}