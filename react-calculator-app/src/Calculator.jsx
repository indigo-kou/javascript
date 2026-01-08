import { useState } from 'react';

const Calculator = () => {

    const [display, setDisplay] = useState('');
    const [isResult, setIsResult] = useState(false);

    const handleButtonClick = (value) => {
        setDisplay((prev) => {
            if (prev === 'エラー') {
                return value;
            }
            if (isResult && /^\d$/.test(value)) {
                setIsResult(false);
                return value;
            }
        setIsResult(false);
            return prev + value;
        });
    };

    const clearDisplay = () => {
        setDisplay('');
        setIsResult(false);
    };

    const calculate = (expression) => {
        const validExpression = /^(\d+)([+\-*/])(\d+)$/;
        
        const match = expression.match(validExpression);
        if (!match) {
            throw new Error('エラー');
        }
        
        const num1 = Number(match[1]);
        const operator = match[2];
        const num2 = Number(match[3]);
        
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    throw new Error('エラー');
                }
                return num1 / num2;
            
            default:
                throw new Error('エラー');
        }
    };

    const handleEqualClick = () => {
        try {
            const result = calculate(display);
            setDisplay(String(result));
            setIsResult(true);
        } catch (error) {
            setDisplay(error.message);
            setIsResult(false);
        }
    };

    const buttons = [
        7, 8, 9, '/',
        4, 5, 6, '*',
        1, 2, 3, '-',
        0, 'C', '=', '+'
    ];

    return (
        <div className="calculator">
        <h2 >電卓アプリ</h2>
            <input type="text" value={display} readOnly />
            <div className="buttons button-grid">
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (btn === 'C') {
                                clearDisplay();
                            } else if (btn === '=') {
                                handleEqualClick();
                            } else {
                                handleButtonClick(String(btn));
                            }
                        }}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
