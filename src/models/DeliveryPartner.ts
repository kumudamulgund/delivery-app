export class DeliveryPartner {
    private _id:string;
    private _maxSpeed:number;
    private _elapsedTime:number;

    constructor(id:string, maxSpeed:number) {
        this._id = id;
        this._maxSpeed = maxSpeed;
        this._elapsedTime = 0;
    }

    get id():string {
        return this._id;
    }

    arrivalTimeBy(distance:number):number {
        if(distance < 0) {
            throw new Error("distance cannot be a negative number");
        }
        const travelDuration = distance / this._maxSpeed;
        const arrivalTime = (travelDuration + Number.EPSILON) * 100 / 100;
        return parseFloat(arrivalTime.toFixed(2));
    }

    get elapsedTime():number {
        return this._elapsedTime;
    }

    set elapsedTime(elapsedTime:number) {
        this._elapsedTime = elapsedTime; 
    }

}