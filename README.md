# AYZENBERG TAKE-HOME FILE SYSTEM SIMULATOR


## PROBLEM

A common method of organizing files on a computer is to store them in hierarchical directories. For instance:

```
photos/
  birthdays/
    joe/
    mary/
  vacations/
  weddings/
```

## CHALLENGE 
In this challenge, I implemented commands for a filesystem simulator that allows a user to create, move and delete directories. This simulator will not create folders in the host machine.


## USER GUIDE

• To run the custom CLI install Node.js. 

• Once you have Node installed

    - In your terminal run command 
        - $node directories.js
        // AA: Do you need this "Command" argument? It's not specified in the prompt they gave you
        - There will be a "Command: " prompt in your terminal where you can start creating your filesytem simulator.

### COMMANDS:

##### CREATE: 
    Creates a new folder
    - Add additional arguments for folder name. Cannot have any special characters besides '/' for file path.
        // AA: Try and remove the "Command" argument if possible
        - example: Command:create apple
                   Command:create apple/fuji
                   Command:create vegetable

##### MOVE:
    Moves folder to target folder
    - Add additional arguments for source folder and target folder. 
    - In order to move a directory you will type 'move' + ' ' + filepath + ' ' + target filepath

        - example: Command:move apple/fuji vegetable
                   Command:move apple vegetable

##### DELETE:
    Delete folder from directory tree.
    
    - Add additional arguments for source folder to be deleted. 
    - In order to delete a directory you will type 'delete' + filepath

        - example: Command:delete vegetable/apple/fuji
                   Command:delete vegetable/apple

        *** The filepath must be written correctly in order to delete a folder ***
        - example: Command:delete vegetable/fuji 
            • file path does not exist so it will return "Cannot delete vegetable/fuji - fuji does not exist"

##### LIST:
    Print directory tree.
    
    - No additional arguments needed.
    In order to list a directory tree you will type 'list'

        - example: Command:list
            • result: 
                LIST 
                vegetable


                   


    






