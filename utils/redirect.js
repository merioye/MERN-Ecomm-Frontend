import qs from "qs";

const redirect = (router, queryOptions, key, value1, value2) => {
    if (value2) {
        if (value1 === false) {
            let arr = queryOptions[key];
            if (Array.isArray(arr)) {
                let newArr = arr.filter((val) => {
                    return val !== value2;
                });

                // if(!newArr.length){
                //     delete queryOptions[key];
                // }
                // else{
                //     queryOptions[key] = newArr;
                // }
                queryOptions[key] = newArr;
            } else {
                delete queryOptions[key];
            }
        } else {
            if (queryOptions.hasOwnProperty(key)) {
                if (Array.isArray(queryOptions[key])) {
                    queryOptions[key] = [...queryOptions[key], value2];
                } else {
                    queryOptions[key] = [queryOptions[key], value2];
                }
            } else {
                queryOptions[key] = [value2];
            }
        }
    } else {
        if (key === "price") {
            if (value1 === [0, 10000]) {
                if (queryOptions.hasOwnProperty("price")) {
                    delete queryOptions["price"];
                }
            } else {
                queryOptions["price"] = value1.join("-");
            }
        } else {
            if (value1 === false) {
                delete queryOptions[key];
            } else {
                queryOptions[key] = value1;
            }
        }
    }

    const queryString = qs.stringify(queryOptions, { arrayFormat: "repeat" });

    if (Object.keys(queryString).length > 0) {
        router.push(`/search?${queryString}`);
    } else {
        router.push("/");
    }
};

export default redirect;
