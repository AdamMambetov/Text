echo "--- git-pull-root ---"

cd /storage/emulated/0/_Adam/Text/
git status

echo "--- git pull root ---"
git pull
echo "--- git pull submodules ---"
git submodule foreach "git pull"
