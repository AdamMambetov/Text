cd /storage/emulated/0/_Adam/Text/
git checkout master
git pull
git pull --recurse-submodules
git submodule foreach "git checkout master && git pull"
