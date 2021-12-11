export abstract class Maybe<T>{
    abstract fmap<T2>(f: (val: T) => T2): Maybe<T2>;

    abstract eq(val: T): boolean;
}

export class Nothing<T> extends Maybe<T> {

    private constructor() {
        super();
    }

    public static create<T>(): Nothing<T> {
        return new Nothing();
    }

    public fmap<T, T2>(f: (val: T) => T2): Maybe<T2> {
        return this;
    }

    public eq<T>(val: T): boolean {
        return false;
    }

    public eqMaybe<T>(maybeVal: Maybe<T>): boolean {
        return maybeVal instanceof Nothing;
    }
}

export class Just<T> extends Maybe<T> {
    private value: T;

    private constructor(value: T) {
        super();
        this.value = value;
    }

    public static create<T>(value: T): Just<T> {
        return new Just(value);
    }

    public fmap<T2>(f: (val: T) => T2): Maybe<T2> {
        return Just.create(f(this.value));
    }

    public eq(val: T): boolean {
        return this.value === val;
    }

    
    public eqMaybe<T>(maybeVal: Maybe<T>): boolean {
        return maybeVal instanceof Just && maybeVal.eq(this.value);
    }
}