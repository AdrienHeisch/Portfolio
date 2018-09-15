import * as styles from './ConfettiCanvas.css';

import * as React from 'react';

interface IConfettiCanvasProps {
    width:number;
    height:number;
    x?:number;
    y?:number;
    nParticles?:number;
    nCanons?:number;
    startingAngle?:number;
    delay?:number;
}

export class ConfettiCanvas extends React.Component<IConfettiCanvasProps> {

    public static defaultProps:Partial<IConfettiCanvasProps> = {
        x: 0,
        y: 0,
        nParticles: 1000,
        nCanons: 2,
        startingAngle: -Math.PI / 3,
        delay: 0
    };

    private confettis:Array<Confetti> = [];

    public componentDidMount ():void {
        setTimeout(() => {
            const lNCanons = (() => this.props.nCanons > 2 ? this.props.nCanons : 2)();
            const lXPositions = Utils.range(0, this.props.width, lNCanons);
            const lRotations = Utils.range(this.props.startingAngle, -Math.acos(-Math.cos(this.props.startingAngle)), lNCanons);
            for (let i = 0; i < lNCanons; i++) {
                const lCanon = new ConfettiCanon();
                lCanon.x = lXPositions[i];
                lCanon.y = this.props.height;
                lCanon.rotation = lRotations[i];
                lCanon.shoot(this.props.nParticles / lNCanons, this.confettis);
            }

            this.onEnterFrame();
        }, this.props.delay * 1000);
    }

    private onEnterFrame ():void {
        const lCtx = (this.refs.canvas as HTMLCanvasElement).getContext('2d');
        lCtx.clearRect(0, 0, this.props.width, this.props.height);
        for (const lConfetti of this.confettis) {
            lConfetti.update();
            lConfetti.draw(lCtx);
        }

        requestAnimationFrame(this.onEnterFrame.bind(this));
    }

    public render ():JSX.Element {
        return (
            <canvas
                ref='canvas'
                className={styles.canvas}
                style={{
                    left: this.props.x,
                    top: this.props.y
                }}
                width={this.props.width}
                height={this.props.height}
            />
        );
    }

}

class Entity {

    public x:number = 0;
    public y:number = 0;
    public rotation:number = 0;

}

class Confetti extends Entity {

    private static SIZE:number = 5;
    private static GRAVITY:number = 0.001;

    public velocity:Point = new Point();
    public acceleration:Point = new Point();

    private color:string = Utils.getRandomColor();

    constructor () {
        super();
        this.rotation = Math.random() * Math.PI / 2;
    }

    public draw (pCtx:CanvasRenderingContext2D) {
        pCtx.fillStyle = this.color;
        pCtx.fillRect(this.x - Confetti.SIZE / 2, this.y - Confetti.SIZE / 2, Confetti.SIZE, Confetti.SIZE);
    }

    public update ():void {
        this.acceleration.y += Confetti.GRAVITY;

        this.velocity.add(this.acceleration);

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    
}

class ConfettiCanon extends Entity {

    private static rotationError:number = Math.PI / 12;

    public shoot (pNConfetti:number = 1, pList?:Array<Confetti>):void {
        for (let i = 0; i < pNConfetti; i++) {
            const lConfetti = new Confetti();
            lConfetti.x = this.x;
            lConfetti.y = this.y;
            lConfetti.velocity = Point.fromPolarCoordinates(Utils.randomRange(0, 10), Utils.randomRange(this.rotation - ConfettiCanon.rotationError, this.rotation + ConfettiCanon.rotationError));
            if (pList) pList.push(lConfetti);
        }
    }
    
}

class Point {

    public static fromPolarCoordinates (pRadius:number, pAngle:number):Point {
        return new Point(pRadius * Math.cos(pAngle), pRadius * Math.sin(pAngle));
    }

    public x:number;
    public y:number;

    constructor (pX:number = 0, pY:number = 0) {
        this.setTo(pX, pY);
    }

    public setTo (pX:number, pY:number) {
        this.x = pX;
        this.y = pY;
    }

    public add (pPoint:Point):void {
        this.x += pPoint.x;
        this.y += pPoint.y;
    }

    public get angle ():number {
        return Math.atan2(this.y, this.x)
    }

    public get length ():number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

}

const Utils = {
    randomRange (pMin:number, pMax:number):number {
        return Math.random() * (pMax - pMin) + pMin;
    },
    lerp (pMin:number, pMax:number, pCoef:number):number {
        return pMin * (1 - pCoef) + pMax * pCoef;
    },
    range (pMin:number, pMax:number, pNValues:number):Array<number> {
        const lArray:Array<number> = [];
        for (let i = 0; i < pNValues; i++) lArray.push(pMax - (pMax - pMin) * i / (pNValues - 1));
        return lArray;
    },
    getRandomColor ():string {
        const letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) color += letters[Math.round(Math.random() * 15)];
        return color;
    },
    applyDefault (pObject:any, pToApply:any) {
        for (let lKey of Object.keys(pToApply)) {
            if (pObject[lKey] == undefined || pObject[lKey] == null) pObject[lKey] = pToApply[lKey];
        }
    }
};