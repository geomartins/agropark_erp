import { date } from 'quasar'
const filters =  {
    filters: {
        removeDash: (value) => {
            if (!value) return ''
            let replaceDash =  value.replace('-',' ')
            return replaceDash.replace('_',' ')

        },
        calculateDateDifference:  (date1, date2, unit) => {
            if(isNaN(date1._seconds) == false){
                  date1 =  new Date(date1._seconds * 1000);
            }else{
                 date1 = date1.toDate();
            }
            return date.getDateDiff(date1, date2, unit)
          
        },
          
        toRealDate: (value) => {
            if (!value) return ''
            if(isNaN(value._seconds) == false){
                return date.formatDate(new Date(value._seconds * 1000), 'YYYY-MM-DD HH:mm:ss.SSSZ')
            }else{
                console.log(value.toDate(), 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
                let k =  value.toDate();
                return date.formatDate(k, 'YYYY-MM-DD HH:mm:ss.SSSZ')
            }
        },
        capitalizer:  (value)  => {
            
            if (!value) return ''
            return value.toLowerCase().replace(/(?<= )[^\s]|^./g, a => a.toUpperCase());

        },
        capitalize:  (value)  => {

            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
          },
      
          filterAuthor: (value) => {
              if(typeof value == 'string'){
                  return value;
              }
      
              let firstname = value.firstname;
              let middlename = value.middlename;
              let lastname = value.lastname;
      
              return firstname+' '+middlename+' '+lastname;
              
          },

          filterModule: (value) => {
            if(typeof value == 'string'){
                return value;
            }
    
    
            return value.name;
            
        }
    }
}

export default filters