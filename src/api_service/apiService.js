import { userRequest } from "./userRequest";

class ApiService{
    getAllNotes = () =>{
        try {
            const res = userRequest.get("notes");
            return res;
        } catch (error) {
            return error;
        }
    }

    getSingleNote = (id) => {
        try {
            const res = userRequest.get(`notes/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    createNote = (data)=> {
        try {
            const res = userRequest.post("notes", data);
            return res;
        } catch (error) {
            return error;
        }
    }

    updateNote = (id, data) => {
        try {
            const res = userRequest.put(`notes/${id}`, data);
            return res;
        } catch (error) {
            return error;
        }
        
    }

    deleteNote = (id) => {
        try {
            const res = userRequest.delete(`notes/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

}

export default ApiService;