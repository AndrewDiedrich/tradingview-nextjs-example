#!/bin/sh

remove_if_directory_exists() {
	if [ -d "$1" ]; then rm -Rf "$1"; fi
}

case "$1" in
	"unstable")
		BRANCH="unstable";;
	*)
		BRANCH="master";;
esac

REPOSITORY='https://github.com/tradingview/charting_library/'

LATEST_HASH=$(git ls-remote $REPOSITORY $BRANCH | grep -Eo '^[[:alnum:]]+')

remove_if_directory_exists "$LATEST_HASH"

git clone -q --depth 1 -b "$BRANCH" $REPOSITORY "$LATEST_HASH"

# remove "type": "module" in public/static/package.json for webpack5 reasons
remove_if_directory_exists "public/static/charting_library"
remove_if_directory_exists "public/static/datafeeds"

cp -r "$LATEST_HASH/charting_library" public/static
cp -r "$LATEST_HASH/datafeeds" public/static

remove_if_directory_exists "$LATEST_HASH"