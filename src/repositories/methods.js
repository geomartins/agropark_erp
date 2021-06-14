import { date } from 'quasar'
const methods =  {
    methods: {
        calculateDateDifference:  (date1, date2, unit) => {
            if(isNaN(date1._seconds) == false){
                  date1 =  new Date(date1._seconds * 1000);
            }else{
                 date1 = date1.toDate();
            }
            return date.getDateDiff(date1, date2, unit)
          
        },
          
       
    }
}

export default methods