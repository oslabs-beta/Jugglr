"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCount = exports.decrement = exports.increment = exports.counterSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.counterSlice = (0, toolkit_1.createSlice)({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: state => { state.value += 1; },
        decrement: state => { state.value -= 1; },
    }
});
_a = exports.counterSlice.actions, exports.increment = _a.increment, exports.decrement = _a.decrement;
const selectCount = (state) => state.counter.value;
exports.selectCount = selectCount;
exports.default = exports.counterSlice.reducer;
//# sourceMappingURL=counterSlice.js.map