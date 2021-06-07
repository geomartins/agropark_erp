import  { api } from '../boot/axios';
class AlgoliaService{
    constructor(db){
        this.db = db;
    }
    async search(input){
        return api.post('/search', {
            name: this.db,
            input: input,
        }).then((response) => {
            console.log(response,'yeeeeeeeeeee')
            return response.data;
        }).catch(err => {
            return err;
        })
    }

}


export default AlgoliaService;