const filters =  {
    filters: {
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