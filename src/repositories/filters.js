const filters =  {
    filters: {
        removeDash: (value) => {
            if (!value) return ''
            let replaceDash =  value.replace('-',' ')
            return replaceDash.replace('_',' ')

        },
        toRealDate: (value) => {
            if (!value) return ''
            if(isNaN(value._seconds) == false){
                return new Date(value._seconds * 1000)
            }else{
                return value.toDate();
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