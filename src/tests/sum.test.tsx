import {expect, test} from "vitest"

function sum(a:number, b:number):number {
    return a + b;
}

test("Should return 3", ()=> {
    expect(3).toEqual(sum(1,2))
})