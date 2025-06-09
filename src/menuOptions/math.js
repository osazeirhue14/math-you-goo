import { derivative, simplify } from 'mathjs';

export const computeDerivatives = (func) => {
    try {
        const firstDerivative = simplify(derivative(func.jsFunction, 'x')).toString();
        const secondDerivative = simplify(derivative(firstDerivative, 'x')).toString();
        return { firstDerivative, secondDerivative };
    } catch (error) {
        console.error('Error computing derivatives:', error);
        return { firstDerivative: 'Error', secondDerivative: 'Error' };
    }
};

