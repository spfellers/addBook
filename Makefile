all: git-commit


git-commit:
	git add * >> .local.git.out
	git commit -a -m "Commit addBook" >> .local.git.out || echo
	git push

