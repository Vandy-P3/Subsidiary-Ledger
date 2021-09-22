const formatDate = (date) => {
    const options = {year: 'numeric', month: 'short'}

    const newDate = new Date(date);
    

    return newDate.toLocaleDateString("en-US", options)

    
}

export default formatDate