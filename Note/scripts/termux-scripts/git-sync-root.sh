echo "--- git-sync-root ---"

cd /storage/emulated/0/_Adam/Text/
git status

echo "--- git pull root ---"
git pull
echo "--- git pull submodules ---"
git submodule foreach "git pull"

COMMIT_MSG="vault backup: $(date +"%F %T")"

echo "--- git commit submodules ---"
git submodule foreach "git add . && git commit -m \"$COMMIT_MSG\" || true"
echo "--- git push submodules ---"
git submodule foreach "git push"

echo "--- git commit and push root ---"
git add .
git commit -m "$COMMIT_MSG"
git push
