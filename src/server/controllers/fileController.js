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
const { dialog } = require('electron');
const fileController = {
    openFile: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield dialog.showOpenDialog({ properties: ["openFile"] });
        if (!response.canceled) {
            const fileName = response.filePaths[0];
            return fileName;
        }
        else {
            console.log("No file selected.");
            return "";
        }
    })
};
module.exports = fileController;
//# sourceMappingURL=fileController.js.map