cd /storage/emulated/0/_Adam/Text/
git status

COMMIT_MSG="vault backup: $(date +"%F %T")"
git add . && git commit -m "$COMMIT_MSG"
git submodule foreach "git checkout master && git add . && git commit -m \"$COMMIT_MSG\" || true"
git add . && git commit -m "Update submodules: $COMMIT_MSG"
