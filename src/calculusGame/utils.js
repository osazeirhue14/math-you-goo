import { derivative, simplify } from 'mathjs';

// Generate a random polynomial function with positive and negative coefficients
export const generateFunction = () => {
    const coeff = Math.floor(Math.random() * 20) - 10; // Coefficients between -10 and 10 (excluding 0)
    const power = Math.floor(Math.random() * 4) + 1; // Random power between 1 and 4
    return `${coeff === 0 ? 1 : coeff}*x^${power}`; // Avoid 0 coefficient
};

// Compute the first and second derivatives of a function
export const computeDerivatives = (func) => {
    try {
        const firstDerivative = simplify(derivative(func, 'x')).toString(); // First derivative
        const secondDerivative = simplify(derivative(firstDerivative, 'x')).toString(); // Second derivative
        return { firstDerivative, secondDerivative };
    } catch (error) {
        console.error('Error computing derivatives:', error);
        return { firstDerivative: '', secondDerivative: '' };
    }
};


