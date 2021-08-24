import  { api } from '../boot/axios';
import { getData } from '../repositories/plugins'
class AlgoliaService{
    constructor(db){
        this.db = db;
        this.token = getData("token");
    }
    async search(input){
        return api.post('/search', {
            name: this.db,
            input: input,
        }, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }).then((response) => {
            return response.data;
        }).catch(err => {
            return err;
        })
    }

}


export default AlgoliaService;