install:
	npm install

start:
	npx nodemon --exec npx babel-node ./src/backend/bin/server.js

build:
	rm -rf dist
	npm run build

publish:
	rm -rf dist
	npm publish

test:
	npm test

lint:
	npx eslint .

.PHONY: test