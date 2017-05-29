


// returns date in form of 'dd.mm.yyyy'
const getNiceDate = (dateString) => {
    let date = dateString.split('T');
    let dateArr = date[0].split('-');
    let year = dateArr[0];
    let month = dateArr[1];
    let day = dateArr[2];

    return `${day}.${month}.${year}`;
};

// returns date in form of '12 Aug, 2017'
const getOtherNiceDate = (dateString) => {
    // TODO
};


export {
    getNiceDate
};
