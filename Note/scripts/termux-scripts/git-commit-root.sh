cd /storage/emulated/0/_Adam/Text/
git status

COMMIT_MSG="vault backup: $(date +"%F %T")"
git submodule foreach "git add ."
git submodule foreach "git commit -m \"$COMMIT_MSG\""
git add .
git commit -m "$COMMIT_MSG"
