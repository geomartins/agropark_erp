const purifyObject = (data) => {
    return Object.assign({}, data);
}

const sortBy = (key, reverse) => {

    // Move smaller items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    
    const moveSmaller = reverse ? 1 : -1;
  
    // Move larger items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    const moveLarger = reverse ? -1 : 1;
   
  
    /**
     * @param  {*} a
     * @param  {*} b
     * @return {Number}
     */
    return (a, b) => {
      
      if (b[key] > a[key]) {
        return moveLarger;
      }
      if (b[key] < a[key]) {
        return moveSmaller;
      }
      return 0;
    };
  };


export {
    purifyObject,
    sortBy
}