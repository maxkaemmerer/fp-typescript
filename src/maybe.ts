export abstract class Maybe<T>{
    abstract fmap<T2>(f: (val: T) => T2): Maybe<T2>;

    abstract eq(val: T): boolean;

    abstract eqMaybe<T>(maybeVal: Maybe<T>): boolean;

    public valWithDefault(defaultValue: T): T {
        return isJust(this) ? this.val() : defaultValue;
    }
}

export class Nothing<T> extends Maybe<T> {

    private constructor() {
        super();
    }

    public static create<T>(): Nothing<T> {
        return new Nothing();
    }

    public fmap<T, T2>(f: (val: T) => T2): Maybe<T2> {
        return Nothing.create();
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

    public val(): T{
        return this.value;
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

export function extract<T>(justValue: Just<T>): T{
    return justValue.val();
}

export function withDefault<T>(maybeValue: Maybe<T>, defaultValue: T): T{
    return isJust(maybeValue) ? maybeValue.val() : defaultValue;
}

export function isJust<T>(maybe: Maybe<T>): maybe is Just<T>{
    return maybe instanceof Just;
}

export function mapMaybe<T, T2>(f: (val: T) => Maybe<T2>, list: T[]): T2[] {
    return list
        .map(f)
        .filter(isJust)
        .map(extract);
}