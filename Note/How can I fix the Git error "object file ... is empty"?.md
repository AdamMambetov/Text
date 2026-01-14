---
created: 2026-01-14T23:22:03+03:00
source: https://stackoverflow.com/questions/11706215/how-can-i-fix-the-git-error-object-file-is-empty
category:
  - "[[Программирование]]"
meta:
  - "[[Git]]"
---

# How can I fix the Git error "object file ... is empty"?

## Error

When I try to commit changes, I get this error:

```
error: object file .git/objects/31/65329bb680e30595f242b7c4d8406ca63eeab0 is empty
fatal: loose object 3165329bb680e30595f242b7c4d8406ca63eeab0 (stored in .git/objects/31/65329bb680e30595f242b7c4d8406ca63eeab0) is corrupt
```

I tried `git fsck` I've got:

```
error: object file .git/objects/03/dfd60a4809a3ba7023cbf098eb322d08630b71 is empty
fatal: loose object 03dfd60a4809a3ba7023cbf098eb322d08630b71 (stored in .git/objects/03/dfd60a4809a3ba7023cbf098eb322d08630b71) is corrupt
```

How can I solve this error?

## Answer

I had a similar problem. My laptop ran out of battery during a Git operation. Boo.

I didn't have any backups. (N.B. Ubuntu One is not a backup solution for Git; it will helpfully overwrite your sane repository with your corrupted one.)

To the Git wizards, if this was a bad way to fix it, please leave a comment. It did, however, work for me... at least temporarily.

### Step 1: Make a backup of folder _.git_
in fact I do this in between every step that changes something, but with a new copy-to name, e.g., _.git-old-1_, _.git-old-2_, etc.:

```
cd ~/workspace/mcmc-chapter
cp -a .git .git-old
```

### Step 2: Run `git fsck --full`

```
git fsck --full

error: object file .git/objects/8b/61d0135d3195966b443f6c73fb68466264c68e is empty
fatal: loose object 8b61d0135d3195966b443f6c73fb68466264c68e (stored in .git/objects/8b/61d0135d3195966b443f6c73fb68466264c68e) is corrupt
```

### Step 3: Remove the empty file.
I figured what the heck; it's blank anyway.

```
rm .git/objects/8b/61d0135d3195966b443f6c73fb68466264c68e

rm: remove write-protected regular empty file `.git/objects/8b/61d0135d3195966b443f6c73fb68466264c68e'? y
```

### Step 3: Run `git fsck` again.
Continue deleting the empty files. You can also `cd` into the `.git` directory and run `find . -type f -empty -delete -print` to remove all empty files. Eventually Git started telling me it was actually doing something with the object directories:

```
git fsck --full

Checking object directories: 100% (256/256), done.
error: object file .git/objects/e0/cbccee33aea970f4887194047141f79a363636 is empty
fatal: loose object e0cbccee33aea970f4887194047141f79a363636 (stored in .git/objects/e0/cbccee33aea970f4887194047141f79a363636) is corrupt
```

### Step 4: After deleting all of the empty files, I eventually came to `git fsck` actually running:

```
git fsck --full

Checking object directories: 100% (256/256), done.
error: HEAD: invalid sha1 pointer af9fc0c5939eee40f6be2ed66381d74ec2be895f
error: refs/heads/master does not point to a valid object!
error: refs/heads/master.u1conflict does not point to a valid object!
error: 0e31469d372551bb2f51a186fa32795e39f94d5c: invalid sha1 pointer in cache-tree
dangling blob 03511c9868b5dbac4ef1343956776ac508c7c2a2
missing blob 8b61d0135d3195966b443f6c73fb68466264c68e
missing blob e89896b1282fbae6cf046bf21b62dd275aaa32f4
dangling blob dd09f7f1f033632b7ef90876d6802f5b5fede79a
missing blob caab8e3d18f2b8c8947f79af7885cdeeeae192fd
missing blob e4cf65ddf80338d50ecd4abcf1caf1de3127c229
```

### Step 5: Try `git reflog`. Fail because my HEAD is broken.

```
git reflog

