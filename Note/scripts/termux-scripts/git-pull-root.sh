cd /storage/emulated/0/_Adam/Text/
git pull --recurse-submodules
git submodule foreach "git pull || true"
