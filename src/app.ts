// import { $ } from 'jquery';

// import { MyStStConfigD } from "../typings/MyStStConfig";

import { MyStStConfig } from "../typings/MyStStConfig";

declare const myStStConfig: MyStStConfig;
declare const $: any;

const add = (a: number, b: number): number => a + b;

let obj = {
  first: 'John',
  last: 'Lennon'
};

const item = [1, 2, 3, 4, 5].includes(4);

var b: string = '';
console.log(b);
var a: string = '';



const addAny = (a: number, b: number) => a + b;

window.addEventListener('load', () => {});

function * something() {
  yield 1;
  yield 'something';
  var s: string = '';
  yield s;
}

function registerMyself() {

}

class Person {
  constructor(
    private first: string,
    protected last: string,
    public age: number = 40
  ) {
    registerMyself();
    console.log(myStStConfig.url);
    console.log(myStStConfig.companyId);
    $.get(myStStConfig.url);
  };
}

let p =new Person('J', 'D', 33);
