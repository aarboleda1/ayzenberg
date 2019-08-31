
class FileDirectory {
    constructor(fileName) {
        this.files = {};
    }

    create(file) {
        const {files} = this;
        
        if(file.includes('/')) {
            file = file.split('/')
            function fileSearch(files) {
                if(file.length === 1) return files;

                if(!files[file[0]]) {
                    files[file[0]] = {};
                }
                const innerObj = files[file[0]];
                file = file.slice(1);
                innerObj[file[0]] = {}
                fileSearch(innerObj)
            }
            return fileSearch(files);
        } else {
            files[file] = {};
            return files;
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
            const lastElement = path[path.length - 1].split(' ');
            const lastWord = lastElement[0];
            const filePath = lastElement[1];
            path[path.length - 1] = lastWord;
            path = path.join('/');
            this.delete(`${path}`)
            this.create(`${filePath}/${lastWord}`)
        } else {
            const splitPath = path.split(' ');
            // console.log(splitPath)
            this.delete(`${splitPath[0]}`);
            // console.log(files)
            this.create(`${splitPath[1]}/${splitPath[0]}`);
        }

    }


    delete(route) {
        // DELETE fruits/apples
        // Cannot delete fruits/apples - fruits does not exist
        // DELETE foods/fruits/apples
        const {files} = this;
        
        if(route.includes('/')) {
            let splitRoute = route.split('/');
            const deleteWord = splitRoute[splitRoute.length - 1];
            
            function fileSearch(files) {
                
                if(splitRoute.length === 1) {
                    delete files[deleteWord]
                    return files;
                }
    
                if(!files[splitRoute[0]]) {
                    return `${splitRoute[0]} does not exist`;
                }

                const innerObj = files[splitRoute[0]];
                splitRoute = splitRoute.slice(1);
                fileSearch(innerObj)
            }
            return fileSearch(files);
        } else {
            delete files[route];
            return files;
        }

    }

    list() {
        const { files } = this;
        function fileList(obj, printList = [], spacer = 0) {
            const keys = Object.keys(obj);
            let space = ' '.repeat(spacer);
            for(let i = 0; i < keys.length; i++) {
                if(obj[keys[i]]) {
                    printList.push(space + keys[i])
                    if(JSON.stringify(obj[keys[i]]) === "{}") {
                        return printList;
                    } 
                    fileList(obj[keys[i]], printList, spacer += 1);
                } 
            }
            return printList
        }
        const list = fileList(files);
        list.forEach(el => {
            console.log(el);
        })
        // let stringList = '';
        // for(let i = 0; i < list.length; i++) {
        //     console.log(list[i])
        //     stringList = list[i] + '\n';
        // }
        // return stringList;
    }
}

const fileDirectory = new FileDirectory;
fileDirectory.create('fruits/apples/fuji');
// fileDirectory.delete('fruits/apples/fuji');
fileDirectory.create('grains/squash');
// fileDirectory.create('veggies/spinach/tomato');
// console.log(fileDirectory.files);
// fileDirectory.move('grains/squash fruits')
// fileDirectory.move('grains fruits')
console.log(fileDirectory.list())


// unction fileList(obj, printList = [], spacer = 0) {
//     const keys = Object.keys(obj);
//     let space = ' '.repeat(spacer);
//     for(let i = 0; i < keys.length; i++) {
//         if(obj[keys[i]]) {
//             printList.push(space + keys[i])
//             if(JSON.stringify(obj[keys[i]]) === "{}") {
//                 return printList;
//             }
//             fileList(obj[keys[i]], printList, spacer += 1);
//         } 
//     }
//     return printList
// }