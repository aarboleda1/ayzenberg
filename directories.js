
class FileDirectory {

    constructor(fileName) {
        this.files = {};
    }

    create(file) {
        const {files} = this;
        

        // if passed in file path includes / then you will split the folder structure into an array
        if(file.includes('/')) {
            file = file.split('/')
            // fileSearch function will check 
            function fileSearch(fileTree) {
                // base case, if array of strings passed in has a length of 1 then return files. 
                if(file.length === 1) return fileTree;

                // check for nested objects and slice and create a shortened array so you can look into the next nested object
                const innerObj = fileTree[file[0]];
                file = file.slice(1);
                innerObj[file[0]] = {}
                fileSearch(innerObj)
            }
            fileSearch(files);
            return;
        } else {
            // if there is no extra path then just create a property using the string passed in and assign it to an empty object.
            files[file] = {};
            return;
        }
    }

    move(path) {

        //MOVE grains/squash vegetables
        const { files } = this;
        // check if there is a /
            // if there is get the last word after the slash
            // save that to a variable and then delete it from the object
        // call create method with the last word / variable
        
        // if there is no / then just go to that property in file and then invoke create with the two concated

        if(path.includes('/')) {
            path = path.split('/');
            // console.log(path) it returns an array ex) ['grains', 'squash vegetables']
            // lastElement grabs the last element and splits it so you can grab the last word
            const lastElement = path[path.length - 1].split(' ');
            const lastWord = lastElement[0];
            const filePath = lastElement[1];
            path[path.length - 1] = lastWord;
            // console.log(path) this takes out the second word allowing there to be a correct path to the target directory. 
            path = path.join('/');
            // you have to delete that path and folder before making the move to the new directory.
            this.delete(`${path}`)
            this.create(`${filePath}/${lastWord}`)
        } else {
            const splitPath = path.split(' ');
            const objPath = Object.assign(files[splitPath[0]]);
            function fileString(obj, string = '') {
                const keys = Object.keys(obj);
                if(keys.length === 0) return string;
                for(let i = 0; i < keys.length; i++) {
                    string += keys[i] + ' '
                    if(obj[keys[i]]) {
                        return fileString(obj[keys[i]], string);
                    }
                }
            }
            // checking if there is a folder path. if not then you have to create a new path and delete the old folder. 
            let stringPath = fileString(files[splitPath[0]]);
            if(stringPath.length === 0) {
                this.create(`${splitPath[1]}/${splitPath[0]}`)
                this.delete(`${splitPath[0]}`);
            } else {
                // what happens if there are nested folders then you have to retrieve the whole file tree and move it into the new route. 
                stringPath = stringPath.split(' ')
                stringPath.pop()
                let pathToCreate = `${splitPath[1]}/${splitPath[0]}`
                for(let i = 0; i < stringPath.length; i++) {
                    pathToCreate += '/' + stringPath[i];
                }
                // you have to create a new path each iteration
                this.create(pathToCreate);
                // reassign nested object to new folder tree. 
                files[splitPath[0]] = objPath;
                this.delete(`${splitPath[0]}`);
            }
        }
        return;
    }

    delete(route) {
        const {files} = this;
        
        if(route.includes('/')) {
            // if there is a given path then split it at the / and parse through the words and delete that specific object if it exists.
            // save the folder title you need to delete by assigning it to a variable in this case deleteWord.
            let splitRoute = route.split('/');
            const deleteWord = splitRoute[splitRoute.length - 1];
            
            function fileSearch(files) {
                
                // base case if the length of splitRoute = 1 then you will be at the last folder which you can now delete
                if(splitRoute.length === 1) {
                    delete files[deleteWord]
                    return files;
                }
                // if correct folder path does not exist then it will return this default message.
                if(!files[splitRoute[0]]) {
                    return `${splitRoute[0]} does not exist`;
                }

                // continue parsing through nested object by passing in innerObj to fileSearch and use recursion. Make sure to shorten splitRoute array so you can check each folder. 
                const innerObj = files[splitRoute[0]];
                splitRoute = splitRoute.slice(1);
                fileSearch(innerObj)
            }
            return fileSearch(files);

        } else {
            delete files[route];
        }

    }

    list() {
        const { files } = this;

        // this function grabs each nested object key and at each recursive call it will increment spacer and push the value into an array.
        function fileList(obj, printList = [], spacer = 0) {
            const keys = Object.keys(obj);
            let space = ' '.repeat(spacer);
            for(let i = 0; i < keys.length; i++) {
                printList.push(space + keys[i])
                if(obj[keys[i]]) {
                   spacer += 1;
                   fileList(obj[keys[i]], printList, spacer);
                } 
                spacer -= 1;
            }
            return printList
        }
        // from the function call you iterate through the array and create a string that will print the folder directory.
        const list = fileList(files)
        let string = '';
        for(let i = 0; i < list.length; i++) {
            string += list[i] + '\n'
        }
        return string;
    }

}

const fileDirectory = new FileDirectory;
console.log(fileDirectory.create('fruits'));
console.log(fileDirectory.create('vegetables'));
console.log(fileDirectory.create('grains'));
console.log(fileDirectory.create('fruits/apples'));
console.log(fileDirectory.create('fruits/apples/fuji'));
console.log(fileDirectory.create('grains/squash'));
console.log(fileDirectory.move('grains/squash vegetables'));
console.log(fileDirectory.create('foods'));
console.log(fileDirectory.move('grains foods'));
console.log(fileDirectory.move('fruits foods'));
console.log(fileDirectory.move('vegetables foods'));
console.log(fileDirectory.delete('fruits/apples'));
console.log(fileDirectory.delete('foods/fruits/apples'));
console.log(fileDirectory.list());






