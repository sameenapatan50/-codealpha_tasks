let currentExpression = '';

function appendToDisplay(value) {
    currentExpression += value;
    document.getElementById('result').value = currentExpression;
    document.getElementById('expression').textContent = currentExpression;
}

function clearDisplay() {
    currentExpression = '';
    document.getElementById('result').value = '';
    document.getElementById('expression').textContent = '';
}

function deleteLast() {
    currentExpression = currentExpression.slice(0, -1);
    document.getElementById('result').value = currentExpression;
}

function calculate() {
    try {
        document.getElementById('expression').textContent = currentExpression + ' =';
        let result = eval(currentExpression);
        if (result === undefined) throw new Error();
        currentExpression = String(result);
        document.getElementById('result').value = result;
    } catch (error) {
        document.getElementById('result').value = 'Error';
        currentExpression = '';
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') appendToDisplay(key);
    else if (key === '+') appendToDisplay('+');
    else if (key === '-') appendToDisplay('-');
    else if (key === '*') appendToDisplay('*');
    else if (key === '/') { event.preventDefault(); appendToDisplay('/'); }
    else if (key === '%') appendToDisplay('%');
    else if (key === '.') appendToDisplay('.');
    else if (key === 'Enter') calculate();
    else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape') clearDisplay();
});