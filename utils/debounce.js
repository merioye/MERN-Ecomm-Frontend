const debounce = (func, timeout=300)=>{
    let timer;
    const debounced = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            console.log('args', args);
            func.apply(this, args);
        }, timeout);
    };
    return debounced;
}

export default debounce;