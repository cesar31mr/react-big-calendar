import axios from "axios";
import { DateEntity } from "../models/date_model";
import { urlDeleteDate, urlGetDatesByUser, urlSaveDate, urlUpdateDate } from "../utils/endpoints";

export async function createDate(date: DateEntity): Promise<boolean> {
    var result = false;
    try {
        if (!date) {
            throw new Error("No se recibió información para crear");
        }
        
        var tmp = await axios.post(urlSaveDate, date);
        if (tmp.status === 200) {
            result = true;
        } else {
            throw new Error("Error al crear evento" + JSON.stringify(tmp));
        }
    } catch (error) {
        throw error;
    }
    return result;
}

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

export async function updateDate(date: DateEntity): Promise<boolean> {
    var result = false;
    try {
        if (!date) {
            throw new Error("No se recibió información para actualizar");
        }
        
        var tmp = await axios.put(urlUpdateDate, date);
        if (tmp.status === 200) {
            result = true;
        } else {
            throw new Error("Error al actualizar evento" + JSON.stringify(tmp));
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