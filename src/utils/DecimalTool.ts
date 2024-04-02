import Decimal from "decimal.js";
import {DECIMAL_NUMBER} from "./regExp";

export type IDecimalParams = Decimal.Value | DecimalTool;
/*class DecimalTool {
    private value: Decimal | undefined;
    constructor(value?: Decimal.Value) {
        if (value) {
            this.value = new Decimal(value);
        }
    }
    validInput(amount: Decimal.Value) {
        if (typeof amount === "undefined") {
            return false;
        }
        return new RegExp(DECIMAL_NUMBER, "g").test(amount.toString())
    }

    validParams(x: Decimal.Value, y?: Decimal.Value) {
        if (!this.validInput(x)) {
            return false;
        }
        if (typeof y !== "undefined" && !this.validInput(y)) {
            return false;
        }
        return true;
    }

    transParams(x1: IDecimalParams, y1?: IDecimalParams) {
        let x = x1 instanceof DecimalTool ? x1.toFixed() : x1;
        let y = y1 instanceof DecimalTool ? y1.toFixed() : y1;
        return {x, y};
    }

    mul(x1: IDecimalParams, y1?: IDecimalParams) {
        const {x, y} = this.transParams(x1, y1);
        if (!this.validParams(x, y)) {
            this.value = new Decimal("0");
            return this;
        }
        if (typeof y === "undefined") {
            this.value = this.value?.mul(x);
        } else {
            this.value = Decimal.mul(x, y);
        }
        return this;
    }

    div(x1: IDecimalParams, y1?: IDecimalParams) {
        const {x, y} = this.transParams(x1, y1);
        if (!this.validParams(x, y)) {
            this.value = new Decimal("0");
            return this;
        }
        if (typeof y === "undefined") {
            let tans_x = x.toString();
            if (x.toString() === "0") {
                tans_x = "1";
            }
            this.value = this.value?.div(tans_x);
        } else {
            let tans_y = y.toString();
            if (y.toString() === "0") {
                tans_y = "1";
            }
            this.value = Decimal.div(x, tans_y);
        }
        return this;
    }

    sub(x1: IDecimalParams, y1?: IDecimalParams) {
        const {x, y} = this.transParams(x1, y1);
        if (!this.validParams(x, y)) {
            this.value = new Decimal("0");
            return this;
        }
        if (typeof y === "undefined") {
            this.value = this.value?.sub(x);
        } else {
            this.value = Decimal.sub(x, y);
        }
        return this;
    }

    add(x1: IDecimalParams, y1?: IDecimalParams) {
        const {x, y} = this.transParams(x1, y1);
        if (!this.validParams(x, y)) {
            this.value = new Decimal("0");
            return this;
        }
        if (typeof y === "undefined") {
            this.value = this.value?.add(x);
        } else {
            this.value = Decimal.add(x, y);
        }
        return this;
    }

    toFixed(decimalPlaces?: number, rounding?: Decimal.Rounding) {
        if (!this.value) {
            return "";
        }
        if (typeof decimalPlaces === "undefined") {
            return this.value.toFixed();
        } else if(typeof rounding !== "undefined") {
            return this.value.toFixed(decimalPlaces, rounding);
        } else {
            return this.value.toFixed(decimalPlaces);
        }
    }

    toFixedZero(decimalPlaces: number, rounding?: Decimal.Rounding) {
        return Number(this.toFixed(decimalPlaces, rounding)).toString();
    }
}*/

class DecimalTool {
    private value: Decimal | undefined;
    constructor(value?: Decimal.Value) {
        if (value) {
            this.value = new Decimal(value);
        }
    }
    validInput(amount: Decimal.Value) {
        if (typeof amount === "undefined") {
            return false;
        }
        return new RegExp(DECIMAL_NUMBER, "g").test(amount.toString())
    }

    validParams(x: Decimal.Value, y?: Decimal.Value) {
        if (!this.validInput(x)) {
            return false;
        }
        if (typeof y !== "undefined" && !this.validInput(y)) {
            return false;
        }
        return true;
    }

    transParams(x1: IDecimalParams, y1?: IDecimalParams) {
        const x = x1 instanceof DecimalTool ? x1.toFixed() : x1;
        const y = y1 instanceof DecimalTool ? y1.toFixed() : y1;
        return {x, y};
    }

    mul(x1: IDecimalParams, y1?: IDecimalParams) {
        const {x, y} = this.transParams(x1, y1);
        if (!this.validParams(x, y)) {
            this.value = new Decimal("0");
            return this;
        }
        if (typeof y === "undefined") {
            this.value = this.value?.mul(x);
        } else {
            this.value = Decimal.mul(x, y);
        }
        return new DecimalTool(this.value);
    }

    div(x1: IDecimalParams, y1?: IDecimalParams) {
        const {x, y} = this.transParams(x1, y1);
        if (!this.validParams(x, y)) {
            this.value = new Decimal("0");
            return this;
        }
        if (typeof y === "undefined") {
            let tans_x = x.toString();
            if (x.toString() === "0") {
                tans_x = "1";
            }
            this.value = this.value?.div(tans_x);
        } else {
            let tans_y = y.toString();
            if (y.toString() === "0") {
                tans_y = "1";
            }
            this.value = Decimal.div(x, tans_y);
        }
        return new DecimalTool(this.value);
    }

    sub(x1: IDecimalParams, y1?: IDecimalParams) {
        const {x, y} = this.transParams(x1, y1);
        if (!this.validParams(x, y)) {
            this.value = new Decimal("0");
            return this;
        }
        if (typeof y === "undefined") {
            this.value = this.value?.sub(x);
        } else {
            this.value = Decimal.sub(x, y);
        }
        return new DecimalTool(this.value);
    }

    add(x1: IDecimalParams, y1?: IDecimalParams) {
        const {x, y} = this.transParams(x1, y1);
        if (!this.validParams(x, y)) {
            this.value = new Decimal("0");
            return this;
        }
        if (typeof y === "undefined") {
            this.value = this.value?.add(x);
        } else {
            this.value = Decimal.add(x, y);
        }
        return new DecimalTool(this.value);
    }

    toFixed(decimalPlaces?: number, rounding?: Decimal.Rounding) {
        if (!this.value) {
            return "";
        }
        if (typeof decimalPlaces === "undefined") {
            return this.value.toFixed();
        } else if(typeof rounding !== "undefined") {
            return this.value.toFixed(decimalPlaces, rounding);
        } else {
            return this.value.toFixed(decimalPlaces);
        }
    }

    toFixedZero(decimalPlaces: number, rounding?: Decimal.Rounding) {
        return Number(this.toFixed(decimalPlaces, rounding)).toString();
    }
}

export default new DecimalTool();
