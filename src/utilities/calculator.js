const calculate = (productPrice, data, params, percentage_discount) => {
    // const interest = [4, 3, 2.75];
    const count = repaymentCount(data.repayment_duration_id.value, 14);
    console.log(data, params);
    const marketPrice = Math.floor(productPrice);
    const upFront = Math.floor((data.payment_type_id.value.percent / 100) * marketPrice);
    const residual = Math.floor(marketPrice - upFront);
    const tempInstallment = residual / count;
    const tempInterest = residual * (params.interest / 100);
    const totalPremium = tempInstallment * count + tempInterest * count + upFront;
    const labelPrice = totalPremium * (1 + params.tax / 100);
    let total = labelPrice;
    const initDownpayment = (data.payment_type_id.value.percent / 100) * total;
    const downpayment = upFront + Math.floor((total - initDownpayment) / count) * data.payment_type_id.value.plus;
    const actualDownpayment = Math.floor(downpayment / 100) * 100;
    const tempActualRepayment = +(total - downpayment).toFixed(2);
    var biMonthlyRepayment = Math.round(tempActualRepayment / count / 100) * 100;
    const actualRepayment = biMonthlyRepayment * count;
    const rePayment = percentage_discount > 0 ? actualRepayment - (actualRepayment * percentage_discount) / 100 : actualRepayment;
    total = actualRepayment + actualDownpayment;
    return { total, actualDownpayment, rePayment };
};
const repaymentCount = (days, cycle) => {
    const result = days / cycle;
    if (result >= 24) {
        return 24;
    } else if (result >= 18) {
        return 18;
    } else if (result >= 12) {
        return 12;
    }
    if (result >= 6) {
        return 6;
    }
    return 3;
};

const cashLoan = (productPrice, data, params, percentage_discount) => {
    const count = repaymentCount(data.repayment_duration_id.value, 14);
    const actualDownpayment = (data.payment_type_id.value.percent / 100) * productPrice;
    const residual = productPrice - actualDownpayment;
    const principal = residual / count;
    const interest = (params.interest / 100) * residual;
    const tempActualRepayment = (principal + interest) * count;
    var biMonthlyRepayment = Math.round(tempActualRepayment / count / 100) * 100;
    const actualRepayment = biMonthlyRepayment * count;
    let total = Math.ceil((actualDownpayment + actualRepayment) / 100) * 100;
    var rePayment = percentage_discount > 0 ? actualRepayment - (actualRepayment * percentage_discount) / 100 : actualRepayment;
    total = actualRepayment + actualDownpayment;
    return { total, actualDownpayment, rePayment };
};

export { calculate, cashLoan };
