echo "--- git-commit-root ---"

cd ~/Text/
git status

COMMIT_MSG="vault backup: $(date +"%F %T")"

echo "--- git commit and push root ---"
git add .
git commit -m "$COMMIT_MSG"
git push
