cd /storage/emulated/0/_Adam/Text/
git status

echo "git pull:"

git pull
git submodule foreach "git pull"

COMMIT_MSG="vault backup: $(date +"%F %T")"

echo "git commit:"
git submodule foreach "git add . && git commit -m \"$COMMIT_MSG\" || true"
echo "git push:"
git submodule foreach "git push"
git add .
git commit -m "$COMMIT_MSG"
git push
