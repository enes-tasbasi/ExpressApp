// switch the format of the string from `some text` to `some-text` or the other way around
let changeFormat = (str) => {
    if (str.indexOf('-') < 0) {
        str = str.replace(/[ ]/g, '-');
    } else {
        str = str.replace(/[-]/g, ' ');
    }

    return str;
};

// pick an element from the array
let pickElement = (array, key, value) => {
    return new Promise((resolve, reject) => {
            for (let i = 0; i < array.length; i++) {

                if (array[i][key] === value) {
                    resolve(array[i]);
                }
            }

            reject();
        }
    );

};

let pickMultiple = (array, key, value) => {
    let articles = [];
    return new Promise((resolve, reject) => {
            for (let i = 0; i < array.length; i++) {

                if (array[i][key] === value) {
                    articles = articles.concat(array[i]);
                }
            }

            if (articles.length > 0) {
                resolve(articles);
            } else {
                reject();
            }
        }
    );
};


module.exports = {changeFormat, pickElement, pickMultiple};