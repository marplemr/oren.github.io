## rsync

    -a archive mode (recursive, preserve permissions etc)
    -z enable compression
    -v verbose
    --delete delete files on target that missing from source
    --exclude '.git'

### example1

syncing 2 folders. delete files from target folder if it doesn't exist on the source folder.

    mkdir foo
    rsync -azv --delete foo/ bar/

### example 2

syncing a local folder with remote folder 

    rsync -azv --delete contact-us ubuntu@contact-us.sanguinebio.com:/contact-us
