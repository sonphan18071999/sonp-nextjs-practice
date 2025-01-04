// Listen for messages from the main thread
self.onmessage = (event:MessageEvent<any> ):void => {
    const { data } = event;
    const result = data * 2;
    self.postMessage(result);
};

// Required to make the TypeScript compiler recognize this file as a module
export {};
