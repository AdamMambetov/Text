cd /storage/emulated/0/_Adam/Text/
git status

./Note/scripts/termux-scripts/git-pull-root.sh

COMMIT_MSG="vault backup: $(date +"%F %T")"
git submodule foreach "git add . && git commit -m \"$COMMIT_MSG\""
git add . && git commit -m "$COMMIT_MSG"
git push && git submodule foreach "git push origin master"