fatal: bad object HEAD
```

### Step 6: Google.
Find [this](http://git.661346.n2.nabble.com/corrupted-Git-repository-td6498902.html). Manually get the last two lines of the reflog:

```
tail -n 2 .git/logs/refs/heads/master

f2d4c4868ec7719317a8fce9dc18c4f2e00ede04 9f0abf890b113a287e10d56b66dbab66adc1662d Nathan VanHoudnos <nathanvan@gmail.com> 1347306977 -0400    commit: up to p. 24, including correcting spelling of my name
9f0abf890b113a287e10d56b66dbab66adc1662d af9fc0c5939eee40f6be2ed66381d74ec2be895f Nathan VanHoudnos <nathanvan@gmail.com> 1347358589 -0400    commit: fixed up to page 28
```

### Step 7: Note that from Step 6 we learned that the HEAD is currently pointing to the very last commit.
So let's try to just look at the parent commit:

```
git show 9f0abf890b113a287e10d56b66dbab66adc1662d

commit 9f0abf890b113a287e10d56b66dbab66adc1662d
Author: Nathan VanHoudnos <nathanvan@XXXXXX>
Date:   Mon Sep 10 15:56:17 2012 -0400

    up to p. 24, including correcting spelling of my name

diff --git a/tex/MCMC-in-IRT.tex b/tex/MCMC-in-IRT.tex
index 86e67a1..b860686 100644
--- a/tex/MCMC-in-IRT.tex
+++ b/tex/MCMC-in-IRT.tex
```

It worked!

### Step 8: So now we need to point HEAD to 9f0abf890b113a287e10d56b66dbab66adc1662d.

```
git update-ref HEAD 9f0abf890b113a287e10d56b66dbab66adc1662d
```

Which didn't complain.

### Step 9: See what fsck says:

```
git fsck --full

Checking object directories: 100% (256/256), done.
error: refs/heads/master.u1conflict does not point to a valid object!
error: 0e31469d372551bb2f51a186fa32795e39f94d5c: invalid sha1 pointer in cache-tree
dangling blob 03511c9868b5dbac4ef1343956776ac508c7c2a2
missing blob 8b61d0135d3195966b443f6c73fb68466264c68e
missing blob e89896b1282fbae6cf046bf21b62dd275aaa32f4
dangling blob dd09f7f1f033632b7ef90876d6802f5b5fede79a
missing blob caab8e3d18f2b8c8947f79af7885cdeeeae192fd
missing blob e4cf65ddf80338d50ecd4abcf1caf1de3127c229
```

### Step 10: The invalid sha1 pointer in cache-tree seemed like it was from a (now outdated) index file ([source](http://www.spinics.net/lists/git/msg96103.html)). So I killed it and reset the repository.

```
rm .git/index
git reset

Unstaged changes after reset:
M    tex/MCMC-in-IRT.tex
M    tex/recipe-example/build-example-plots.R
M    tex/recipe-example/build-failure-plots.R
```

### Step 11: Looking at the fsck again...

```
git fsck --full

Checking object directories: 100% (256/256), done.
error: refs/heads/master.u1conflict does not point to a valid object!
dangling blob 03511c9868b5dbac4ef1343956776ac508c7c2a2
dangling blob dd09f7f1f033632b7ef90876d6802f5b5fede79a
```

The [dangling blobs are not errors](https://stackoverflow.com/questions/9955713/git-dangling-blobs). I'm not concerned with master.u1conflict, and now that it is working I don't want to touch it anymore!

### Step 12: Catching up with my local edits:

```
git status

# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#    modified:   tex/MCMC-in-IRT.tex
#    modified:   tex/recipe-example/build-example-plots.R
#    modified:   tex/recipe-example/build-failure-plots.R
#
< ... snip ... >
no changes added to commit (use "git add" and/or "git commit -a")


git commit -a -m "recovering from the git fiasco"

[master 7922876] recovering from the git fiasco
 3 files changed, 12 insertions(+), 94 deletions(-)

git add tex/sept2012_code/example-code-testing.R
git commit -a -m "adding in the example code"

[master 385c023] adding in the example code
 1 file changed, 331 insertions(+)
 create mode 100644 tex/sept2012_code/example-code-testing.R
```
