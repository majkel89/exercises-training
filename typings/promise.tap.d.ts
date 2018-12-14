// promise.tab
declare global { // extend existing interface
  interface Promise<T> {
    tap<D>(callback: (data: D) => void): Promise<T>;

    // then<D, U>(callback: (data: D) => U): Promise<U>;
  }
}

// Promise.prototype.tap = function (callback: Function) {
//   return this.then((result) => {
//     callback(result);
//     return result;
//   });
// };
