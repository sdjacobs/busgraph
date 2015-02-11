build: _build
	 m4 -DVIZ=$(cat index.html) -DREADME=$(markdown readme.md) template.mk  > _build/index.html

_build:
	mkdir -p _build
	cp *.js *.txt _build/
