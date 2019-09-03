class FolderDirectory {

    constructor() {
        this.files = {};
    }

    Create(folder) {
        const { files } = this;
        if(this.isValidInput(folder)) {
            if(folder.includes('/')) {
                folder = folder.split('/')
                function folderSearch(folderTree, pointer = 0) {
                    if(pointer === folder.length - 1) return folderTree;
                    const innerObj = folderTree[folder[pointer]];
                    pointer++;
                    innerObj[folder[pointer]] = {}
                    folderSearch(innerObj, pointer)
                }
                return folderSearch(files);
            } else {
                files[folder] = {};
                return;
            }
        }
        return 'Not Valid';
    }

    Move(path) {
        const { files } = this;
        path = path.split(' ');
        let source = path[0];
        const target = path[1];

        if(source.includes('/')) {
            source = source.split('/');
            const folder = source[source.length - 1];
            source = source.join('/');
            this.Delete(`${source}`)
            this.Create(`${target}/${folder}`)
        } else {
            const filePath = path;
            const folder = Object.assign(files[filePath[0]]);

            function fileString(obj, string = '') {
                const keys = Object.keys(obj);
                if(keys.length === 0) return string;
                for(let i = 0; i < keys.length; i++) {
                    string += keys[i] + ' ';
                    if(obj[keys[i]]) {
                        return fileString(obj[keys[i]], string);
                    }
                }
            }
            let stringPath = fileString(files[filePath[0]]);
            if(stringPath.length === 0) {
                this.Create(`${filePath[1]}/${filePath[0]}`)
                this.Delete(`${filePath[0]}`);
            } else {
                stringPath = stringPath.split(' ')
                stringPath.pop();
                let folderObject = filePath[0]
                let pathToCreate = `${filePath[1]}/${filePath[0]}`
                for(let i = 0; i < stringPath.length; i++) {
                    pathToCreate += '/' + stringPath[i];
                }
                this.Create(pathToCreate);
                files[filePath[0]] = folder;
                this.Delete(`${folderObject}`);
            }
        }
    }

    Delete(route) {
        const {files} = this;
        if(this.isValidInput(route)) {
            if(route.includes('/')) {
                let targetRoute = route.split('/');
                const deleteFolder = targetRoute[targetRoute.length - 1];

                function fileSearch(files) {
                    if(targetRoute.length === 1) {
                        delete files[deleteFolder]
                        return files;
                    }
                    if(!files[targetRoute[0]]) {
                        console.log(`Cannot delete ${route} - ${targetRoute[0]} does not exist`);
                        return;
                    }
                    const innerObj = files[targetRoute[0]];
                    targetRoute = targetRoute.slice(1);
                    fileSearch(innerObj)
                }
                return fileSearch(files);
            } else {
                delete files[route];
            }
        }
    }

    List() {
        const { files } = this;

        function folderList(obj, printList = [], spacer = 0) {
            let folders = Object.keys(obj);
            folders = folders.sort();
            let space = ' '.repeat(spacer);
            for(let i = 0; i < folders.length; i++) {
                printList.push(space + folders[i])
                if(obj[folders[i]]) {
                   spacer += 2;
                   folderList(obj[folders[i]], printList, spacer);
                } 
                spacer -= 2;
            }
            return printList
        }
        // AA: name this folderList
        const list = folderList(files)
        let string = '';
        // AA: Use forEach here?
        for(let i = 0; i < list.length; i++) {
            if(i < list.length - 1) {
                string += list[i] + '\n';
            } else {
                string += list[i];
            }
        }
        console.log('LIST')
        return string;
    }

    isValidInput(pathInput) {
        return !/[~`!#$%\^&*+=\-\[\]\\';,{}|\\":<>\?]/g.test(pathInput);
    }
}

const fileSystem = new FolderDirectory;

// AA: Let's put all of this below into an example file or test case
let inputString = 
`CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST`

inputString = inputString.split('\n')
// iterate through input string and check first argument in order to invoke correct method. Log the input string. 

for(let i = 0; i < inputString.length; i++) {
    const splitInput = inputString[i].split(' ');
    if(splitInput[0] === 'CREATE') {
        console.log(inputString[i]);
        fileSystem.Create(`${splitInput[1]}`);
    } else if (splitInput[0] === 'MOVE') {
        console.log(inputString[i])
        fileSystem.Move(`${splitInput[1]} ${splitInput[2]}`);
    } else if (splitInput[0] === 'DELETE') {
        console.log(inputString[i])
        fileSystem.Delete(`${splitInput[1]}`);
    } else {
        console.log(fileSystem.List());
    }
}


module.exports = FolderDirectory;
