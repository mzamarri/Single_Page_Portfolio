console.log("Hello World!");

//write a integration function
function integration(a, b, n) {
    let h = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += h * f(a + i * h);
    }
    return sum;
    }

