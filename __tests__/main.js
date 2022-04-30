"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const selectorModal = require('../src/server/controllers/fileController');
jest.mock('electron', () => ({
    dialog: {
        showOpenDialog: jest.fn(() => ({ filePaths: ['This is a file'] })),
    },
}));
describe("Server Routes", () => {
    describe('open', () => {
        // promise resolves. See https://jestjs.io/docs/en/asynchronous
        it('calls the open dialog function', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield selectorModal.openFile();
            console.log(typeof response);
            expect(response).toEqual('This is a file');
        }));
    });
});
//# sourceMappingURL=main.js.map