cd /storage/emulated/0/_Adam/Text/
git status

git pull
git submodule foreach "git pull"

COMMIT_MSG="vault backup: $(date +"%F %T")"
git submodule foreach "git add . && git commit -m \"$COMMIT_MSG\""
git add . && git commit -m "$COMMIT_MSG"
git push && git submodule foreach "git push origin master"
